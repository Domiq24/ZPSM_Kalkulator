/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import CalculatorKeyboard from './Components/CalculatorKeyboard.tsx';
import CalculatorHorizontal from './Components/CalculatorHorizontal.tsx';
import SplashScreen from 'react-native-splash-screen';

function App() {
    const [disp, setDisp] = useState('0');
    const [memory, setMemory] = useState(0);
    const [options, setOptions] = useState({
        isHorizontal: true,
        isInv: false,
        inRad: false
    });
    const [props, setProps] = useState({
        last: 'num',
        comas: 0,
        brackets: 0,
        openFuncs: 0
    });
    const [functions, setFunctions] = useState({
        clear: () => clear(),
        num: (n) => num(n),
        ack: (a, c = true) => ack(a, c),
        dot: () => dot(),
        coma: () => coma(),
        sign: () => sign(),
        symbol: (s) => symbol(s),
        func: (f, c = false) => func(f, c),
        openBracket: () => openBracket(),
        closeBracket: () => closeBracket(),
        solve: () => solve()
    });

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const myEval = (str) => eval(str);

    clear = () => {
        setDisp('0');
        setProps(prevState => ({
            ...prevState,
            last: 'num',
            brackets: 0,
            comas: 0,
            openFuncs: 0
        }));
    };

    num = (num) => {
        if(props.last != 'closed'){
            if(disp == '0') {
                setDisp(String(num));
            } else {
                setDisp(disp+String(num));
            }
            setProps(prevState => ({
                ...prevState,
                last: 'num',
                openFuncs: (props.comas < props.openFuncs ? props.openFuncs-1 : props.openFuncs)
            }));
        }
    }

    ack = (ack, continues = true) => {
        if((continues && ['num', 'closed'].includes(props.last)) || (!continues && props.last == 'num')) {
            setDisp(disp+ack);
            setProps(prevState => ({
                ...prevState,
                last: (continues ? 'other' : 'closed'),
            }));
        }
    }

    dot = () => {
        if(props.last == 'num' && disp.search(/\d+[.]\d+$/) < 0) {
            setDisp(disp+'.');
            setProps(prevState => ({
                ...prevState,
                last: 'other'
            }));
        }
    }

    coma = () => {
        if(['num', 'closed'].includes(props.last) && props.comas > 0) {
            setDisp(disp+', ');
            setProps(prevState => ({
                ...prevState,
                last: 'other',
                comas: props.comas-1
            }));
        }
    }

    symbol = (sym) => {
        if(props.last == 'num' && disp == '0') {
            setDisp(String(sym));
        } else if(!['num', 'closed'].includes(props.last)) {
            setDisp(disp+String(sym));
        }
        setProps(prevState => ({
            ...prevState,
            last: 'closed',
            openFuncs: (props.comas < props.openFuncs ? props.openFuncs-1 : props.openFuncs)
        }));
    }

    sign = () => {
        if(props.last == 'num') {
            setDisp(disp.replace(/\d+([.]\d+)?$/, '(-$&)'));
            setProps(prevState => ({
                ...prevState,
                last: 'closed'
            }));
        } else {
            setDisp(disp.replace(/(\(-)(\d+([.]\d+)?)(\))$/, '$2'));
            setProps(prevState => ({
                ...prevState,
                last: 'num'
            }));
        }
    }

    func = (func, isComplex = false) => {
        if(!['num', 'closed'].includes(props.last) || disp == '0') {
            if(disp == '0') {
                setDisp(func);
            } else {
                setDisp(disp+func);
            }
            const hasBracket = (func.search(/\($/) >= 0);
            setProps(prevState => ({
                ...prevState,
                last: 'other',
                brackets: (hasBracket ? props.brackets+1 : props.brackets),
                openFuncs: (isComplex ? props.openFuncs+1 : props.openFuncs),
                comas: (isComplex ? props.comas+1 : props.comas)
            }));
        }
    }

    openBracket = () => {
        if(!['num', 'closed'].includes(props.last) || disp == '0') {
            if(disp == '0') {
                setDisp('(');
            } else {
                setDisp(disp+'(');
            }
            setProps(prevState => ({
                ...prevState,
                last: 'other',
                brackets: props.brackets+1
            }));
        }
    }

    closeBracket = () => {
        if(['num', 'closed'].includes(props.last) && props.brackets > 0 && (props.comas < props.openFuncs || props.comas == 0)) {
            setDisp(disp+')');
            setProps(prevState => ({
                ...prevState,
                last: 'closed',
                brackets: props.brackets-1
            }));
        }
    }

    factorial = (n) => {
        if (n < 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    solve = () => {
        if(['num', 'closed'].includes(props.last) && props.openFuncs == 0) {
            while(props.brackets > 0) {
                setDisp(disp+')');
            }
            setProps(prevState => ({
                ...prevState,
                last: 'num',
                brackets: 0,
                comas: 0,
                openFuncs: 0
            }));
            let eq = disp;
            eq = eq.replaceAll(/\^/g, '**');
            eq = eq.replaceAll(/(root\()(\d+([.]\d+)?, )(\d+([.]\d+)?)(\))/g, 'pow($21/$4)');
            eq = eq.replaceAll(/EE/g, '*10**');

            if(!options.inRad) {
                eq = eq.replaceAll(/([a]?((sin)|(cos)|(tan)){1}[h]?\()(\d+([.]\d+)?)(\))/g, '$1$6*(PI/180))');
            }

            eq = eq.replaceAll(/[A-Za-z]+/g, 'Math.$&');
            eq = eq.replaceAll(/(\d+([.]\d+)?)(\!{1})/g, 'factorial($1)')
            return myEval(eq);
        }
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'right', paddingRight: 20, fontSize: 76, color: 'white'}}>
                        {disp}
                    </Text>
                </View>
                <View style={{flex: 5, gap: 4, flexDirection: 'row'}}>
                    {options.isHorizontal && <CalculatorHorizontal
                        setDisp={setDisp}
                        memory={memory}
                        setMemory={setMemory}
                        functions={functions}
                        options={options}
                        setOptions={setOptions}
                    />}
                    <CalculatorKeyboard
                        setDisp={setDisp}
                        options={options}
                        functions={functions}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#404040',
  }
});

export default App;
