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

export default class UpdateMedicalInfo extends Component { 
  constructor(props) {
    super(props);
    this.state = {
        allergies:'',
        immunization:'',
        healthcondition:'',   
        pre_content : false    
       
    };
}

back(){
  Actions.pop();
}
update(){       
    Actions.addpatients({pre_content:this.state.pre_content,allergies:this.state.allergies, immunization:this.state.immunization, healthcondition:this.state.healthcondition})
}

componentDidMount(){
  this.setState({pre_content:!this.props.show})
}

  render(){ 
    
    return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
      
          <ScrollView contentContainerStyle={{flexGrow: 1}}>        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30, paddingTop:10}}>          
              <View style={{marginBottom: 35, width: '100%'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', width: '100%', color: '#2c3e50'}}>Update Medical Information</Text>
              </View>
               <Item style={{marginBottom: 20}}>                 
                  <Input placeholder='Enter List Of Allergies, seperated by a comma ' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({allergies: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>
              <Item style={{marginBottom: 20}}>                  
                  <Input placeholder='Enter List Of immunization received, seperated by a comma ' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({immunization: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item> 
              <Item style={{marginBottom: 20}}>                  
                  <Input placeholder='Enter List Of health condition, seperated by a comma ' style={{color: '#687373',fontSize:15}} onChangeText={(text) => this.setState({healthcondition: text})} placeholderTextColor="rgba(104, 115, 115,0.4)" />
              </Item>            

             </View>


               <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 50, paddingRight: 50,paddingTop:20}}> 
              <View style={{ flexDirection: "row",paddingLeft:15,paddingRight:15 }}>
                <View style={{ flex: 1,paddingRight:15 }}>
                  <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.update() }>
                      <Text style={{ alignSelf: 'stretch',alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 22,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Save</Text>
                  </TouchableOpacity>
                </View>
  
                <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
                  <View style={{ flex: 1,paddingLeft:15}}>
                    <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: 'rgba(0,0,0,0.8)'}} onPress={() => this.back() }>
                      <Text style={{ alignSelf: 'center',
                              color: '#ffffff',
                              fontSize: 22,
                              fontWeight: '600',
                              paddingTop: 10,
                              paddingBottom: 10 }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
             </View>
          </ScrollView>
        </Container>
      );        
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