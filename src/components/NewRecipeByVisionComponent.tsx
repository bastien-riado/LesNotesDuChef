import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { RESPONSIVE } from '../globals/dimensions';
import { TYPO } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { newRecipeByVisionPrompt } from '../services/PromptService';
import { addRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipePreviewComponent from './RecipePreviewComponent';

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
    const storageRef = storage().ref(`images/${filename}`);
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
    <ScrollContainer>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.Vision.Loading')}
        />
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
      {image && !visionResponse && (
        <CenterContainer>
          <StyledImage source={{ uri: image.uri }} />
          <CancelButton onPress={() => setImage(null)}>
            <CancelIcon
              name="close"
              size={TYPO.ICONSIZE.MEDIUM}
            />
          </CancelButton>
          <StyledPaperButton
            icon="file-import"
            onPress={() => handleVisionRequest(image)}
            mode="elevated"
          >
            {t('NewRecipe.Vision.ImportButton')}
          </StyledPaperButton>
        </CenterContainer>
      )}
      {!image && (
        <CenterContainer>
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
        </CenterContainer>
      )}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex-grow: 1;
  padding-left: 12px;
  padding-right: 12px;
`;

const ScrollContainerRes = styled.ScrollView`
  flex-grow: 1;
`;

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  height: ${RESPONSIVE.HEIGHT(86)}px;
`;

const StyledImage = styled.Image`
  align-self: center;
  width: 300px;
  height: 400px;
`;

const StyledPaperButton = styled(PaperButton).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
}))`
  margin-vertical: 10px;
  align-self: center;
`;

const CancelButton = styled.TouchableOpacity`
  position: absolute;
  top: 75px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.closeButton};
`;

const CancelIcon = styled(MaterialCommunityIcons)`
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.closeIcon};
`;

const InformationText = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: center;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

const WarningText = styled.Text`
  color: ${(props) => props.theme.warning};
  text-align: center;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

export default NewRecipeByVisionComponent;
