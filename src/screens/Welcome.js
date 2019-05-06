/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { BackHandler,View,Text,StyleSheet,Image,ImageBackground,TouchableOpacity } from 'react-native';
import { Root, Button } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';


import logo from '../images/logo.png';
import background from '../images/background.png';


export default class Welcome extends Component {

    register(){
        Actions.register();
    }

    signin(){
      Actions.login();
    }


  render() {
    return (
    <ImageBackground source={background} style={styles.background}>
    <View style={{backgroundColor: 'rgba(0, 123, 255, 0.1)', flex: 1}} >
    <View style={styles.container}>      
       <Image source={logo} style={styles.logo} />
       <View style={{ flexDirection: "row",paddingLeft:20,paddingRight:20,paddingTop:170 }}>
     <View style={{ flex: 1,paddingRight:10 }}>
         <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.signin()}>
              <Text style={{ alignSelf: 'stretch',alignSelf: 'center',
                            color: '#ffffff',
                            fontSize: 22,
                            fontWeight: '600',
                            paddingTop: 10,
                            paddingBottom: 10 }}>Sign in</Text>
         </TouchableOpacity>
     </View>
     <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
     <View style={{ flex: 1,paddingLeft:10}}>
         <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.register()}>
              <Text style={{ alignSelf: 'center',
                            color: '#ffffff',
                            fontSize: 22,
                            fontWeight: '600',
                            paddingTop: 10,
                            paddingBottom: 10 }}>Register</Text>
         </TouchableOpacity>
     </View>
 </View>
    </View>
    </View>
     </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent:'center', 
    paddingTop:160,   
    alignItems: 'center',
   // backgroundColor:'rgba(0, 123, 255, 0.5)'
    
  },
  background: {
    flex:1,
    height:null,
    width:null,    
    //opacity: .5,

  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    
   
  },
  logo:{
      height: 150,
      width: 150,
  },
});
