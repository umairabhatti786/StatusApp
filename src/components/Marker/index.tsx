import { Image, Pressable, Text, View } from 'react-native'
import { images } from '../../assets'


type Props = {

}

const Marker = ({ }: Props) => {
    return (
        <View>
            <View
                style={{
                    width: 200,
                    height: 200
                }}
            >
                <Image
                    source={images.marker}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: 41,
                        width: 40
                    }}
                />
                <Image
                    source={images.marker2}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 39,
                        width: 40
                    }}
                />
                <Image
                    source={images.marker3}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 41,
                        width: 40
                    }}
                />
                <Image
                    source={images.marker4}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        height: 41,
                        width: 40
                    }}
                />
            </View>

        </View>
    )
}
export default Marker
