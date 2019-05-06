import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Alert,StyleSheet,TextInput  } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Picker} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
 

import Colors from '../Colors';
import Text from '../component/Text';

export default class AddPatients extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      firstname : '',
      lastname  : '',
      dob       : '',
      gender    : '',
      region     : '',      
      list_of_allergies : '',
      list_of_immunizations : '',
      list_of_health_conditions : '',  
      hasError  : false,
      errorText : '',
      date      : '',
      show      : false,
      numberHolder:''
    };
}


back(){
  Actions.pop();
  }

  medicalinfo(){
  
   Actions.updatemedicalinfo(this.state.show);
  
   //alert(Math.floor(100000 + Math.random() * 900000))
  }


add = () =>{

    fetch('http://10.0.2.2:8000/api/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
      patient_id : Math.floor(100000 + Math.random() * 900000),
      voluntee_id : this.props.volunteer_id,
      fname : this.state.firstname,
      lname : this.state.lastname,
      dob : this.state.date,
      gender : this.state.gender,
      region : this.state.region,
      list_of_allergies: this.state.list_of_allergies,
      list_of_immunizations : this.state.list_of_immunizations,
      list_of_health_conditions : this.state.list_of_health_conditions,
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
         
          else {

          // Showing response message coming from server after inserting records.
          this.setState({hasError: false, successText:'Patient Added Successfully'});          
      
            // Actions.doctorwelcomescreen();
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
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50, paddingTop:10}}>          
              <View style={{marginBottom: 35, width: '100%'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}>Add Patients</Text>
              </View>
              {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 5,fontSize:15}}>{this.state.errorText}</Text>:<Text style={{color: "green",fontSize:15, textAlign: 'center', marginTop: 10}}>{this.state.successText}</Text>}
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Firstname' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({firstname: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item>
                  <Icon active name='ios-person' style={{color: '#687373',fontSize:15}} />
                  <Input placeholder='Lastname' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({lastname: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              
            </View>
            <View style={{paddingLeft: 50, paddingRight: 50}}>
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
                        paddingTop:0                       
                    },
                    
                }} 
          onDateChange={(date) => {this.setState({date: date})}}
        /> 
        </Item>
    
            
              <Dropdown
                  placeholder="Gender"
                  data={data}
                  onChangeText={(text) => this.setState({gender: text})}
                  placeholderTextColor='rgba(104, 115, 115,0.4)'
              />         
             </View>
             <View style={{alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
             <Item>
             <Input            
             placeholder="country" style={{color: '#687373',fontSize:15}} placeholderTextColor="rgba(104, 115, 115,0.4)"/>             
             <Input
               placeholder="zip code" style={{color: '#687373',fontSize:15}} placeholderTextColor="rgba(104, 115, 115,0.4)"/>             
             <Input              
             placeholder="city/town" style={{color: '#687373',fontSize:15}} placeholderTextColor="rgba(104, 115, 115,0.4)"/>
             </Item>
             </View>
             <View style={{borderLeftWidth: 1,borderLeftColor: 'white',paddingTop:20}}/>
                  <View style={{paddingLeft: 50, paddingRight: 50}}>
                    <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.7)'}} onPress={() => this.medicalinfo() }
                    >
                      <Text style={{ alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 18,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Add Medical Information</Text>
                    </TouchableOpacity>
                  </View>           
              
  
                 {this.props.pre_content?
               <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50,paddingTop:10}}> 
               <Text style={{fontSize: 14,  textAlign: 'left', width: '100%', color: '#2c3e50'}}>
               Allergies:  {this.props.allergies} {'\n'}
               Immunization:{this.props.immunization} {'\n'}
               Health Condition:{this.props.healthcondition} {'\n'}
                </Text>  
                <View style={{ flexDirection: "row"}}>
                <View style={{ flex: 1}}>
                  <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.7)'}} onPress={() => this.add }
                 >
                      <Text style={{ alignSelf: 'stretch',alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 18,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Add</Text>
                  </TouchableOpacity>
                </View>
                </View>           
             </View>
             :null
             
                } 
                 <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50,paddingBottom:10,paddingTop:10}}>          

                 
                 <View style={{ flexDirection: "row" }}>
                <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1}}>
                    <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.7)'}} onPress={() => this.back()}
                    >
                      <Text style={{ alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 18,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Back</Text>
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
/* import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class AddPatients extends Component {

  constructor() {
    super();
    this.state = {
      content: false
    }
  }

  componentHideAndShow = () => {
    //this.setState(previousState => ({ content: !previousState.content }))
    Actions.updatemedicalinfo(this.state.content);
  }


  render() {

    return (
      <View style={styles.container}>

       {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.props.pre_content ? <Text style= {styles.headerText}> hi..{this.props.allergies} </Text> : null
      }
 
      <Button title="Hide Text Component" onPress={this.componentHideAndShow} />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },

}); */