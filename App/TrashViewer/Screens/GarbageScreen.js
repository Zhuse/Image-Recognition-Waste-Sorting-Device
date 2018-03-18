import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native'

export default class GarbageScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'A'},
                        {key: 'B'},
                        {key: 'C'},
                        {key: 'D'},
                        {key: 'E'},
                        {key: 'F'},
                        {key: 'G'},
                        {key: 'H'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
})