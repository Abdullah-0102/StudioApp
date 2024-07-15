import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import Text from '../components/text';
import CustomAlert from '../components/customAlert';


const UpdatePasswordScreen = ({ navigation, route }) => {
  const { password } = route.params; // Current password passed from previous screen
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = () => {
    console.log(password);
    // Perform password update validation
    if (oldPassword !== password) {
      setErrorMessage('Old password is incorrect.');
      setErrorVisible(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      setErrorVisible(true);
      return;
    }
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Password fields cannot be empty.');
      setErrorVisible(true);
      return;
    }
    
    // If all validations pass, show success modal
    setUpdatedPassword(newPassword);
    setSuccessModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          placeholderTextColor="#999"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image
            source={
              !passwordVisible
                ? require('../images/eye.png')
                : require('../images/hide-eye.png')
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#999"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image
            source={
              !passwordVisible
                ? require('../images/eye.png')
                : require('../images/hide-eye.png')
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image
            source={
              !passwordVisible
                ? require('../images/eye.png')
                : require('../images/hide-eye.png')
            }
            style={styles.eyeIconImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePassword}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Image source={require('../images/tick-1.png')} style={styles.tickIcon} />
            <Text style={styles.modalText}>Password updated successfully!</Text>
            <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => {
                    setSuccessModalVisible(false);
                    console.log(updatedPassword);
                    navigation.goBack(); // Navigate back to ProfileScreen
                }}
            >
                <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>


      {/* Error Modal */}
      <CustomAlert
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
        message={errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Light blue background color
    padding: 20,
    paddingTop: 35,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    color: 'black',
    fontFamily: 'Inter-SemiBold',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white", // Adjust background color for options
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 13,
    color: 'black',
    fontFamily: 'Inter-Regular',
  },
  icon: {
    padding: 10,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
    tintColor: '#888',
  },
  updateButton: {
    width: '100%',
    backgroundColor: '#F3592C',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  tickIcon: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Inter-Regular',
  },
  modalCloseButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});

export default UpdatePasswordScreen;
