import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import Text from "../components/text";

const ProfileScreen = ({ route }) => {
  const { userName, profilePic, email, password } = route.params;

  const navigation = useNavigation(); // Hook to access navigation object

  // Navigate to UpdatePasswordScreen
  const handleUpdatePassword = () => {
    navigation.navigate('UpdatePassword', { userName, profilePic, email, password }); // Ensure 'UpdatePassword' matches your navigation setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image style={styles.profilePic} source={profilePic} />

      <View style={styles.userInfo}>
        <Text style={styles.name}>{userName}</Text>
        <TouchableOpacity style={styles.editIconContainer}>
          <Image
            style={styles.editIcon}
            source={require("../images/edit.png")} 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.email}>{email}</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleUpdatePassword}>
          <Text style={styles.optionText}>Update Password</Text>
          <Image
            style={styles.arrowIcon}
            source={require("../images/vector2.png")} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Delete Account</Text>
          <Image
            style={styles.arrowIcon}
            source={require("../images/vector2.png")} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Logout</Text>
          <Image
            style={styles.arrowIcon}
            source={require("../images/vector2.png")} 
          />
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
},
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    marginRight: 10,
    textAlign: "center",
    color: 'black',
    fontFamily: 'Inter-SemiBold'
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  email: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
    width: "100%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white", // Adjust background color for options
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 14,
    color: "black",
    fontFamily: 'Inter-Medium',
  },
  arrowIcon: {
    width: 7,
    height: 11,
    tintColor: "#555", // Adjust arrow icon color
  },
});

export default ProfileScreen;
