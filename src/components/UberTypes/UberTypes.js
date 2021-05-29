import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import UberTypeRow from '../UberTypeRow/UberTypeRow'
import typesData from '../../assets/data/types'
// import types from '../../assets/data/types'


export default function UberTypes({ typeState, onSubmite }) {

    const [selectedType, setSelectedType] = typeState;


    return (
        <View>
            {typesData.map(type => (
                <UberTypeRow
                    type={type}
                    key={type.id}
                    isSelected={type.type === selectedType}
                    onClick={() => setSelectedType(type.type)}
                />
            ))}
            <Pressable onPress={onSubmite} style={styles.confirm}>
                <Text style={styles.text}>Confirm Uber</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    confirm: {
        width: '100%',
        backgroundColor: 'black',
        padding: 10,
        margin: 5,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
})
