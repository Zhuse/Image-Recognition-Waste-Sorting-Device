import React, {Component} from 'react';
import {insertCommand} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import garbageIcon from '../images/garbage.png';

export default class GarbageScreen extends Component {
    constructor() {
        super();
        this.state = {
            timesOpened: 0,
            isOpen: false,
            dataSource: [],
            isLoading: true
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View
                    style={{
                        flex: 7,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <TouchableOpacity
                        style={styles.icon}

                        onPress={() => {
                            const newCommand = {
                                id: 1, //TODO CHANGE THIS
                                auto: false,
                                garbageOpen: !this.state.isOpen,
                                recyclingOpen: false,
                                compostOpen: false
                            };

                            insertCommand(newCommand).then((response) => {
                                if (response.success == true) {
                                    this.setState({isOpen: !this.state.isOpen});
                                    if(this.state.isOpen) {
                                        this.setState({timesOpened: this.state.timesOpened + 1});
                                    }
                                }
                                else {
                                    alert("could not open bin");
                                }
                            });
                        }}>

                        <Image
                            source={garbageIcon}
                            style={styles.icon}
                        />

                    </TouchableOpacity>

                    <Text
                        style={styles.font}>
                        Times Opened: {this.state.timesOpened}
                    </Text>

                </View>

                <View style={{
                    flex: 3,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {/*
                    ALL LOG STUFF BELOW
                    */}
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>

            </View>
        );
    }

    componentDidMount() {
        const url = "http://34.218.219.101:3000/history"; /*TODO change this*/
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(`Response is`);
                console.log(`${JSON.stringify(responseJson)}`);
                this.setState({
                    dataSource: responseJson.history, /*TODO change this. responseJson.ARRAY_FIELD*/
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    renderItem = ({item}) => {
        return (
            <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>
                {`${item.time.toString()}`} /*TODO change this*/
            </Text>
        )

        //CODE FOR EXTRA INFO TO DISPLAY
        /*            <View style={{flex: 1, flexDirection: 'row', marginBottom: 2}}>
                <Image style={{width: 80, height: 80, margin: 3}}
                       source={{uri: item.picture.thumbnail}}/>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 3}}>
                    <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>
                        {`${item.name.first} ${item.registered}`}
                    </Text>
                    <Text style={{fontSize: 14, color: 'green'}}>
                        {`${item.dob}`}
                    </Text>
                </View>
            </View>*/
    };

    renderSeparator = () => {
        return (
            <View style={{height: 1, width: '100%', backgroundColor: 'blue'}}>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,

    },
    font: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
    },
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#bff6ff'
    },
    item: {
        padding: 10,
        fontSize: 15,
        height: 40,
    },
});