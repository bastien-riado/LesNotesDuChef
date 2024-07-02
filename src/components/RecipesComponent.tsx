import React, { useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { RecipesState } from '../models/RecipesStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { removeRecipesSelectedThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipeComponent from './RecipeComponent';

export interface RecipesComponentProps {
  navigation: any;
}

const RecipesComponent: React.FC<RecipesComponentProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );
  const inDeleteSelection = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.inDeleteSelection,
  );
  const dispatch = useDispatch<AppDispatch>();
  const themedStyle = styles(mode);
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    const finalValue = isInDeleteSelectionMode ? 0 : 100;

    Animated.timing(slideAnim, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isInDeleteSelectionMode, slideAnim]);

  const handleDeletePress = async () => {
    await dispatch(removeRecipesSelectedThunk(inDeleteSelection));
  };

  return (
    <View style={themedStyle.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeComponent
            recipe={item}
            navigation={navigation}
          />
        )}
        contentContainerStyle={themedStyle.listContainer}
      />
      {isInDeleteSelectionMode && (
        <Animated.View
          style={[
            themedStyle.ellipseContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TouchableOpacity
            style={themedStyle.touchableOpacity}
            onPress={() => handleDeletePress()}
          >
            <Svg
              height="100"
              width="100%"
            >
              <Ellipse
                cx="50%"
                cy="100%"
                rx="70%"
                ry="100"
                fill={COLORS.BGDELETE}
              />
            </Svg>
            <View style={themedStyle.buttonContent}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="white"
                style={themedStyle.icon}
              />
              <Text style={themedStyle.buttonText}>Delete Selection</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    ellipseContainer: {
      width: '100%',
      height: 100,
      bottom: -30,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchableOpacity: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      paddingHorizontal: 0,
    },
    buttonContent: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 40,
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
    },

    icon: {
      marginBottom: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default RecipesComponent;
