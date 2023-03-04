import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CustomHeader = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttonHeaders}
        onPress={() => {
          //@ts-ignore
          //navigation.getParent("HomePage").openDrawer();
        }}
      >
        <Entypo name="menu" size={24} color="#32cbff" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    paddingTop: 30,
    backgroundColor: "#2844fa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonHeaders: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cart_menu: {
    backgroundColor: "#343a40",
  },
});