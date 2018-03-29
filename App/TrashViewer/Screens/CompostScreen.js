import React, {Component} from 'react';
import {insertCommand} from '../Networking/server';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native'
import compostIcon from '../images/compost.png';

export default class GarbageScreen extends Component {
    constructor() {
        super();
        this.state = {
            timesOpened: 0
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                <TouchableHighlight
                    style={styles.icon}

                    onPress={() => {
                        const newCommand = {
                            openGarbage: true,
                            openCompost: false,
                            openRecycling: false
                        };

                        insertCommand(newCommand).then((result) => {
                            if (result === 'ok') {
                                this.state.timesOpened++;
                            }
                            else {
                                alert("could not open bin");
                            }
                        });
                    }}>

                    <Image
                        source={compostIcon}
                        style={styles.icon}
                    />

                </TouchableHighlight>

                <Text
                    style={styles.font}>
                    Times Opened: {this.state.timesOpened.toString()}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100
    },
    font: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
    }
});