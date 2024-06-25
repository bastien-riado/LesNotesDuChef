import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { newRecipeByVisionPrompt } from '../services/PromptService';

interface NewRecipeByVisionComponentProps {
  navigation: any;
}

const NewRecipeByVisionComponent: React.FC<NewRecipeByVisionComponentProps> = ({
  navigation,
}) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const themedStyle = styles(mode);
  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [visionResponse, setVisionResponse] = useState<string>('');
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

  const handleSaveRecipe = () => {
    // Save the recipe to the database
    // Navigate to the recipe details screen
    console.log('Save the recipe to the database');
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
        setVisionResponse(data.choices[0].message.content);
        console.log('API response:', data.choices[0].message.content);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Failed to fetch from OpenAI API:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={themedStyle.container}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.Vision.Loading')}
        />
      )}
      {visionResponse && (
        <View>
          <Text style={themedStyle.informationText}>{visionResponse}</Text>
          <PaperButton
            mode="outlined"
            onPress={() => handleSaveRecipe()}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.CreateButton')}
          </PaperButton>
        </View>
      )}
      {image && !visionResponse && (
        <View>
          <PaperButton
            mode="outlined"
            onPress={() => setImage(null)}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.CancelButton')}
          </PaperButton>
          <Image
            source={{ uri: image.uri }}
            style={themedStyle.image}
          />
          <PaperButton
            mode="outlined"
            onPress={() => handleVisionRequest(image)}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.ImportButton')}
          </PaperButton>
        </View>
      )}
      {!image && (
        <View style={themedStyle.div}>
          <Text style={themedStyle.informationText}>
            {t('NewRecipe.Vision.Information')}
          </Text>
          <PaperButton
            mode="outlined"
            onPress={() => handleChoosePhoto()}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.ChooseButton')}
          </PaperButton>
          <PaperButton
            mode="outlined"
            onPress={() => handleTakePhoto()}
            style={themedStyle.button}
          >
            {t('NewRecipe.Vision.TakeButton')}
          </PaperButton>
          <Text style={themedStyle.warningText}>{t('NewRecipe.Vision.Warning')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    informationText: {
      color: COLORS.TEXTCOLOR[mode],
      textAlign: 'center',
    },
    image: {
      width: 300,
      height: 400,
    },
    button: {
      marginVertical: 10,
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
