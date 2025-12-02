import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";

const CustomText = ({ children, style, variant = "body", ...props }) => {
  // Handle case-insensitive variant matching
  const variantKey = variant?.toLowerCase() || "body";
  const variantStyle = styles[variantKey] || styles.body;
  return (
    <Text style={[variantStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.white,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: Colors.text.tertiary,
  },
});

export default CustomText;
