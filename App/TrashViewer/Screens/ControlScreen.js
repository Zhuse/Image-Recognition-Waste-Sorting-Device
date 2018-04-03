import React, {Component} from 'react';
import {emptyCan} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'

class ControlScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 3,
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
                            }
                            else {
                                alert("could not load history");
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
                        };

                        insertCommand(newCommand).then((response) => {
                            if (response.success) {
                                this.setState({
                                    dataSource: [],   //TODO change this
                                    isLoading: false
                                });
                            }
                            else {
                                alert("could not load history");
                            }
                        });

                    }}/>

            </View>

        );
    }
}