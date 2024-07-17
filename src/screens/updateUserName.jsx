import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Text from "../components/text";

const UpdateUsernameScreen = ({ route }) => {
  const [newUsername, setNewUsername] = useState("");
  const [confirmNewUsername, setConfirmNewUsername] = useState("");

  // Function to handle username update
  const handleUpdateUsername = () => {
    // Implement username update logic here
    // You can use API calls or update state as per your application's logic
    console.log("Updating username...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Username</Text>
      <Image style={styles.profilePic} source={route.params.profilePic} />

      <TextInput
        style={styles.input}
        placeholder="New Username"
        placeholderTextColor="#999"
        value={newUsername}
        onChangeText={setNewUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Username"
        placeholderTextColor="#999"
        value={confirmNewUsername}
        onChangeText={setConfirmNewUsername}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUsername}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#F0F8FF',
    padding: 20,
    paddingTop: 35,
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    color: 'black',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  updateButton: {
    width: "100%",
    backgroundColor: "#F3592C", 
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
});

export default UpdateUsernameScreen;
