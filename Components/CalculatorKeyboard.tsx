import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorKeyboard({disp, setDisp, lastNum, setLast, action, setAction, number, setNumber, activeFunction, setFunction}) {

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
            <View style={styles.row}>
                <Button text="AC" color="#505050" onClick={() => clear()}/>
                <Button text="+/-" color="#505050" onClick={() => setDisp(-disp)}/>
                <Button text="%" color="#505050" onClick={() => ack('%')}/>
                <Button text="x" color="#E08000" onClick={() => ack('*')}/>
            </View>
            <View style={styles.row}>
                <Button text="1" color="#707070" onClick={() => num(1)}/>
                <Button text="2" color="#707070" onClick={() => num(2)}/>
                <Button text="3" color="#707070" onClick={() => num(3)}/>
                <Button text="/" color="#E08000" onClick={() => ack('/')}/>
            </View>
            <View style={styles.row}>
                <Button text="4" color="#707070" onClick={() => num(4)}/>
                <Button text="5" color="#707070" onClick={() => num(5)}/>
                <Button text="6" color="#707070" onClick={() => num(6)}/>
                <Button text="+" color="#E08000" onClick={() => ack('+')}/>
            </View>
            <View style={styles.row}>
                <Button text="7" color="#707070" onClick={() => num(7)}/>
                <Button text="8" color="#707070" onClick={() => num(8)}/>
                <Button text="9" color="#707070" onClick={() => num(9)}/>
                <Button text="-" color="#E08000" onClick={() => ack('-')}/>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={{flex: 2, backgroundColor: '#707070', justifyContent: 'center'}} onPress={() => num(0)}>
                    <Text style={{textAlign: 'left', color: 'white', fontSize: 24, paddingLeft: 40}}>0</Text>
                </TouchableOpacity>
                <Button text="." color="#707070" onClick={() => {setDisp(disp+".")}}/>
                <Button text="=" color="#E08000" onClick={() => solve()}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'column',
        gap: 4
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 4,
        alignContent: 'space-around'
    },
});

export default CalculatorKeyboard;