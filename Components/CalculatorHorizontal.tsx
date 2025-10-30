import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Button from './Button.tsx';

function CalculatorHorizontal({disp, setDisp, activeFunction, setFunction, lastNum, setNumber, action, memory, setMemory}) {
    const [isInv, setInv] = useState(false)
    const [inRad, setRad] = useState(true);

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
            <View style={styles.row}>
                <Button text="(" color="#505050" onClick={() => {}}/>
                <Button text=")" color="#505050" onClick={() => {}}/>
                <Button text="mc" color="#505050" onClick={() => setMemory(0)}/>
                <Button text="m+" color="#505050" onClick={() => setMemory(memory+Number(disp))}/>
                <Button text="m-" color="#505050" onClick={() => setMemory(memory-disp)}/>
                <Button text="mr" color="#505050" onClick={() => setDisp(memory)}/>
            </View>
            <View style={styles.row}>
                <Button text="2nd" color="#505050" onClick={() => {setInv(!isInv)}}/>
                <Button text="x^2" color="#505050" onClick={() => {func((num) => {return num**2})}}/>
                <Button text="x^3" color="#505050" onClick={() => {func((num) => {return num**3})}}/>
                <Button text="x^y" color="#505050" onClick={() => {func2((num1, num2) => Math.pow(num1, num2))}}/>
                {isInv ? <Button text="2^x" color="#505050" onClick={() => {func((num) => {return 2**num})}}/> :
                    <Button text="e^x" color="#505050" onClick={() => {func((num) => Math.exp(num))}}/>}
                <Button text="10^x" color="#505050" onClick={() => {func((num) => {return 10**num})}}/>
            </View>
            <View style={styles.row}>
                <Button text="1/x" color="#505050" onClick={() => {func((num) => {return 1/num})}}/>
                <Button text="√x" color="#505050" onClick={() => {func((num) => Math.sqrt(num))}}/>
                <Button text="∛x" color="#505050" onClick={() => {func((num) => Math.cbrt(num))}}/>
                <Button text="y√x" color="#505050" onClick={() => {func2((num1, num2) => Math.pow(num1, -num2))}}/>
                <Button text="ln" color="#505050" onClick={() => {func((num) => Math.log(num))}}/>
                {isInv ? <Button text="log2" color="#505050" onClick={() => {func((num) => Math.log2(num))}}/> :
                    <Button text="log10" color="#505050" onClick={() => {func((num) => Math.log10(num))}}/>}
            </View>
            <View style={styles.row}>
                <Button text="x!" color="#505050" onClick={() => {func((num) =>  fact(num))}}/>
                {isInv ? <Button text="sin^-1" color="#505050" onClick={() => { func( (num) => Math.asin( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="sin" color="#505050" onClick={() => { func( (num) => Math.sin( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                {isInv ? <Button text="cos^-1" color="#505050" onClick={() => { func( (num) => Math.acos( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="cos" color="#505050" onClick={() => { func( (num) => Math.cos( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                {isInv ? <Button text="tan^-1" color="#505050" onClick={() => { func( (num) => Math.atan( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="tan" color="#505050" onClick={() => { func( (num) => Math.tan( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                <Button text="e" color="#505050" onClick={() => setDisp(Math.E)}/>
                <Button text="EE" color="#505050" onClick={() => {func2((num1, num2) => {return num1 * (10**num2)})}}/>
            </View>
            <View style={styles.row}>
                <Button text={(inRad ? "Rad" : "Deg")} color="#505050" onClick={() => setRad(!inRad)}/>
                {isInv ? <Button text="sinh^-1" color="#505050" onClick={() => { func( (num) => Math.asinh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="sinh" color="#505050" onClick={() => { func( (num) => Math.sinh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                {isInv ? <Button text="cosh^-1" color="#505050" onClick={() => { func( (num) => Math.acosh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="cosh" color="#505050" onClick={() => { func( (num) => Math.cosh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                {isInv ? <Button text="tanh^-1" color="#505050" onClick={() => { func( (num) => Math.atanh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/> :
                    <Button text="tanh" color="#505050" onClick={() => { func( (num) => Math.tanh( ( inRad ? num : num * (Math.PI/180) ) ) ) }}/>}
                <Button text="π" color="#505050" onClick={() => {setDisp(Math.PI)}}/>
                <Button text="Rand" color="#505050" onClick={() => {setDisp(Math.random())}}/>
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 6,
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

export default CalculatorHorizontal;