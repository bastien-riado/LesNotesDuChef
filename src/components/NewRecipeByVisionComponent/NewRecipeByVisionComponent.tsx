import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { TYPO } from '../../globals/styles';
import { Recipe } from '../../models/RecipeModels';
import { newRecipeByVisionPrompt } from '../../services/PromptService';
import { addRecipeThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import RecipePreviewComponent from '../RecipePreviewComponent/RecipePreviewComponent';
import {
  CancelButton,
  CancelIcon,
  HomeContainer,
  ImageContainer,
  InformationText,
  Loader,
  ScrollContainerRes,
  StyledImage,
  StyledImageContainer,
  StyledPaperButton,
  WarningText,
} from './styles';

interface NewRecipeByVisionComponentProps {
  navigation: any;
}

export const parseStringToJson = (input: string): object | Error => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return new Error(`Failed to parse JSON: ${error}`);
  }
};

const NewRecipeByVisionComponent: React.FC<NewRecipeByVisionComponentProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [visionResponse, setVisionResponse] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri } as { uri: string };
        setImage(source);
      }
    });
  };

  const handleTakePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri } as { uri: string };
        setImage(source);
      }
    });
  };

  const uploadImageToFirebase = async (uri: string) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`images/vision/${filename}`);
    const task = storageRef.putFile(uri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.error('Image upload failed:', e);
      throw e;
    }
  };

  const handleSave = async () => {
    if (!visionResponse) return;
    setIsLoading(true);
    const success = await dispatch(addRecipeThunk(visionResponse as Recipe));
    setIsLoading(false);
    if (success) {
      navigation.navigate('Recipes');
    }
  };

  async function handleVisionRequest(image: { uri: string }) {
    setIsLoading(true);
    try {
      const imageUrl = await uploadImageToFirebase(image.uri);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: newRecipeByVisionPrompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.choices?.length > 0 && data.choices[0]) {
        const parsedOutput = parseStringToJson(data.choices[0].message.content);
        if (parsedOutput instanceof Error) {
          console.error('Failed to parse GPT output:', parsedOutput.message);
          setVisionResponse(null);
        } else {
          setVisionResponse(parsedOutput as Recipe);
        }
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Failed to fetch from OpenAI API:', error);
      setVisionResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <Loader
          visible={isLoading}
          textContent={t('NewRecipe.Vision.Loading')}
        />
      )}
      {!image && (
        <HomeContainer>
          <InformationText>{t('NewRecipe.Vision.Information')}</InformationText>
          <StyledPaperButton
            icon="folder-image"
            onPress={() => handleChoosePhoto()}
            mode="elevated"
          >
            {t('NewRecipe.Vision.ChooseButton')}
          </StyledPaperButton>
          <StyledPaperButton
            icon="camera"
            onPress={() => handleTakePhoto()}
            mode="elevated"
          >
            {t('NewRecipe.Vision.TakeButton')}
          </StyledPaperButton>
          <WarningText>{t('NewRecipe.Vision.Warning')}</WarningText>
        </HomeContainer>
      )}
      {image && !visionResponse && (
        <ImageContainer>
          <StyledImageContainer>
            <StyledImage source={{ uri: image.uri }} />
            <CancelButton onPress={() => setImage(null)}>
              <CancelIcon
                name="close"
                size={TYPO.ICONSIZE.MEDIUM}
              />
            </CancelButton>
          </StyledImageContainer>
          <StyledPaperButton
            icon="file-import"
            onPress={() => handleVisionRequest(image)}
            mode="elevated"
          >
            {t('NewRecipe.Vision.ImportButton')}
          </StyledPaperButton>
        </ImageContainer>
      )}
      {visionResponse && (
        <ScrollContainerRes>
          <RecipePreviewComponent
            recipe={visionResponse}
            displayName={true}
          />
          <StyledPaperButton
            icon="content-save"
            onPress={() => handleSave()}
            mode="elevated"
          >
            {t('NewRecipe.Vision.CreateButton')}
          </StyledPaperButton>
        </ScrollContainerRes>
      )}
    </>
  );
};

export default NewRecipeByVisionComponent;
