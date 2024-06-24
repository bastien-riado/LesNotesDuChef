import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';
import { NewRecipeGeneratedPrompt } from '../services/PromptService';
import RecipePreviewComponent from './RecipePreviewComponent';

interface NewRecipeComponentProps {
  navigation: NewRecipesStackNavigation;
}

export const parseStringToJson = (input: string): object | Error => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return new Error(`Failed to parse JSON: ${error}`);
  }
};

const NewRecipeGeneratedComponent: React.FC<NewRecipeComponentProps> = ({
  navigation,
}) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();
  const handleSave = () => {
    //TODO: Implement save recipe
    console.log('Recipe saved');
  };
  const [gptInput, setGptInput] = useState<string>('');
  const [gptOutput, setGptOutput] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
              content: NewRecipeGeneratedPrompt,
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
    <ScrollView>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.Generated.Loading')}
        />
      )}
      {!gptOutput && (
        <>
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
            buttonColor="blue"
            textColor={COLORS.TEXTCOLOR.dark}
            uppercase={true}
          >
            {t('NewRecipe.Generated.Button')}
          </PaperButton>
        </>
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
              onPress={handleSave}
              mode="elevated"
              buttonColor="blue"
              textColor={COLORS.TEXTCOLOR.dark}
              uppercase={true}
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
    input: {
      height: 40,
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
