import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../utils/colors'

type Props = {
    onPress?: any,
    style?: any,
    height?: any,
    width?: any,
    insideWidth?:number
    insideHeight?:number
}

const StoreMarker = ({  style, width, height,insideWidth ,insideHeight}: Props) => {
    return (
        <Pressable
            style={{
                ...style,
                width: width || 27,
                height: height || 27,
                ...styles.radioMain
              
            }}>
             <View
                style={{
                    width:  insideWidth||  20,
                    height:  insideHeight||20,
                    backgroundColor: colors.primary,
                    borderRadius: 9999
                }}
            />
        </Pressable>
    )
}

const styles=StyleSheet.create({
    radioMain:{
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center"

    }
    

})
export default StoreMarker
 
