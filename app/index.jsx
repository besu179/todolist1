import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/Button";
import CustomCard from "../components/Card";
import CustomInputText from "../components/InputText";
import CustomText from "../components/Text";


function Index() {
  const router = useRouter();


  return (
    <View style={styles.container}>

      <CustomButton
        title="+"
        onPress={() => router.push("/create-task")}
        style={styles.fab}
        textStyle={styles.fabPlus}
      />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  
  fab: {
    position: "absolute",
    right: 32,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabPlus: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: -12,
    marginLeft: -3,
  },
});
