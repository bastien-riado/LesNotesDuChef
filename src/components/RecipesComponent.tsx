import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Svg, { Ellipse } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { ICONSIZE } from '../globals/styles/typography';
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
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeletePress = async () => {
    toggleModal();
    await dispatch(removeRecipesSelectedThunk(inDeleteSelection));
  };
  const toggleModal = () => {
    if (inDeleteSelection.length > 0) {
      setIsModalVisible(!isModalVisible);
    }
  };

  useEffect(() => {
    const finalValue = isInDeleteSelectionMode ? 0 : 100;
    Animated.timing(slideAnim, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isInDeleteSelectionMode, slideAnim]);

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
            style={themedStyle.ellipseButton}
            onPress={() => toggleModal()}
            disabled={inDeleteSelection.length === 0}
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
                size={ICONSIZE.MEDIUM}
                style={themedStyle.icon}
              />
              <Text style={themedStyle.buttonText}>
                {t('RecipeList.DeleteSelectedButton')}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationInTiming={300}
        animationOut="zoomOut"
        animationOutTiming={300}
        backdropColor="black"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        useNativeDriver={true}
      >
        <View style={themedStyle.modalView}>
          <Text style={themedStyle.text}>{t('RecipeList.DeleteModalText')}</Text>
          <View style={themedStyle.modalButtonView}>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={[themedStyle.modalButton, themedStyle.close]}
            >
              <Text style={themedStyle.buttonText}>{t('RecipeList.CancelButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletePress()}
              style={[themedStyle.modalButton, themedStyle.delete]}
            >
              <MaterialCommunityIcons
                name="alert-remove-outline"
                size={ICONSIZE.SMALL}
                style={themedStyle.icon}
              />
              <Text style={themedStyle.buttonText}>{t('RecipeList.DeleteButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    ellipseButton: {
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
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
    },
    icon: {
      color: COLORS.ICONCOLOR[mode],
      marginRight: 10,
    },
    buttonText: {
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
    },
    modalView: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      borderRadius: 10,
      maxHeight: 200,
    },
    modalButtonView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    modalButton: {
      padding: 15,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius: 10,
      backgroundColor: COLORS.WARNING,
    },
    close: {
      backgroundColor: COLORS.BUTTONCOLOR[mode],
      elevation: 5,
    },
    delete: {
      backgroundColor: COLORS.BGDELETE,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

export default RecipesComponent;
