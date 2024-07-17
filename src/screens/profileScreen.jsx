import React, { useState} from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import Text from "../components/text";
import { BlurView } from "@react-native-community/blur";


const ProfileScreen = ({ route }) => {
  const { userName, profilePic, email, password } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // State to control loading indicator

  const navigation = useNavigation(); // Hook to access navigation object

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleLogOut = () => {
    // Navigate to Login screen
    setShowLoading(true);
    
    // Simulate logging out after a delay
    setTimeout(() => {
      navigation.navigate('Login');
      console.log("Logging out...");
      setShowLoading(false);
    }, 3000); 
  };
  

  const handleDeleteAccount = () => {
    // Show loading indicator
    setShowLoading(true);
    
    setTimeout(() => {
        console.log("Deleting account...");
        setShowLoading(false);
        navigation.navigate('Login');
        toggleDeleteModal();
    }, 3000); // Adjust timeout duration as needed
  };

  const handleUpdateUsername = () => {
    navigation.navigate('UpdateUsername', { userName, profilePic, email, password });
  };

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
        <TouchableOpacity style={styles.editIconContainer} onPress={handleUpdateUsername}>
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
        <TouchableOpacity style={styles.option} onPress={toggleDeleteModal}>
          <Text style={styles.optionText}>Delete Account</Text>
          <Image
            style={styles.arrowIcon}
            source={require("../images/vector2.png")} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogOut}>
          <Text style={styles.optionText}>Logout</Text>
          <Image
            style={styles.arrowIcon}
            source={require("../images/vector2.png")} 
          />
        </TouchableOpacity>
      </View>



      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={toggleDeleteModal} // Function to handle modal closing
        >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Image
                style={styles.deleteIcon}
                source={require('../images/delete-icon.png')} // Replace with your delete icon image
            />
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalSubtitle}>Are you sure you want to delete your account?</Text>
            <Text style={styles.redText}>Your account will be deleted permanently.</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButtonNo} onPress={toggleDeleteModal}>
                  <Text style={styles.modalButtonTextNo}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonYes} onPress={handleDeleteAccount}>
                  <Text style={styles.modalButtonTextYes}>Yes, Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Loading indicator */}
        {showLoading && (
            <View style={styles.loadingContainer}>
                <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={1} />
                <ActivityIndicator size="large" color="#D12E34" />
            </View>
        )}
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
    backgroundColor: "white", 
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
    tintColor: "#555", 
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "#F0F8FF",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  deleteIcon: {
    width: 53,
    height: 55,
    alignSelf: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 15,
    textAlign: "center",
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: "center",
    color: '#555',
  },
  redText: {
    fontSize: 12,
    marginBottom: 30,
    textAlign: "center",
    color: '#D12E34',
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalButtonNo: {
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#D12E34', 
  },
  modalButtonYes: {
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0F8FF", // Adjust background color for "Yes" button
    borderWidth: 1,
  },
  modalButtonTextNo: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "center",
  },
  modalButtonTextYes: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "black",
    textAlign: "center",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default ProfileScreen;
