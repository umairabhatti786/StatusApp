import { Image, Platform, Pressable, Text, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import { font } from '../../utils/font'
import { images } from '../../assets'
import { scale } from 'react-native-size-matters'
type Props = {
    navigation?: any
    index?: any
    fontFam?: any
    fontWeight?: any
    size?: number
    color?: any
    title?: string
    screen?: any
}

const SettingCards = ({ index, navigation, fontFam, size, color, title, screen,fontWeight }: Props) => {
    return (
        <Pressable
            onPress={() => {
                screen && navigation.navigate(screen)
            }}
            key={index}>
            <View
                style={{
                    paddingVertical: 21,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <CustomText
                    text={title}
                    fontFam={fontFam || font.montserratMedium}
                    size={size || 14}
                    color={color || colors.primary}
                    fontWeight={fontWeight}
                />
                <Image
                    source={images.arrow}
                    style={{ width:  scale(15), height: scale(15) }}
                />
            </View>
            < View style={{ backgroundColor: colors.primary, opacity: 0.25, height: 2 }} />
        </Pressable>
    )
}
export default SettingCards
