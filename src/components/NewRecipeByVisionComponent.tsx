import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, TYPO } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
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
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const themedStyle = styles(mode);
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
    <ScrollView contentContainerStyle={themedStyle.scrollContainer}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.Vision.Loading')}
        />
      )}
      {visionResponse && (
        <View>
          <RecipePreviewComponent
            recipe={visionResponse}
            displayName={true}
          ></RecipePreviewComponent>
          <PaperButton
            icon="content-save"
            onPress={() => handleSave()}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.CreateButton')}
          </PaperButton>
        </View>
      )}
      {image && !visionResponse && (
        <View style={themedStyle.centerContainer}>
          <Image
            source={{ uri: image.uri }}
            style={themedStyle.image}
          />
          <TouchableOpacity
            onPress={() => setImage(null)}
            style={themedStyle.cancelButton}
          >
            <MaterialCommunityIcons
              name="close"
              size={TYPO.ICONSIZE.MEDIUM}
              style={themedStyle.cancelButtoncontent}
            />
          </TouchableOpacity>

          <PaperButton
            icon="file-import"
            onPress={() => handleVisionRequest(image)}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.ImportButton')}
          </PaperButton>
        </View>
      )}
      {!image && (
        <View style={themedStyle.centerContainer}>
          <Text style={themedStyle.informationText}>
            {t('NewRecipe.Vision.Information')}
          </Text>
          <PaperButton
            icon="folder-image"
            onPress={() => handleChoosePhoto()}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.ChooseButton')}
          </PaperButton>
          <PaperButton
            icon="camera"
            onPress={() => handleTakePhoto()}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.TakeButton')}
          </PaperButton>
          <Text style={themedStyle.warningText}>{t('NewRecipe.Vision.Warning')}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    informationText: {
      color: COLORS.TEXTCOLOR[mode],
      textAlign: 'center',
    },
    image: {
      alignSelf: 'center',
      width: 300,
      height: 400,
    },
    button: {
      marginVertical: 10,
      alignSelf: 'center',
    },
    cancelButton: {
      position: 'absolute',
      top: 65,
      right: 15,
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.CLOSEBUTTONCOLOR[mode],
    },
    cancelButtoncontent: {
      justifyContent: 'center',
      alignItems: 'center',
      color: COLORS.CLOSEICONCOLOR[mode],
    },
    warningText: {
      color: COLORS.WARNING,
      textAlign: 'center',
    },
    div: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default NewRecipeByVisionComponent;
