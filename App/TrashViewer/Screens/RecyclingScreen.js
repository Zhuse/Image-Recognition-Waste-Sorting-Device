import React, {Component} from 'react';
import {insertCommand, getItemHistory} from '../Networking/server';
import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import garbageIcon from '../images/recycling.png';

export default class RecyclingScreen extends Component {
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
                            //TODO CHANGE THIS
                            const newCommand = {
                                id: 1,
                                auto: false,
                                garbageOpen: false,
                                recyclingOpen: !this.state.isOpen,
                                compostOpen: false
                            };

                            insertCommand(newCommand).then((response) => {
                                if (response.success) {
                                    this.setState({isOpen: !this.state.isOpen});
                                    if (this.state.isOpen) {
                                        this.setState({timesOpened: this.state.timesOpened + 1});
                                    }
                                }
                                else {
                                    alert("could not open bin");
                                }
                            });

                            getItemHistory(newCommand).then((response) => {
                                if (response.success) {
                                    this.setState({
                                        dataSource: response.history,   //TODO change this
                                        isLoading: false
                                    });
                                }
                                else {
                                    alert("could not load history");
                                }
                            });
                        }}>

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
                        extraData={this.state} //TODO might need this to display new history data
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>

            </View>
        );
    }

    componentDidMount() {
        const newCommand = {
            id: 1, //TODO CHANGE THIS
        };

        getItemHistory(newCommand).then((response) => {
            if (response.success) {
                this.setState({
                    dataSource: response.history,
                    isLoading: false
                });
            }
            else {
                alert("could not load history");
            }
        });
    }

    renderItem = ({item}) => {
        if (item.bin == 2) { //TODO CHANGE THIS
            return (
                <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>
                    {`${item.time}`}
                </Text>
            )
        }

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