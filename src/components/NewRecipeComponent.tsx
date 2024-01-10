import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Recipe, RecipeStep } from '../models/RecipeModels';
import { TabNavigation } from '../navigation/tabNavigation/BottomTabNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from '@react-native-material/core';
import { Mode } from '../models/themeStateModels';
import { COLORS, TYPO } from '../globals/styles';
import { useSelector } from 'react-redux';
import RecipeService from '../services/RecipeService';

type NewRecipeComponentProps = {
  navigation: TabNavigation;
}


const NewRecipeComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {

  const mode: Mode = useSelector((state: any) => state.theme.mode);
  const themedStyle = styles(mode)

  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    steps: [],
    time: '',
    difficulty: '',
  });

  const [currentStep, setCurrentStep] = useState<RecipeStep>({
    title: '',
    content: ''
  })

  const [stepModified, setStepModified] = useState<number>(-1);


  const handleChangeRecipe = (key: keyof Recipe, value: string) => {
    setRecipe({ ...recipe, [key]: value });
  };

  const handleChangeCurentStep = (key: keyof RecipeStep, value: string) => {
    setCurrentStep({ ...currentStep, [key]: value });
  }

  const handleSaveButton = async () => {
    RecipeService.postNewRecipe(recipe).then(
      () => {
        setRecipe({
          title: '',
          steps: [],
          time: '',
          difficulty: ''
        });
        navigation.navigate('RecipesStack');
      });
  }

  const addStep = () => {
    if (currentStep && currentStep.title && currentStep.content) {
      if (stepModified == -1) {
        recipe.steps!.push(currentStep);
      }
      else {
        recipe.steps![stepModified] = currentStep;
      }
      setCurrentStep({
        title: '',
        content: ''
      });
      setStepModified(-1);
    }
  }

  const handleStepDelete = (index: number) => {
    setRecipe({ ...recipe, steps: recipe.steps?.filter((step, i) => index !== i) });
  }

  const handleStepModify = (index: number) => {
    setCurrentStep(recipe.steps?.at(index) ?? {
      title: '',
      content: ''
    })
    setStepModified(index);
  }



  return (
    <View style={themedStyle.container}>
      <View style={themedStyle.newReicpeForm}>
        <TextInput
          style={themedStyle.input}
          onChangeText={(text) => handleChangeRecipe('title', text)}
          value={recipe.title}
          placeholder="Nom"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={themedStyle.input}
          onChangeText={(text) => handleChangeRecipe('time', text)}
          value={recipe.time}
          placeholder="Temps"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={themedStyle.input}
          onChangeText={(text) => handleChangeRecipe('difficulty', text)}
          value={recipe.difficulty}
          placeholder="Difficulté"
          placeholderTextColor="#A9A9A9"
        />
        {recipe.steps?.length ?? 0 > 0 ? <Text>Etapes: </Text> : <></>}
        <FlatList
          data={recipe.steps}
          renderItem={({ item, index }) => <StepPreview step={item} index={index} handleDelete={handleStepDelete} handleModify={handleStepModify} />}
          keyExtractor={item => item.title}
        />
        <View
          style={themedStyle.stepContainer}>
          <Text>{stepModified == -1 ? 'Ajoutez Une Etape' : `Modifiez l'Etape ${recipe.steps?.at(stepModified)?.title}: `}</Text>
          <TextInput
            style={themedStyle.input}
            onChangeText={text => handleChangeCurentStep('title', text)}
            value={currentStep.title}
            placeholder="Le nom de vote étape"
            placeholderTextColor="#A9A9A9"
          />
          <TextInput
            style={themedStyle.input}
            onChangeText={text => handleChangeCurentStep('content', text)}
            value={currentStep.content}
            placeholder="Décrivez votre étape: "
            placeholderTextColor="#A9A9A9"
            multiline={true}
          />
          <Button
            title={stepModified == -1 ? 'Ajouter Une etape' : "Modifier l'étape"}
            onPress={addStep}
          />
        </View>
      </View>
      <View>
        <Button
          title="Enregistrer la recette"
          onPress={handleSaveButton}
        />
      </View>
    </View>
  );
};

type StepPreviewProps = {
  step: RecipeStep,
  index: number,
  handleDelete: (index: number) => void,
  handleModify: (index: number) => void
}

const StepPreview: React.FC<StepPreviewProps> = ({ step, index, handleDelete, handleModify }) => {

  const [isContentVisible, setIsContentVisible] = useState<boolean>(false)

  return <TouchableOpacity
    onPress={() => setIsContentVisible(!isContentVisible)}
    style={{
      flexDirection: 'column',
      gap: 12,
      margin: 12,
    }}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
      <Text style={{
        fontWeight: '700',
      }}>{`${index + 1} - ${step.title}`}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 12,
        }}>
        <MaterialCommunityIcons
          name='fountain-pen-tip'
          size={TYPO.ICONSIZE.MEDIUM}
          color={'black'}
          onPress={() => handleModify(index)} />
        <MaterialCommunityIcons
          name='trash-can'
          size={TYPO.ICONSIZE.MEDIUM}
          color={'red'}
          onPress={() => handleDelete(index)} />
      </View>
    </View>
    {isContentVisible ? <Text
      style={{
        marginLeft: 12,
        textAlign: 'justify',
        fontWeight: '300'
      }}>{step.content}</Text> : <></>}
  </TouchableOpacity>
}

const styles = (mode: Mode) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  newReicpeForm: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: COLORS.TEXTCOLOR[mode],
  },

  stepContainer: {
    marginVertical: 12,
  },

  multiLineInput: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: COLORS.TEXTCOLOR[mode],
  },
});

export default NewRecipeComponent;
