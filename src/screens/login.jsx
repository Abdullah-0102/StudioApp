import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/text';
import CustomAlert from '../components/customAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();

  const userData = [
    {
      id: 1,
      userName: 'Mark',
      email: 'abi220419@gmail.com',
      password: '11223344',
      profilePic: require('../images/profile-icon.png'), // Adjust path as needed
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'janesmith@example.com',
      password: '11223344',
      profilePic: require('../images/profile-icon.png'), // Adjust path as needed
    },
  ];

  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const handleEmailChange = (input) => {
    setEmail(input);
    setIsValidEmail(validateEmail(input));
  };

  const handleLogin = () => {
    const hardcodedEmail = 'abi220419@gmail.com';
    const hardcodedPassword = '11223344';

    if (!email && !password) {
      setAlertMessage('Please type Email and Password !');
      setAlertVisible(true);
      return;
    }

    if (!email) {
      setAlertMessage('Please type Email !');
      setAlertVisible(true);
      return;
    }

    if (!password) {
      setAlertMessage('Please type Password !');
      setAlertVisible(true);
      return;
    }

    if (!isValidEmail) {
      setAlertMessage('Invalid Email Format !');
      setAlertVisible(true);
      return;
    }

    const foundUser = userData.find(user => user.email === email && user.password === password);

    if (foundUser) {
      navigation.navigate('HomePage', {
        userName: foundUser.userName,
        profilePic: foundUser.profilePic,
        email: foundUser.email,
        password: foundUser.password,
      });
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../images/logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LOGIN TO YOUR ACCOUNT</Text>
        <Text style={styles.subtitle}>
          Enter your credentials to login.
        </Text>
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
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          onFocus={() => setFocusedInput('password')}
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}> Sign Up Here.</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={alertMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: 50,
    width: 100,
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
    fontFamily: 'Inter-Regular',
    fontWeight: "400",
    color: '#F3592C',
  },
  icon: {
    padding: 3,
  },
  eyeIconImage: {
    width: 22,
    height: 22,
    tintColor: '#999',
  },
  loginButton: {
    backgroundColor: '#F3592C',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: 'gray',
    fontSize: 14,
  },
  signUpLink: {
    color: '#F3592C',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Login;
