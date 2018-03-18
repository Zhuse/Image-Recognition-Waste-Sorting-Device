import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native'
import {TabNavigator} from 'react-navigation'

class HomeScreen extends Component{
    render(){
        return(
            <View>
            <Text>HomeScreen Data displayed here</Text>
            </View>
        );
    }
}

const HomeScreenTabNavigator = TabNavigator({
    HomeScreen:{
        screen: HomeScreen
    },

}