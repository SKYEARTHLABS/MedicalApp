/**
* This is the Signup Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Alert,StyleSheet  } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Picker} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';


export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        type_of_user: '',
        hasError: false,
        errorText: '',
      };
  }

  login(){
    Actions.login();
}

  Register = () =>{

    fetch('http://10.0.2.2:8000/api/userregister', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name : this.state.username,
      password : this.state.password,
      type_of_user : this.state.type_of_user,
         })

    }).then((response) => response.json())
        .then((responseJson) => {
          if(this.state.username==="") {
            this.setState({hasError: true, errorText: 'Please enter your name '});
            return;
          }
          else if(this.state.password==="") {
            this.setState({hasError: true, errorText: 'Please enter password, not less than 6 characters'});
            return;
          }
          else if(this.state.password.length < 6) {
            this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
            return;
          }
          else if(this.state.type_of_user==="") {
            this.setState({hasError: true, errorText: 'Please select type of user !'});
            return;
          }
          else if((this.state.type_of_user==="Doctor")){           
            Actions.doctorregistration();                   
          }
          else if((this.state.type_of_user==="Volunteer")){          
            Actions.volunteerregistration();
          }
          else if((this.state.type_of_user==="Mobile_hospital")){          
            Actions.mobilehospitalregistration();
          }
          else{
            this.setState({hasError: true, successText:'Registration Unuccessful, Try Again'});
            return;
          }

        }).catch((error) => {
          console.error(error);
        });

}

  back(){
    Actions.pop();
}


  render() {  
    let data = [{
        value: 'Doctor',
      }, {
        value: 'Volunteer',
      }, {
        value: 'Mobile_hospital',
    }, {
        value: 'Patient',
      }]; 
   
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
    
        <ScrollView contentContainerStyle={{flexGrow: 1}}>        
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 50, paddingRight: 50, paddingTop:80}}>          
            <View style={{marginBottom: 35, width: '100%'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}>Register </Text>
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
            </View>
            <View style={{flex: 1, paddingLeft: 50, paddingRight: 50}}> 
            <Dropdown
                placeholder="Type of user"
                data={data}
                onChangeText={(text) => this.setState({type_of_user: text})}
            />         
           </View>
            

             <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}> 
            <View style={{ flexDirection: "row",paddingLeft:15,paddingRight:15,paddingTop:80 }}>
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
                  <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={this.Register}>
                    <Text style={{ alignSelf: 'center',
                            color: '#ffffff',
                            fontSize: 22,
                            fontWeight: '600',
                            paddingTop: 10,
                            paddingBottom: 10 }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingVertical:50,alignItems: 'flex-end'}} >
                <Text style={styles.registertext}>Have an Account already?</Text>
                  <TouchableOpacity onPress={()=> this.login()}>
                    <Text style={styles.registerbutton}>Sign In</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
      </Container>
    );
  }

   next() {
    if(this.state.username===""||this.state.password===""||this.state.type_of_user==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
   
    if(this.state.username.length < 3) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 3 characters !'});
      return;
    }
    if(this.state.password.length < 6) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 6 characters !'});
      return;
    }
    if(this.state.username!==""||this.state.password!==""||this.state.type_of_user!=="")
    this.setState({hasError: false, successText:'Registration Successful'});   
   
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
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