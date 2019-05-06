import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Alert,StyleSheet  } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Picker} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
 

import Colors from '../Colors';
import Text from '../component/Text';

export default class DoctorRegistration extends Component {
  back(){
    Actions.pop();
}
  constructor(props) {
    super(props);
    this.state = {
      hospitalname : '',
      hospitaladdress : '',
      phonenumber     : '',     
      email     : '',     
      hasError  : false,
      errorText : '',      
    };
}
Register = () =>{

    fetch('http://10.0.2.2:8000/api/mobilehospitalregister', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hospital_name : this.state.hospitalname,
      hospital_address : this.state.hospitaladdress,
      phone_number : this.state.phonenumber,      
      email : this.state.email,    
        })

    }).then((response) => response.json())
        .then((responseJson) => {
          if(this.state.hospitalname==="") {
            this.setState({hasError: true, errorText: 'Please enter hospital name '});
            return;
          }
          if(this.state.hospitaladdress==="") {
            this.setState({hasError: true, errorText: 'Please enter hospital address '});
            return;
          }
          if(this.state.phonenumber==="") {
            this.setState({hasError: true, errorText: 'Please enter phone number '});
            return;
          }
                 
          if(!this.verifyEmail(this.state.email)) {
            this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
            return;
          }    
         
          else {

          // Showing response message coming from server after inserting records.
          this.setState({hasError: false, successText:'Registration Successful'}); 
        }

        }).catch((error) => {
          console.error(error);
        });

}

  render(){

    
    return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
      
          <ScrollView contentContainerStyle={{flexGrow: 1}}>        
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 50, paddingRight: 50, paddingTop:10}}>          
              <View style={{marginBottom: 35, width: '100%'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}> Mobile Hospital</Text>
              </View>
              {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10,fontSize:15}}>{this.state.errorText}</Text>:<Text style={{color: "green",fontSize:15, textAlign: 'center', marginTop: 10}}>{this.state.successText}</Text>}
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Hospital Name' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({hospitalname: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Hospital Address' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({hospitaladdress: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Phone Number' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({phonenumber: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item> 
              
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Email' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({email: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
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