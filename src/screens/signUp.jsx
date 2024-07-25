import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/text';
import CustomAlert from '../components/customAlert';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLength: false,
    hasCapitalLetter: false,
    hasSpecialSymbol: false,
  });
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const navigation = useNavigation();

  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const handleEmailChange = (input) => {
    setEmail(input);
    setIsValidEmail(validateEmail(input));
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    setPasswordCriteria({
      hasLength: input.length >= 11,
      hasCapitalLetter: /[A-Z]/.test(input),
      hasSpecialSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(input),
    });
  };

  const handleSignUp = () => {
    if (!fullName) {
      setAlertMessage('Please enter your full name.');
      setAlertVisible(true);
      return;
    }

    if (!email) {
      setAlertMessage('Please enter your email.');
      setAlertVisible(true);
      return;
    }

    if (!isValidEmail) {
      setAlertMessage('Please enter a valid email address.');
      setAlertVisible(true);
      return;
    }

    if (!password) {
      setAlertMessage('Please enter your password.');
      setAlertVisible(true);
      return;
    }

    if (
      !passwordCriteria.hasLength ||
      !passwordCriteria.hasCapitalLetter ||
      !passwordCriteria.hasSpecialSymbol
    ) {
      setAlertMessage(
        'Password must be at least 11 characters long, contain a capital letter, and a special symbol.'
      );
      setAlertVisible(true);
      return;
    }

    // Perform sign-up logic, e.g., API call
    // Navigate to another screen or show a success message
    setSuccessVisible(true);
    setTimeout(() => {
      setSuccessVisible(false);
      navigation.navigate('Login');
    }, 2000); // Display the success message for 2 seconds
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            source={require('../images/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>
        <Text style={styles.subtitle}>
          Enter your details to create a new account.
        </Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          focusedInput === 'fullName' && styles.focusedInputContainer,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
          onFocus={() => setFocusedInput('fullName')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          focusedInput === 'email' && styles.focusedInputContainer,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          focusedInput === 'password' && styles.focusedInputContainer,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          onFocus={() => {
            setFocusedInput('password');
            setShowPasswordCriteria(true);
          }}
          onBlur={() => setFocusedInput(null)}
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

      {showPasswordCriteria && (
        <View style={styles.passwordHintContainer}>
          <View style={styles.passwordHintRow}>
            <Image
              source={
                passwordCriteria.hasLength
                  ? require('../images/tick.png')
                  : require('../images/cross.png')
              }
              style={styles.passwordHintIcon}
            />
            <Text
              style={[
                styles.passwordHintText,
                passwordCriteria.hasLength && styles.passwordHintTextValid,
              ]}
            >
              At least 11 characters
            </Text>
          </View>
          <View style={styles.passwordHintRow}>
            <Image
              source={
                passwordCriteria.hasCapitalLetter
                  ? require('../images/tick.png')
                  : require('../images/cross.png')
              }
              style={styles.passwordHintIcon}
            />
            <Text
              style={[
                styles.passwordHintText,
                passwordCriteria.hasCapitalLetter &&
                  styles.passwordHintTextValid,
              ]}
            >
              Contains a capital letter
            </Text>
          </View>
          <View style={styles.passwordHintRow}>
            <Image
              source={
                passwordCriteria.hasSpecialSymbol
                  ? require('../images/tick.png')
                  : require('../images/cross.png')
              }
              style={styles.passwordHintIcon}
            />
            <Text
              style={[
                styles.passwordHintText,
                passwordCriteria.hasSpecialSymbol &&
                  styles.passwordHintTextValid,
              ]}
            >
              Contains a special symbol
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={successVisible}
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.successOverlay}>
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>Sign Up Successful!</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignItems: 'center',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    height: 100,
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  focusedInputContainer: {
    borderColor: '#F3592C',
    borderWidth: 2,
    color: '#F3592C',
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  icon: {
    padding: 10,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
  },
  passwordHintContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  passwordHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  passwordHintIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  passwordHintText: {
    color: 'gray',
    fontSize: 13,
  },
  passwordHintTextValid: {
    color: 'green',
  },
  signUpButton: {
    backgroundColor: '#F3592C',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#F3592C',
    fontWeight: '600',
  },
});

export default SignUp;
