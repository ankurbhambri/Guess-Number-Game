import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = props => {
  return (
    // {..props} means all props defined where called
    <View><TextInput {...props} style={{...styles.inputProperty, ...props.style}}/></View>
  )
}
const styles = StyleSheet.create({
    inputProperty: {
        height: 50,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;