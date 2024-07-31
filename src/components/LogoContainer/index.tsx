import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../utils/colors'
import { images } from '../../assets'

type Props = {}

const LogoContainer = (props: Props) => {
    return (
        <View style={styles.container}>
            <Image
                source={images.logo}
                style={styles.image}
            />
        </View>
    )
}
export default LogoContainer
const styles = StyleSheet.create({
    container: {
        width: 72,
        height: 72,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    },
    image: {
        width: 31,
        height: 27
    }
})