import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {TabNavigator, TabBarBottom} from 'react-navigation'

import GarbageScreen from './Screens/GarbageScreen'
import RecyclingScreen from './Screens/RecyclingScreen'
import CompostScreen from './Screens/CompostScreen'
import ControlScreen from './Screens/CompostScreen'

class App extends Component {
    render() {
        return (
            <AppTabNavigator/>
        );
    }
}

export default App;

const AppTabNavigator = TabNavigator(
    {
        Garbage: {
            screen: GarbageScreen
        },
        Compost: {
            screen: CompostScreen
        },
        Recycling: {
            screen: RecyclingScreen
        },
        Control:{
            screen: ControlScreen
        }
    },
    {
/*        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,*/
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    }
);

/*const AppNavigator = StackNavigator({
    HomeScreen: {screen: HomeScreen},
    GarbageScreen: {screen: GarbageScreen},
    CompostScreen: {screen: CompostScreen},
    RecyclingScreen: {screen: RecyclingScreen},
});*/
