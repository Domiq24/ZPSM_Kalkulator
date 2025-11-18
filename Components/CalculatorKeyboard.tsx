import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorKeyboard({setDisp, options, functions}) {

    const buttons = [
        {
            backgroundColor: '#505050',
            title: 'AC',
            onClick: () => functions.clear()
        },
        {
            backgroundColor: '#505050',
            title: '+/-',
            onClick: () => functions.sign()
        },
        {
            backgroundColor: '#505050',
            title: '%',
            onClick: () => functions.ack('%')
        },
        {
            backgroundColor: '#E08000',
            title: 'x',
            onClick: () => functions.ack('*')
        },
        {
            backgroundColor: '#707070',
            title: '1',
            onClick: () => functions.num(1)
        },
        {
            backgroundColor: '#707070',
            title: '2',
            onClick: () => functions.num(2)
        },
        {
            backgroundColor: '#707070',
            title: '3',
            onClick: () => functions.num(3)
        },
        {
            backgroundColor: '#E08000',
            title: '/',
            onClick: () => functions.ack('/')
        },
        {
            backgroundColor: '#707070',
            title: '4',
            onClick: () => functions.num(4)
        },
        {
            backgroundColor: '#707070',
            title: '5',
            onClick: () => functions.num(5)
        },
        {
            backgroundColor: '#707070',
            title: '6',
            onClick: () => functions.num(6)
        },
        {
            backgroundColor: '#E08000',
            title: '+',
            onClick: () => functions.ack('+')
        },
        {
            backgroundColor: '#707070',
            title: '7',
            onClick: () => functions.num(7)
        },
        {
            backgroundColor: '#707070',
            title: '8',
            onClick: () => functions.num(8)
        },
        {
            backgroundColor: '#707070',
            title: '9',
            onClick: () => functions.num(9)
        },
        {
            backgroundColor: '#E08000',
            title: '-',
            onClick: () => functions.ack('-')
        },
        {
            backgroundColor: '#707070',
            title: '0',
            flex: 2,
            onClick: () => functions.num(0)
        },
        {
            backgroundColor: '#707070',
            title: (options.isInv ? ',' : '.'),
            onClick: (options.isInv ? () => functions.coma() : () => functions.dot())
        },
        {
            backgroundColor: '#E08000',
            title: '=',
            onClick: () => setDisp(functions.solve())
        },
    ];

    return(
        <View style={styles.container}>
            {buttons.map(button => <Button
                backgroundColor={button.backgroundColor}
                title={button.title}
                color={button.color}
                flex={button.flex}
                disabled={button.disabled}
                onClick={() => button.onClick()}
            />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        alignContent: 'stretch'
    }
});

export default CalculatorKeyboard;