import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipeGeneratedScreenNavigationProp } from '../navigation/NavigationTypes';
import { newRecipeGeneratedPrompt } from '../services/PromptService';
import { addRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipePreviewComponent from './RecipePreviewComponent';

const NewRecipeGeneratedComponent: React.FC = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NewRecipeGeneratedScreenNavigationProp>();

  const [gptInput, setGptInput] = useState<string>('');
  const [gptOutput, setGptOutput] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseStringToJson = (input: string): object | Error => {
    try {
      return JSON.parse(input);
    } catch (error) {
      return new Error(`Failed to parse JSON: ${error}`);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const success = await dispatch(addRecipeThunk(gptOutput as Recipe));
    setIsLoading(false);
    if (success) {
      navigation.navigate('Recipes');
    }
  };

  async function handlegptrequest(gptInput: string) {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: newRecipeGeneratedPrompt,
            },
            { role: 'user', content: gptInput },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.choices?.length > 0 && data.choices[0].message?.content) {
        const parsedOutput = parseStringToJson(data.choices[0].message.content as string);
        if (parsedOutput instanceof Error) {
          console.error('Failed to parse GPT output:', parsedOutput.message);
          setGptOutput(null);
        } else {
          setGptOutput(parsedOutput as Recipe);
        }
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Failed to fetch from OpenAI API:', error);
      setGptOutput(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={themedStyle.scrollContainer}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.Generated.Loading')}
        />
      )}
      {!gptOutput && (
        <View style={themedStyle.centerContainer}>
          <TextInput
            style={themedStyle.multiLineInput}
            onChangeText={(text) => setGptInput(text)}
            label={t('NewRecipe.Generated.Placeholder')}
            multiline={true}
            mode="outlined"
            value={gptInput}
          />
          <PaperButton
            icon="chat-processing"
            onPress={() => handlegptrequest(gptInput)}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            style={{ width: '80%', alignSelf: 'center' }}
          >
            {t('NewRecipe.Generated.Button')}
          </PaperButton>
        </View>
      )}
      {gptOutput && (
        <>
          <RecipePreviewComponent
            recipe={gptOutput}
            displayName={true}
          />
          <View style={themedStyle.bottomContainer}>
            <PaperButton
              icon="content-save"
              onPress={() => handleSave()}
              mode="elevated"
              buttonColor={COLORS.BUTTONCOLOR[mode]}
              textColor={COLORS.TEXTCOLOR[mode]}
            >
              {t('NewRecipe.Generated.Save')}
            </PaperButton>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      padding: 12,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    input: {
      height: 40,
      width: '80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: COLORS.TEXTCOLOR[mode],
    },
    bottomContainer: {
      marginTop: 16,
      marginBottom: 16,
      alignItems: 'center',
    },
    multiLineInput: {
      margin: 12,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
    textTest: {
      color: 'red',
    },
  });

export default NewRecipeGeneratedComponent;
