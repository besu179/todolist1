import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import CustomText from "./Text";

const CustomButton = ({ title, style, textStyle, onPress }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <CustomText style={[styles.buttonText, textStyle]}>{title}</CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
