import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Alert,StyleSheet  } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Picker} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
 

import Colors from '../Colors';
import Text from '../component/Text';

export default class DoctorRegistration extends Component {
 /*  constructor(props){
    super(props)
    //set value in state for initial date
    this.state =''
  } */
  constructor(props) {
    super(props);
    this.state = {
      firstname : '',
      lastname  : '',
      dob       : '',
      gender    : '',
      email     : '',
      hospital  : '',
      credentials: '',
      available : false,  
      hasError  : false,
      errorText : '',
      date      : ''
    };
}

back(){
  Actions.pop();
}
Register = () =>{

    fetch('http://10.0.2.2:8000/api/doctorregister', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fname : this.state.firstname,
      lname : this.state.lastname,
      dob : this.state.date,
      gender : this.state.gender,
      email : this.state.email,
      hospital : this.state.hospital,
      credentials : this.state.credentials,
         })

    }).then((response) => response.json())
        .then((responseJson) => {
          if(this.state.fname==="") {
            this.setState({hasError: true, errorText: 'Please enter your first name '});
            return;
          }
          if(this.state.lname==="") {
            this.setState({hasError: true, errorText: 'Please enter your last name '});
            return;
          }
          if(this.state.date==="") {
            this.setState({hasError: true, errorText: 'Please enter your dob '});
            return;
          }
          if(this.state.gender==="") {
            this.setState({hasError: true, errorText: 'Please enter your gender '});
            return;
          }          
          if(!this.verifyEmail(this.state.email)) {
            this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
            return;
          }
          if(this.state.hospital==="") {
            this.setState({hasError: true, errorText: 'Please enter your hospital '});
            return;
          }
          if(this.state.credentials==="") {
            this.setState({hasError: true, errorText: 'Please enter your credentials '});
            return;
          }               
          
         
          else {

          // Showing response message coming from server after inserting records.
          this.setState({hasError: false, successText:'Registration Successful'}); 
         
       /*    storeData = async () => {
            try {
              await AsyncStorage.setItem('fname', this.state.fname)
            } catch (e) {
              // saving error
            }
          } */
            // AsyncStorage.setItem('username',this.state.fname);
             Actions.doctorwelcomescreen();
        }

        }).catch((error) => {
          console.error(error);
        });

}

  render(){

    let data = [{
        value: 'Male',
      }, {
        value: 'Female',
      }, {
        value: 'Other',
      }]; 
    
    return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
      
          <ScrollView contentContainerStyle={{flexGrow: 1}}>        
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 50, paddingRight: 50, paddingTop:10}}>          
              <View style={{marginBottom: 35, width: '100%'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}>Doctor</Text>
              </View>
              {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10,fontSize:15}}>{this.state.errorText}</Text>:<Text style={{color: "green",fontSize:15, textAlign: 'center', marginTop: 10}}>{this.state.successText}</Text>}
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Firstname' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({firstname: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Lastname' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({lastname: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              
            </View>
            <View style={{flex: 1, paddingLeft: 50, paddingRight: 50}}>
            <Item>
                <DatePicker
                    style={{width:'100%'}}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Date of Birth"
                    format="DD-MM-YYYY"         
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 6,
                        marginLeft: 0,
                        height: 18,
                        width: 18,
                    },
                    dateInput: {
                        borderWidth:0,
                        alignItems: 'flex-start',
                        paddingLeft:20,                        
                    },
                    
                }} 
          onDateChange={(date) => {this.setState({date: date})}}
        /> 
        </Item>
    </View>

            <View style={{flex: 1, paddingLeft: 50, paddingRight: 50}}>
            
              <Dropdown
                  placeholder="Gender"
                  data={data}
                  onChangeText={(text) => this.setState({gender: text})}
                  placeholderTextColor='rgba(104, 115, 115,0.4)'
              />         
             </View>
              
  
             <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>

              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Email' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({email: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Hospital' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({hospital: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item> 
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='credentials' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({credentials: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>  

             </View>


               <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 50, paddingRight: 50,paddingTop:20}}> 
              <View style={{ flexDirection: "row",paddingLeft:15,paddingRight:15 }}>
                <View style={{ flex: 1,paddingRight:15 }}>
                  <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.back() }>
                      <Text style={{ alignSelf: 'stretch',alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 22,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Back</Text>
                  </TouchableOpacity>
                </View>
  
                <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1,paddingLeft:15}}>
                    <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={this.Register }>
                      <Text style={{ alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 22,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
             </View>
          </ScrollView>
        </Container>
      );        
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }
}
const styles = StyleSheet.create ({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16
 }
})