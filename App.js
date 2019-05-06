/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Welcome from './src/screens/Welcome';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import DoctorRegistration from './src/screens/DoctorRegistration'
import VolunteerRegistration from './src/screens/VolunteerRegistration'
import MobileHospitalRegistration from './src/screens/MobileHospitalRegistration'
import DoctorWelcomeScreen from './src/screens/DoctorWelcomeScreen'
import MobileHospitalWelcomeScreen from './src/screens/MobileHospitalWelcomeScreen'
import VolunteerWelcomeScreen from './src/screens/VolunteerWelcomeScreen'
import AddPatients from './src/screens/AddPatients'
import UpdateMedicalInfo from './src/screens/UpdateMedicalInfo'

export default class App extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="welcome" component={Welcome} hideNavBar />  
            <Scene key="register" component={Register} hideNavBar />  
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="doctorregistration" component={DoctorRegistration} hideNavBar /> 
            <Scene key="volunteerregistration" component={VolunteerRegistration} hideNavBar /> 
            <Scene key="mobilehospitalregistration" component={ MobileHospitalRegistration} hideNavBar /> 
            <Scene key="doctorwelcomescreen" component={ DoctorWelcomeScreen} hideNavBar /> 
            <Scene key="volunteerwelcomescreen" component={ VolunteerWelcomeScreen} hideNavBar />  
            <Scene key="mobilehospitalwelcomescreen" component={ MobileHospitalWelcomeScreen} hideNavBar />
            <Scene key="addpatients" component={ AddPatients} hideNavBar /> 
            <Scene key="updatemedicalinfo" component={  UpdateMedicalInfo} hideNavBar />   
          </Scene>
        </Router>
      </Root>
    );
  }

}