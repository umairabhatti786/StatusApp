import { Image, Pressable, Text, View } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import CustomInput from '../CustomInput'
import CustomText from '../CustomText'
import { font } from '../../utils/font'

type Props = {
    placeholder?: string
    onChangeText?: any
    textColor?: string
}

const PromoCodeInput = ({ placeholder, onChangeText, textColor }: Props) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginVertical: 15 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1, backgroundColor: colors.white, height: 45, borderRadius: 14, paddingLeft: 10, borderWidth: 2, borderColor: colors.primary }}>
                <View style={{ flex: 1 }}>
                    <CustomInput
                        placeholder={placeholder}
                        textColor={textColor}
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: colors.primary, borderRadius: 12, height: 45, width: "35%" }}>
                    <CustomText
                        text="Apply"
                        color={colors.white}
                        fontFam={font.montserratBold}
                        size={14}
                    />
                </View>
            </View>
        </View>
    )
}
export default PromoCodeInput
