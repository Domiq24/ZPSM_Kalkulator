import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorHorizontal({disp, setDisp, activeFunction, setFunction, lastNum, setNumber, action, memory, setMemory}) {
    const [isInv, setInv] = useState(false)
    const [inRad, setRad] = useState(true);

    const buttons = [
        {
            backgroundColor: '#505050',
            title: '(',
            onClick: () => {}
        },
        {
            backgroundColor: '#505050',
            title: ')',
            onClick: () => {}
        },
        {
            backgroundColor: '#505050',
            title: 'mc',
            onClick: () => setMemory(0)
        },
        {
            backgroundColor: '#505050',
            title: 'm+',
            onClick: () => setMemory(memory+Number(disp))
        },
        {
            backgroundColor: '#505050',
            title: 'm-',
            onClick: () => setMemory(memory-disp)
        },
        {
            backgroundColor: '#505050',
            title: 'mr',
            onClick: () => setDisp(memory)
        },
        {
            backgroundColor: '#505050',
            title: '2nd',
            onClick: () => setInv(!isInv)
        },
        {
            backgroundColor: '#505050',
            title: 'x^2',
            onClick: () => {func((num) => {return num**2})}
        },
        {
            backgroundColor: '#505050',
            title: 'x^3',
            onClick: () => {func((num) => {return num**3})}
        },
        {
            backgroundColor: '#505050',
            title: 'x^y',
            onClick: () => {func2((num1, num2) => Math.pow(num1, num2))}
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? '2^x' : 'e^x'),
            onClick: ( isInv ? () => {func((num) => {return 2**num})} : () => {func((num) => Math.exp(num))} )
        },
        {
            backgroundColor: '#505050',
            title: '10^x',
            onClick: () => {func((num) => {return 10**num})}
        },
        {
            backgroundColor: '#505050',
            title: '1/x',
            onClick: () => {func((num) => {return 1/num})}
        },
        {
            backgroundColor: '#505050',
            title: '√x',
            onClick: () => {func((num) => Math.sqrt(num))}
        },
        {
            backgroundColor: '#505050',
            title: '∛x',
            onClick: () => {func((num) => Math.cbrt(num))}
        },
        {
            backgroundColor: '#505050',
            title: 'y√x',
            onClick: () => {func2((num1, num2) => Math.pow(num1, -num2))}
        },
        {
            backgroundColor: '#505050',
            title: 'ln',
            onClick: () => {func((num) => Math.log(num))}
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'log2' : 'log10'),
            onClick: ( isInv ? () => {func((num) => Math.log2(num))} : () => {func((num) => Math.log10(num))} )
        },
        {
            backgroundColor: '#505050',
            title: 'x!',
            onClick: () => {func((num) =>  fact(num))}
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'sin^-1' : 'sin'),
            onClick: ( isInv ?
                () => { func((num) => Math.asin(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.sin(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'cos^-1' : 'cos'),
            onClick: ( isInv ?
                () => { func((num) => Math.acos(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.cos(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'tan^-1' : 'tan'),
            onClick: ( isInv ?
                () => { func((num) => Math.atan(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.tan(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: 'e',
            onClick: () => setDisp(Math.E)
        },
        {
            backgroundColor: '#505050',
            title: 'EE',
            onClick: () => {func2((num1, num2) => {return num1 * (10**num2)})}
        },
        {
            backgroundColor: '#505050',
            title: (inRad ? 'Rad' : 'Deg'),
            onClick: () => setRad(!inRad)
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'sinh^-1' : 'sinh'),
            onClick: ( isInv ?
                () => { func((num) => Math.asinh(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.sinh(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'cosh^-1' : 'cosh'),
            onClick: ( isInv ?
                () => { func((num) => Math.acosh(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.cosh(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: (isInv ? 'tanh^-1' : 'tanh'),
            onClick: ( isInv ?
                () => { func((num) => Math.atanh(( inRad ? num : num * (Math.PI/180) )) ) } :
                () => { func((num) => Math.tanh(( inRad ? num : num * (Math.PI/180) )) ) }
            )
        },
        {
            backgroundColor: '#505050',
            title: 'π',
            onClick: () => setDisp(Math.PI)
        },
    {
            backgroundColor: '#505050',
            title: 'Rand',
            onClick: () => setDisp(Math.random())
        }
    ];

    const func = (func) => {
        if(lastNum) {
            setDisp(func(Number(disp)));
        }
    }

    const func2 = (func) => {
        if(action != '' || !lastNum)
            return;
        if(activeFunction.length == 0) {
            setNumber(Number(disp));
            setDisp('0');
        }
        setFunction(() => func);
    }

    const fact = (num) => {
        if (num === 0 || num === 1) {
            return 1;
        }
        return num * fact(num - 1);
    }

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