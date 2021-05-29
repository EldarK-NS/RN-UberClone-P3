import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native'
import UberTypes from './../UberTypes/UberTypes';
import RouteMap from './../RouteMap/RouteMap';

import { useRoute, useNavigation } from '@react-navigation/native'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createOrder } from './../../graphql/mutations';

export default function SearchResults(props) {
    const navigation = useNavigation()

    const typeState = useState(null)

    const route = useRoute()
    const { originPlace, destinationPlace } = route.params

    const onSubmit = async () => {

        const [type] = typeState
        if (!type) {
            return
        }
        //submit to server
        try {
            const userInfo = await Auth.currentAuthenticatedUser()
            // console.log(userInfo)
            const date = new Date()
            const createdAt = date.toISOString()
            const input = {
                type: type,
                originlatitude: originPlace.details.geometry.location.lat,
                originlongitude: originPlace.details.geometry.location.lng,
                destlatitude: destinationPlace.details.geometry.location.lat,
                destlongitude: destinationPlace.details.geometry.location.lng,
                userId: userInfo.attributes.sub,
                carId: '1',
                createdAt: createdAt
            }
            const response = await API.graphql(
                graphqlOperation(
                    createOrder, { input }
                )
            )
            console.log(response)
            Alert.alert("Success!", "Your order has been submited", [{
                text: "Go home",
                onPress: () => navigation.navigate('Home')
            }])
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.map}>

                <RouteMap origin={originPlace} destination={destinationPlace} />
            </View>
            <View style={styles.type}>
                <UberTypes typeState={typeState} onSubmite={onSubmit} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    map: {
        height: Dimensions.get('window').height * 0.45
    },
    // type: {
    //     height: 400
    // },

})
