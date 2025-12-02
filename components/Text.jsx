import { StyleSheet, Text } from "react-native";

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
    color: "#ece9f3ff",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  body: {
    fontSize: 16,
    color: "#333",
  },

});

export default CustomText;
