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
            <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
                <Image style={{width: 100, height: 100, margin: 5}}
                       source={{uri: item.image}}/> //TODO change this
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
                    <Text style={{fontSize: 18, color: 'green', marginBottom: 15}}>
                        {item.name} //TODO change this
                    </Text>
                    <Text style={{fontSize: 18, color: 'green'}}>
                        {item.date} //TODO change this
                    </Text>
                </View>
            </View>
        )
    };

    renderSeparator = () => {
        return (
            <View>
                style={{height: 1, width: '100%', backgroundColor: 'black'}}>
            </View>
        )
    };

    componentDidMount() {
        const url = 'SERVER URL'; //TODO change this
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.DATAFIELDOFINTEREST, //TODO change this
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
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
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});