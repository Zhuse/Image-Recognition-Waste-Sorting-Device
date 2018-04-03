import React, {Component} from 'react';
import {insertCommand, emptyCan} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Button} from 'react-native'
import garbageIcon from '../images/garbage.png';

export default class ControlScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                <Button
                    title="Empty Bins"
                    color="#841584"

                    onPress={() => {
                        //TODO CHANGE THIS
                        const newCommand = {
                            id: 1,
                        };

                        emptyCan(newCommand).then((response) => {
                            if (response.success) {
                                this.setState({
                                    dataSource: [],   //TODO change this
                                    isLoading: false
                                });

                                alert("Bins Emptied");
                            }
                            else {
                                alert("could not empty bins");
                            }
                        });

                    }}/>

                <Button
                    title="Automatic Mode"
                    color="#841584"

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

        );
    }
}