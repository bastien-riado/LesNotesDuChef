import { Button, Text } from '@react-native-material/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';
interface NewRecipeComponentProps {
  navigation: NewRecipesStackNavigation;
}

const NewRecipeGeneratedComponent: React.FC<NewRecipeComponentProps> = ({
  navigation,
}) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();

  const [gptInput, setGptInput] = useState<string>('');
  const [gptOutput, setGptOutput] = useState<string>('');

  async function handlegptrequest(gptInput: string) {
    fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly assistant.' },
          { role: 'user', content: gptInput },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGptOutput(data.choices[0].message.content);
      });
  }
  return (
    <View>
      <TextInput
        style={themedStyle.multiLineInput}
        onChangeText={(text) => setGptInput(text)}
        placeholder={'Demander une recette'}
        placeholderTextColor="#A9A9A9"
      />
      <Button
        title={'send gpt'}
        onPress={() => handlegptrequest(gptInput)}
      />
      <ScrollView>
        <Text style={themedStyle.textTest}>{gptOutput}</Text>
      </ScrollView>
    </View>
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

    multiLineInput: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: COLORS.TEXTCOLOR[mode],
    },
    textTest: {
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default NewRecipeGeneratedComponent;
