import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from "../screens/login";
import Homepage from '../screens/homepage';
import MapScreen from '../screens/mapScreen';
import UpdatePasswordScreen from '../screens/updatePassword';

// import ForgotPasswordScreen from '../screens/forgotPassword';
// import SetNewPasswordScreen from '../screens/setNewPassword';
// import Homepage from '../screens/homepage';
// import TapOnMyLocationSuggested from '../screens/tapOnLocation';
// import SpecificSurvey from '../screens/specificSurvey';
// import AddNewLocation1 from '../screens/addNewLocation-1';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  headerTintColor: "black",
  headerStyle: {
    backgroundColor: "#F0F0F0", // Background color
  },
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Outfit-SemiBold",
  },
};

const Navigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomePage"
            component={Homepage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePasswordScreen}
            options={{headerShown: false}}
          />
          
          {/* <Stack.Screen
            name="SpecificSurvey"
            component={SpecificSurvey}
            options={({ route }) => ({
              ...screenOptions,
              headerTitle: route.params.location,
            })}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
export default Navigator;