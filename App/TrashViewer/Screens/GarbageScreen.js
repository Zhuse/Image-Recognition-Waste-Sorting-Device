import React, {Component} from 'react';
import {insertCommand} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import garbageIcon from '../images/garbage.png';

export default class GarbageScreen extends Component {
    constructor() {
        super();
        this.state = {
            timesOpened: 0,
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
                        flex: 8,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <TouchableOpacity
                        style={styles.icon}

                        onPress={() => {
                            /*TODO CHANGE THIS*/
                            const newCommand = {
                                openGarbage: true,
                                openCompost: false,
                                openRecycling: false
                            };

                            //TODO change this. The current argument in then(...) (the return value of insertCommand) is a JSON object containing
                            //3 fields. openGarbage, openCompost, openRecycling
                            insertCommand(newCommand).then((indicator) => {
                                if (indicator.openGarbage === true) {
                                    this.state.timesOpened += 1;
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
                    flex: 2,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
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

    renderItem = ({item}) => {
        return (
            <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>
                {`${item.name.first} ${item.registered}`}
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

    componentDidMount() {
        const url = "https://randomuser.me/api?results=500";
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.results,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
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