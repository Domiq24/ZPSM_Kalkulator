/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

function App() {
  const [fstNum, setFstNum] = useState('0');
  const [sndNum, setSndNum] = useState('');
  const [nextSolve, setSolve] = useState(false);
  const [lastAction, setAction] = useState('');

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'right', paddingRight: 20, fontSize: 76, color: 'white'}}>
                {fstNum+lastAction+sndNum}
            </Text>
        </View>
        <View style={styles.row}>
            <Button text="AC" color="#505050" onClick={() => {clear()}}/>
            <View style={{flex: 2, backgroundColor: "#505050"}}/>
            <Button text="x" color="#E08000" onClick={() => {action('*')}}/>
        </View>
        <View style={styles.row}>
            <Button text="1" color="#707070" onClick={() => {input('1')}}/>
            <Button text="2" color="#707070" onClick={() => {input('2')}}/>
            <Button text="3" color="#707070" onClick={() => {input('3')}}/>
            <Button text="/" color="#E08000" onClick={() => {action('/')}}/>
        </View>
        <View style={styles.row}>
            <Button text="4" color="#707070" onClick={() => {input('4')}}/>
            <Button text="5" color="#707070" onClick={() => {input('5')}}/>
            <Button text="6" color="#707070" onClick={() => {input('6')}}/>
            <Button text="+" color="#E08000" onClick={() => {action('+')}}/>
        </View>
        <View style={styles.row}>
            <Button text="7" color="#707070" onClick={() => {input('7')}}/>
            <Button text="8" color="#707070" onClick={() => {input('8')}}/>
            <Button text="9" color="#707070" onClick={() => {input('9')}}/>
            <Button text="-" color="#E08000" onClick={() => {action('-')}}/>
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={{flex: 2, backgroundColor: '#707070', justifyContent: 'center'}} onPress={() => {input('0')}}>
                <Text style={{textAlign: 'left', color: 'white', fontSize: 32, paddingLeft: 40}}>0</Text>
            </TouchableOpacity>
            <Button text="." color="#707070" onClick={() => {input('.')}}/>
            <Button text="=" color="#E08000" onClick={() => {solve()}}/>
        </View>
      </View>
    </SafeAreaProvider>
  );

  function clear() {
      setFstNum('0');
      setSndNum('');
      setSolve(false);
      setAction('');
  }

  function input(c) {
      if(fstNum == '0' && lastAction == '') {
          setFstNum(c);
      } else if(lastAction == '') {
          setFstNum(fstNum+c);
      } else {
          setSndNum(sndNum+c);
          setSolve(true);
      }
  }

  function action(a) {
      if(nextSolve)
          solve();
      setAction(a);
  }

  function solve() {
      switch(lastAction) {
          case '*':
              setFstNum(Number(fstNum)*Number(sndNum));
              break;
          case '/':
              setFstNum(Number(fstNum)/Number(sndNum));
              break;
          case '+':
              setFstNum(Number(fstNum)+Number(sndNum));
              break;
          case '-':
              setFstNum(Number(fstNum)-Number(sndNum));
              break;
      }
      setAction('');
      setSndNum('');
      setSolve(false);
  }
}

function Button({text, color, onClick}) {
    return(
        <TouchableOpacity style={{flex: 1, backgroundColor: color, justifyContent: 'center'}} onPress={onClick}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 32}}>{text}</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#404040',
    marginTop: 50,
    marginBottom: 40,
    gap: 4
  },
  row: {
      flex: 1,
      flexDirection: 'row',
      gap: 4,
      alignContent: 'space-around'
  },
});

export default App;
