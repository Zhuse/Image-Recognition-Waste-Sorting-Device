import React, {Component} from 'react';
import {insertCommand, emptyCan} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Button} from 'react-native'
import GarbageScreen from './GarbageScreen'
import RecyclingScreen from './RecyclingScreen'
import CompostScreen from './CompostScreen'

export default class ControlScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <View
                    style={{
                        margin: 15
                    }}>
                    <Button
                        title="Empty Bins"
                        onPress={() => {
                            //TODO CHANGE THIS
                            const newCommand = {
                                id: 1,
                            };

                            emptyCan(newCommand).then((response) => {
                                if (response.success) {
/*                                    GarbageScreen.setState({
                                        dataSource: [],   //TODO change this
                                        isLoading: false
                                    });
                                    RecyclingScreen.setState({
                                        dataSource: [],   //TODO change this
                                        isLoading: false
                                    });
                                    CompostScreen.setState({
                                        dataSource: [],   //TODO change this
                                        isLoading: false
                                    });*/
                                    this.setState({
                                        dataSource: [],
                                        isLoading:false
                                    });

                                    alert("Bins Emptied");
                                }
                                else {
                                    alert("could not empty bins");
                                }
                            });

                        }}/>
                </View>

                <View
                    style={{
                        margin: 15
                    }}>
                    <Button
                        title="Automatic Mode"
                        onPress={() => {
                            //TODO CHANGE THIS
                            const newCommand = {
                                id: 1,
                                auto: true,
                                garbageOpen: false,
                                recyclingOpen: false,
                                compostOpen: false,
                            };

                            insertCommand(newCommand).then((response) => {
                                if (response.success) {
                                    alert("Automatic Mode Enabled");
                                }
                                else {
                                    alert("could not change to automatic mode");
                                }
                            });

                        }}/>
                </View>

            </View>


        );
    }
}


