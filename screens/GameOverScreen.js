import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
        <Text>The Game is Over</Text>
        <Text>Nos of rounds: {props.rounds}</Text>
        <Text>Gussed nos was: {props.gussedNos}</Text>
        <Button title='New Game' onPress={props.onRestart} />
    </View>

  )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;