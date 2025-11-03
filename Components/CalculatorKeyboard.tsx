import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorKeyboard({disp, setDisp, lastNum, setLast, action, setAction, number, setNumber, activeFunction, setFunction}) {

    const buttons = [
        {
            backgroundColor: '#505050',
            title: 'AC',
            onClick: () => clear()
        },
        {
            backgroundColor: '#505050',
            title: '+/-',
            onClick: () => setDisp(-disp)
        },
        {
            backgroundColor: '#505050',
            title: '%',
            onClick: () => ack('%')
        },
        {
            backgroundColor: '#E08000',
            title: 'x',
            onClick: () => ack('*')
        },
        {
            backgroundColor: '#707070',
            title: '1',
            onClick: () => num(1)
        },
        {
            backgroundColor: '#707070',
            title: '2',
            onClick: () => num(2)
        },
        {
            backgroundColor: '#707070',
            title: '3',
            onClick: () => num(3)
        },
        {
            backgroundColor: '#E08000',
            title: '/',
            onClick: () => ack('/')
        },
        {
            backgroundColor: '#707070',
            title: '4',
            onClick: () => num(4)
        },
        {
            backgroundColor: '#707070',
            title: '5',
            onClick: () => num(5)
        },
        {
            backgroundColor: '#707070',
            title: '6',
            onClick: () => num(6)
        },
        {
            backgroundColor: '#E08000',
            title: '+',
            onClick: () => ack('+')
        },
        {
            backgroundColor: '#707070',
            title: '7',
            onClick: () => num(7)
        },
        {
            backgroundColor: '#707070',
            title: '8',
            onClick: () => num(8)
        },
        {
            backgroundColor: '#707070',
            title: '9',
            onClick: () => num(9)
        },
        {
            backgroundColor: '#E08000',
            title: '-',
            onClick: () => ack('-')
        },
        {
            backgroundColor: '#707070',
            title: '0',
            flex: 2,
            onClick: () => num(0)
        },
        {
            backgroundColor: '#707070',
            title: ',',
            onClick: () => dot()
        },
        {
            backgroundColor: '#E08000',
            title: '=',
            onClick: () => solve()
        },
    ];

    const clear = () => {
        setDisp('0');
        setNumber(0);
        setLast(true);
        setAction('');
        setFunction(null);
        setFunction(() => () => {});
    };

    const num = (num) => {
        if(disp == '0') {
            setDisp(String(num));
        } else {
            setDisp(disp+num);
        }
        setLast(true);
    }

    const ack = (ack) => {
        if(activeFunction.length > 0)
            return;
        if(action == '') {
            setNumber(Number(disp));
            setDisp('0');
            setAction(ack);
        } else if(lastNum) {
            solve();
            setDisp('0');
            setAction(ack);
        }
        setLast(false);
    }

    const dot = () => {
        if(disp.search(/[.]/) < 0) {
            setDisp(disp+'.');
            setLast(false);
        }
    }

    const solve = () => {
        switch(action) {
            case '%':
                if(disp != '0')
                    setDisp(number%disp);
                setNumber(number%disp);
                break;
            case '/':
                if(disp != '0')
                    setDisp(number/disp);
                setNumber(number/disp);
                break;
            case '*':
                setDisp(number*disp);
                setNumber(number*disp);
                break;
            case '-':
                setDisp(number-disp);
                setNumber(number-disp);
                break;
            case '+':
                setDisp(number+Number(disp));
                setNumber(number+Number(disp));
                break;
            default:
                if(activeFunction.length == 2 && lastNum) {
                    setDisp(() => String(activeFunction(number, Number(disp))));
                }
                break;
        }
        setAction('');
        setFunction(() => () => {});
    };

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