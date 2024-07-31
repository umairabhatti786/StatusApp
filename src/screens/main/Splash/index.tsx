import React from 'react'
import { Image, Text, View } from 'react-native'
import { appStyles } from '../../../utils/AppStyles'
import { colors } from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'

type Props = {}

const Splash = (props: Props) => {
    return (
        <SafeAreaView style={{ ...appStyles.coontainerStyle, backgroundColor: colors.primary }}>
            <Image
                source={images.logo}
                style={{width: 166, height: 145}}
            />
        </SafeAreaView>
    )
}
export default Splash