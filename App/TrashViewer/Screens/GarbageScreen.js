import React, { Component } from "react";
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
});

/*    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) =>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
                            {/!*             <Image style={{width: 100, height: 100, margin: 5}}
                    //source={{uri: item.image}}/> //TODO change this
                       source={{uri: item.picture}}/> //TODO change this*!/}
                            <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
                                <Text style={{fontSize: 18, color: 'green', marginBottom: 15}}>
                                    /!*{item.name}*!/ //TODO change this
                                    {`${item.name.first} ${item.name.last}`} //TODO change this
                                </Text>
                                <Text style={{fontSize: 18, color: 'green'}}>
                                    /!*{item.date}*!/ //TODO change this
                                    {`${item.name.first} ${item.name.last}`} //TODO change this
                                </Text>
                            </View>
                        </View>}
                />
            </View>
        );
    }*/

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})*/

/*
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image, ActivityIndicator} from 'react-native'

export default class GarbageScreen extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }



    renderItem = ({item}) => {
        return (
            <View>
                <Image style={{width: 100, height: 100}}
                    //source={{uri: item.image}}/> //TODO change this
                       source={{uri: item.picture}}/> //TODO change this
                <View>
                    <Text>
                        /!*{item.name}*!/ //TODO change this
                        {item.name} //TODO change this
                    </Text>
                    <Text>
                        /!*{item.date}*!/ //TODO change this
                        {item.company} //TODO change this
                    </Text>
                </View>
            </View>
        )
    };
/!*
    renderSeparator = () => {
        return (
            <View>
                style={{height: 1, width: '100%', backgroundColor: 'black'}}>
            </View>
        )
    };*!/

    componentDidMount() {
        //const url = 'SERVER URL'; //TODO change this
        const url = 'http://www.json-generator.com/api/json/get/bVttMJAQeq?indent=2'; //TODO change this
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    //dataSource: responseJson.DATAFIELDOFINTEREST, //TODO change this
                    dataSource: responseJson, //TODO change this
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            /!*this.state.isLoading
                ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#330066" animating/>
                </View>
                :*!/
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        //ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});*/
