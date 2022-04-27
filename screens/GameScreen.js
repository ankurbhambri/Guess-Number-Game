import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const guessRandomNos = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum == exclude) {
        return guessRandomNos(min, max, exclude);
    } else {
        return rndNum
    }
};


const GameScreen = props => {

    // deserialize props    
    const {userChoice, onGameOver} = props; 

    const [crntGuess, setCrntGuess] = useState(
        guessRandomNos(1, 100, userChoice)
    )

    const curntLow = useRef(1);
    const curntHigh = useRef(100);
    const [rounds, setRounds] = useState(0);

    // after render useEffect called
    useEffect(() => {
        if (crntGuess === userChoice) {
            // call the game over screen
            onGameOver(rounds);
        }
    }, [crntGuess, userChoice, onGameOver]);

    const nextGameHandler = direction => {
        // guess was lower than crntGuess
        if (
            (direction === 'lower' && crntGuess < userChoice) ||
            (direction === 'greater' && crntGuess > userChoice)
        ) {
            Alert.alert("Don't lie", 'You know that this is wrong...', [
                {text: 'Sorry', style: 'cancel'}
            ])
            return ;
        } if (direction == 'lower') {
            curntHigh.current = crntGuess
            guessRandomNos()
        } else {
            curntLow.current = crntGuess
        }
        const nextNumber = guessRandomNos(curntLow.current, curntHigh.current, crntGuess)
        setCrntGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };
    return (
    <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{crntGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <Button title='Lower' onPress={nextGameHandler.bind(this, 'lower')}></Button>
            <Button title='Greater' onPress={nextGameHandler.bind(this, 'greater')}></Button>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // if screen size is 600 then 20 else 10
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen
