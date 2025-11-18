import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorHorizontal({setDisp, memory, setMemory, functions, options, setOptions}) {

    const buttons = [
        {
            backgroundColor: '#505050',
            title: '(',
            onClick: () => functions.openBracket()
        },
        {
            backgroundColor: '#505050',
            title: ')',
            onClick: () => functions.closeBracket()
        },
        {
            backgroundColor: '#505050',
            title: 'mc',
            onClick: () => setMemory(0)
        },
        {
            backgroundColor: '#505050',
            title: 'm+',
            onClick: () => setMemory(memory+Number(solution()))
        },
        {
            backgroundColor: '#505050',
            title: 'm-',
            onClick: () => setMemory(memory-Number(solution()))
        },
        {
            backgroundColor: '#505050',
            title: 'mr',
            onClick: () => setDisp(memory)
        },
        {
            backgroundColor: '#505050',
            title: '2nd',
            onClick: () => setOptions(prevState => ({...prevState, isInv: !options.isInv}))
        },
        {
            backgroundColor: '#505050',
            title: 'x^2',
            onClick: () => functions.ack('^2', false)
        },
        {
            backgroundColor: '#505050',
            title: 'x^3',
            onClick: () => functions.ack('^3', false)
        },
        {
            backgroundColor: '#505050',
            title: 'x^y',
            onClick: () => functions.ack('^')
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? '2^x' : 'e^x' ),
            onClick: ( options.isInv ? () => functions.func('2^') : () => functions.func('exp(') )
        },
        {
            backgroundColor: '#505050',
            title: '10^x',
            onClick: () => functions.func('10^')
        },
        {
            backgroundColor: '#505050',
            title: '1/x',
            onClick: () => functions.func('1/')
        },
        {
            backgroundColor: '#505050',
            title: '√x',
            onClick: () => functions.func('sqrt(')
        },
        {
            backgroundColor: '#505050',
            title: '∛x',
            onClick: () => functions.func('cbrt(')
        },
        {
            backgroundColor: '#505050',
            title: 'y√x',
            onClick: () => functions.func('root(', true)
        },
        {
            backgroundColor: '#505050',
            title: 'ln',
            onClick: () => functions.func('ln(')
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'log2' : 'log10' ),
            onClick: (options.isInv ? () => functions.func('log2(') : () => functions.func('log10(') )
        },
        {
            backgroundColor: '#505050',
            title: 'x!',
            onClick: () => functions.ack('!', false)
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'asin' : 'sin' ),
            onClick: ( options.isInv ?
                () => functions.func('asin(') :
                () => functions.func('sin(')
            )
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'acos' : 'cos' ),
            onClick: ( options.isInv ?
                () => functions.func('acos(') :
                () => functions.func('cos(')
            )
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'atan' : 'tan' ),
            onClick: ( options.isInv ?
                () => functions.func('atan(') :
                () => functions.func('tan(')
            )
        },
        {
            backgroundColor: '#505050',
            title: 'e',
            onClick: () => functions.symbol('E')
        },
        {
            backgroundColor: '#505050',
            title: 'EE',
            onClick: () => functions.ack('EE')
        },
        {
            backgroundColor: '#505050',
            title: ( options.inRad ? 'Rad' : 'Deg' ),
            onClick: () => setOptions(prevState => ({...prevState, inRad: !options.inRad}))
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'asinh' : 'sinh' ),
            onClick: ( options.isInv ?
                () => functions.func('asinh(') :
                () => functions.func('sinh(')
            )
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'acosh' : 'cosh' ),
            onClick: ( options.isInv ?
                () => functions.func('acosh(') :
                () => functions.func('cosh(')
            )
        },
        {
            backgroundColor: '#505050',
            title: ( options.isInv ? 'atanh' : 'tanh' ),
            onClick: ( options.isInv ?
                () => functions.func('atanh(') :
                () => functions.func('tanh(')
            )
        },
        {
            backgroundColor: '#505050',
            title: 'π',
            onClick: () => functions.symbol('PI')
        },
    {
            backgroundColor: '#505050',
            title: 'Rand',
            onClick: () => functions.symbol(Math.random())
        }
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
        flex: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        alignContent: 'stretch'
    }
});

export default CalculatorHorizontal;