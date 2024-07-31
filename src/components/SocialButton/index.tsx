import { Image, Pressable, Text, View } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'

type Props = {
    source?: any
    bgColor?: string
    onPress?: any
}

const SocialButton = ({ source, bgColor, onPress }: Props) => {
    return (
        <Pressable
            style={{
                height: 56,
                width: 56,
                backgroundColor: colors.white,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                elevation: 5
            }}
            onPress={onPress}
        >
            <View style={{ width: 60, height: 60, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: bgColor }}>
                <Image
                    source={source}
                    style={{ width: 35, height: 35 }}
                />
            </View>
        </Pressable>
    )
}
export default SocialButton
