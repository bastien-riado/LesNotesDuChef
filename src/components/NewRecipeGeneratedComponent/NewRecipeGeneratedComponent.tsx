import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Recipe } from '../../models/RecipeModels';
import { NewRecipeGeneratedScreenNavigationProp } from '../../navigation/NavigationTypes';
import { newRecipeGeneratedPrompt } from '../../services/PromptService';
import { addRecipeThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import RecipePreviewComponent from '../RecipePreviewComponent/RecipePreviewComponent';
import {
  BottomContainer,
  InputContainer,
  Loader,
  OutputContainer,
  StyledPaperButton,
  StyledTextInput,
} from './styles';

const NewRecipeGeneratedComponent: React.FC = () => {
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
    const success = await dispatch(addRecipeThunk(gptOutput as Recipe, t));
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
    <>
      {isLoading && (
        <Loader
          visible={isLoading}
          textContent={t('NewRecipe.Generated.Loading')}
        />
      )}
      {!gptOutput && (
        <InputContainer>
          <StyledTextInput
            onChangeText={(text) => setGptInput(text)}
            label={t('NewRecipe.Generated.Placeholder')}
            multiline={true}
            mode="outlined"
            value={gptInput}
          />
          <StyledPaperButton
            icon="chat-processing"
            onPress={() => handlegptrequest(gptInput)}
            mode="elevated"
          >
            {t('NewRecipe.Generated.Button')}
          </StyledPaperButton>
        </InputContainer>
      )}
      {gptOutput && (
        <OutputContainer>
          <RecipePreviewComponent
            recipe={gptOutput}
            displayName={true}
          />
          <BottomContainer>
            <StyledPaperButton
              icon="content-save"
              onPress={() => handleSave()}
              mode="elevated"
            >
              {t('NewRecipe.Generated.Save')}
            </StyledPaperButton>
          </BottomContainer>
        </OutputContainer>
      )}
    </>
  );
};

export default NewRecipeGeneratedComponent;
