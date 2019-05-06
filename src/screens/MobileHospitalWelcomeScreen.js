import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, TouchableOpacity ,Alert} from 'react-native';

export default class DoctorWelcomeScreen extends Component {
  back(){
    Actions.pop();
}

  ButtonClickCheckFunction = () =>{

    Alert.alert("Button Clicked")

  }

  render() {

    return (
        
      <View style={styles.MainContainer}>
      <View style={{paddingBottom:40}}>
      <View style={{marginBottom: 35, width: '100%'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}> Welcome to your Account, {this.props.text}</Text>
              </View>
       
       <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.ButtonClickCheckFunction }
       >

            <Text style={styles.TextStyle}> View Prescreened Appointments </Text>
            
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.ButtonClickCheckFunction }
       >

            <Text style={styles.TextStyle}> Communicate With Prospective Donors </Text>
            
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.ButtonClickCheckFunction }
       >

            <Text style={styles.TextStyle}>View Doctors for Mobile Hospital Visits </Text>
            
      </TouchableOpacity>
     
      </View>
  
  <View style={{paddingBottom:10,paddingTop:80}}>
      <TouchableOpacity
          style={styles.LogoutButtonStyle}
          activeOpacity = { .5 }
          onPress={ this.ButtonClickCheckFunction }
       >

            <Text style={styles.TextStyle}> Logout </Text>
            
      </TouchableOpacity>
    </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  SubmitButtonStyle: {

    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  LogoutButtonStyle: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },


  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize:15
  }

});