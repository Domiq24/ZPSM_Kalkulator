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
    const [isHorizontal, setHorizontal] = useState(true);
    const [lastNum, setLast] = useState(true);
    const [action, setAction] = useState('');
    const [number, setNumber] = useState(0);
    const [activeFunction, setFunction] = useState(() => () => {});
    const [memory, setMemory] = useState(0);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'right', paddingRight: 20, fontSize: 76, color: 'white'}}>
                        {disp}
                    </Text>
                </View>
                <View style={{flex: 5, gap: 4, flexDirection: 'row'}}>
                    {isHorizontal && <CalculatorHorizontal
                        disp={disp}
                        setDisp={(text) => {setDisp(text)}}
                        activeFunction={activeFunction}
                        setFunction={(func) => setFunction(func)}
                        lastNum={lastNum}
                        setNumber={(num) => setNumber(num)}
                        action={action}
                        memory={memory}
                        setMemory={(num) => setMemory(num)}
                    />}
                    <CalculatorKeyboard
                        disp={disp}
                        setDisp={(text) => setDisp(text)}
                        lastNum={lastNum}
                        setLast={(state) => setLast(state)}
                        action={action}
                        setAction={(text) => setAction(text)}
                        number={number}
                        setNumber={(num) => setNumber(num)}
                        activeFunction={activeFunction}
                        setFunction={(func) => setFunction(func)}
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
