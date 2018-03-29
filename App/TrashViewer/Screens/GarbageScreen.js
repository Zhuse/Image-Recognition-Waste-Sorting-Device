import React, {Component} from 'react';
import {insertCommand} from '../Networking/server';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native'
import garbageIcon from '../images/garbage.png';

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
                        source={garbageIcon}
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

//TODO code for GET requests below
/*/!*TODO change item.fields below*!/
constructor()
{
    super();
    this.state = {
        dataSource: [],
        isLoading: true
    }
}

renderItem = ({item}) => {
    return (
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 2}}>
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
        </View>
    )
};

renderSeparator = () => {
    return (
        <View style={{height: 1, width: '100%', backgroundColor: 'blue'}}>
        </View>
    )
};

componentDidMount()
{
    const url = "https://randomuser.me/api?results=500";
    /!*TODO change this *!/
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.results, /!*TODO change this *!/
                isLoading: false
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

render()
{
    return (
        this.state.isLoading
            ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#330066" animating/>
            </View>
            :
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
    );
}
}

const styles = StyleSheet.create({
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});*/


//WORKING BUT OLD CODE
/*import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default class App extends Component {
    state = {
        dataSource: []
    };

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const serverResponse = await fetch("https://randomuser.me/api?results=500");
        const JSON = await serverResponse.json();
        this.setState({ dataSource: JSON.results });
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) =>
                        <Text style = {styles.titleText}>
                            {`${item.name.first} ${item.registered}`}
                        </Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});*/