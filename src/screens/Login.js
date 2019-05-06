import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Alert,StyleSheet  } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Picker} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


import Colors from '../Colors';
import Text from '../component/Text';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          hasError: false,
          errorText: ''
        };
    }

   /*  componentWillMount(){
        storeData = async () => {
            try {
              await AsyncStorage.setItem('username', this.state.username)
            } catch (e) {
              // saving error
              Alert.alert("error")
            }
          }
        } */
  
    back(){
        Actions.pop();
    }
    register(){
        Actions.register();
    }

    Signin = () =>{

        fetch('http://10.0.2.2:8000/api/userlogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : this.state.username,
            password : this.state.password,
          
             })
    
        }).then((response) => response.json())
            .then((responseJson) => {
    
             // Showing response message coming from server after inserting records.
             if(this.state.username==="") {
                this.setState({hasError: true, errorText: 'Please enter your name '});
                return;
              }
              else if(this.state.password==="") {
                this.setState({hasError: true, errorText: 'Please enter password'});
                return;
              }
              else if(responseJson.error){
                this.setState({hasError: true, errorText: 'Please enter valid username and password !'});
              }
              else if(responseJson.Doctor){             
                // Actions.doctorwelcomescreen({text:this.state.username});
                Actions.addpatients();
            }
            else if(responseJson.Volunteer){             
                Actions.volunteerwelcomescreen({text:this.state.username});
           }
           else if(responseJson.Mobile_hospital){             
            Actions.mobilehospitalwelcomescreen({text:this.state.username});
       } 
              
    
            }).catch((error) => {
              console.error(error);
            });
    
    }
  
    render() {
        return(
            <Container style={{backgroundColor: '#fdfdfd'}}>
          
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                  <View style={{marginBottom: 35, width: '100%'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}>Sign In</Text>
                  </View>
                  
                  {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10,fontSize:15}}>{this.state.errorText}</Text>:<Text style={{color: "green",fontSize:15, textAlign: 'center', marginTop: 10}}>{this.state.successText}</Text>}

                  <Item>
                      <Icon active name='ios-person' style={{color: '#687373',fontSize:18}} />
                      <Input placeholder='Username' onChangeText={(text) => this.setState({username: text})} placeholderTextColor="#687373" />
                  </Item>
                  <Item>
                      <Icon active name='ios-lock' style={{color: '#687373', fontSize:18}} />
                      <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
                  </Item>

                  
                                   
                 
                <View style={{ flexDirection: "row",paddingLeft:15,paddingRight:15,paddingTop:80 }}>
                    <View style={{ flex: 1,paddingRight:15 }}>
                        <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.back() }>
                            <Text style={{ alignSelf: 'stretch',alignSelf: 'center', color: '#ffffff', fontSize: 22, fontWeight: '600', paddingTop: 10, paddingBottom: 10 }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                        <View style={{ flex: 1,paddingLeft:15}}>
                            <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={this.Signin}>
                                    <Text style={{ alignSelf: 'center', color: '#ffffff',fontSize: 22, fontWeight: '600', paddingTop: 10, paddingBottom: 10 }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View style={{flexDirection: 'row', paddingVertical:50,alignItems: 'flex-end'}} >
                            <Text style={styles.registertext}>Don't have an Account?</Text>
                            <TouchableOpacity onPress={()=> this.register()}>
                            <Text style={styles.registerbutton}>Register</Text>
                            </TouchableOpacity>
                        </View>
            </View>
        </ScrollView>
    </Container>
  );
 } 
}
  const styles = StyleSheet.create({
   
    registertext:{
        color:'rgba(0,0,0,0.6)',
        fontSize: 16
    },
    registerbutton:{
        color:'black',
        fontSize: 16,
        fontWeight: '500'
    }
  });