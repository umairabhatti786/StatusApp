import { Image, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import { font } from '../../utils/font'
import { useState } from 'react'
import CustomButton from '../CustomButton'
import { isiPad, windowHeight, windowWidth } from '../../utils/CommonFun'
import { verticalScale } from 'react-native-size-matters'

interface cartData {

}
type Props = {
    onPress?: any
    EmptyCartTitle?:string
    EmptyCartDescription?:string
    EmptyCartOrderButton?:string
}

const EmptyCart = ({ onPress,EmptyCartTitle,EmptyCartDescription,EmptyCartOrderButton }: Props) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <View
                style={{ width: windowWidth/2, justifyContent: "center" }}
            >
                <CustomText
                    text={EmptyCartTitle}
                    size={isiPad?30: 22}
                    fontFam={font.montserratBold}
                    color={colors.primary}
                    style={{ textAlign: "center", marginBottom: 20 }}
                />
                <CustomText
                    text={EmptyCartDescription}
                    size={isiPad?16: 13}

                    style={{ textAlign: "center" }}
                    fontFam={font.montserratMedium}
                />
            </View>
            <View
                style={{ marginTop: 20 }}
            >
                <Image
                    source={images.emptyCart}
                    resizeMode="contain"
                    style={{ width: windowWidth/1.5, height:windowHeight/3 }}
                />
            </View>
            <View>
                <CustomButton
                    text={EmptyCartOrderButton}
                    width={windowWidth/3}
                

                    height={isiPad ? verticalScale(30) : 42}
                    shadowOpacity={0.3}
                    size={isiPad ? 22 : 18}
                    // size={13}
                    onPress={onPress}
                    borderRadius={32}
                />
            </View>
            <View style={{ height: 60 }} />
        </View>
    )
}
export default EmptyCart
