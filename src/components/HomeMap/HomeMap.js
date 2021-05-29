import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { listCars } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify'

export default function HomeMap() {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listCars
                    )
                )
                setCars(response.data.listCars.items)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCars()
    }, [])

    const getImage = (type) => {
        if (type === 'UberX') {
            return require('../../assets/images/top-UberX.png')
        }
        if (type === 'Comfort') {
            return require('../../assets/images/top-Comfort.png')
        }
        if (type === 'UberXL') {
            return require('../../assets/images/top-UberXL.png')
        }
    }

    return (

        <MapView
            style={{ height: '100%', width: '100%' }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={{
                latitude: 51.1605227,
                longitude: 71.4703558,
                latitudeDelta: 0.28479920301184336,
                longitudeDelta: 0.1714510252245211,
            }}
        >

            {cars.map((car) => (
                <Marker
                    key={car.id}
                    coordinate={{
                        latitude: car.latitude,
                        longitude: car.longitude
                    }}   >
                    <Image
                        source={getImage(car.type)}
                        style={[styles.imageMarker, {
                            transform: [{
                                rotate: `${car.heading}deg`
                            }]
                        }]} />
                </Marker>
            ))}


        </MapView>
    )
}

const styles = StyleSheet.create({
    imageMarker: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
})
