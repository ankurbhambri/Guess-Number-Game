import React, { useState } from 'react';
import { Alert, Button, Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/color';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed]= useState(false);
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };


    const confirmInputHandler = () => {
        const choseNos = parseInt(enteredValue);
        if (isNaN(choseNos) || choseNos <= 0 || choseNos > 99) {
            Alert.alert(
                'Invalid number',
                'Number must be between 0 to 99', 
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choseNos);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    
    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='Start Game' onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )
    }

    return (
    // keyboard api works in ios to dismiss keyboard while tapping somewhere else on screen
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss
    }}>
    <View style={styles.screen}>
        <Text style={styles.ttll}>Start a new game</Text>
        <Card style={styles.inputContainer}>
            <Input
                style={styles.imput} 
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
            />
            <View style={styles.btn_container}>
                <View style={styles.btn_style}>
                    <Button
                        title='Reset'
                        onPress={resetInputHandler}
                        color={Colors.accent}
                    />
                </View>
                <View style={styles.btn_style}>
                    <Button
                        title='Confirm'
                        onPress={confirmInputHandler}
                        color={Colors.primary}
                    />
                </View>
            </View>
        </Card>
    {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center' // center horizontlly
    },
    inputContainer:{
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2}, // works on ios not on android
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5, // only work on android
        padding: 20, 
        borderRadius: 10
    },  
    ttll: {
        fontSize: 20,
        marginVertical: 10,
    },  
    btn_container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    btn_style: {
        width: Dimensions.get('window').width / 4
    },
    imput: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen
