import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    Alert,
    Text,
    View
} from 'react-native';

export default class QuotePage extends Component {


    render() {

        var quotes = 
        [
            {
                quote: 'Lemme get uhh boneless pizza',
                author: 'Eric Salveson'
            },
            {
                quote: 'I just wanna watch the words and laugh',
                author: 'Jordan Lovato'
            },
            {
                quote: 'wha happun',
                author: 'Sparkle Cleaners Guy'
            },
            {
                quote: 'Are you down with the clown?',
                author: 'Tony Gemma'
            },
            {
                quote: 'Mess me up with McDoubles fam',
                author: 'Drunk guy in McDonalds drive-thru'
            }
        ];

        var rand = quotes[Math.floor(Math.random() * quotes.length)];
        var randQuote = rand.quote;
        var randAuth = rand.author;
        
        return (
            <View style={{flex: 1}}>

                <View style={{flex: 2, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: 'steelblue'
                }}>
                    <Text>Thanks!</Text>
                </View>

                <View style={{flex: 3, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: 'skyblue'
                }}>
                    <Text>"{ randQuote }"</Text>
                    <Text>-- {randAuth}</Text>
                </View>
                <View style={{flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'skyblue'
                }}>
                    <Button
                        title='OK'
                        color='steelblue'
                    /><Button
                        title='Map'
                        color='steelblue'
                    />
                </View>

            </View>
        );
    }
}

