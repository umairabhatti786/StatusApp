import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'

type Props = {
    onPress?: any,
    style?: any,
    height?: any,
    width?: any,
    active: boolean,
    setActive?: any,
    insideWidth?:number
    insideHeight?:number
    backgroundColor?:any,
    onActivePress?:any,
    disabled?:boolean
    boxColor?:any
    
}

const RadioButton = ({  style, width, height, active, setActive,insideWidth ,insideHeight,onActivePress,backgroundColor,disabled,boxColor}: Props) => {
    return (
        <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.6}
        onPress={onActivePress}
            style={{
                ...style,
                width: width || 23,
                height: height || 23,
                backgroundColor: boxColor ||colors.white,
                ...styles.radioMain
              
            }}>
                {
                    active&&(
                        <View
                        style={{
                            width:  insideWidth||  14,
                            height:  insideHeight||14,
                            backgroundColor: backgroundColor || colors.primary,
                            borderRadius: 9999
                        }}
                    />

                    )
                }
          
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    radioMain:{
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 9999,
        justifyContent: "center",
        alignItems: "center"

    }
    

})
export default RadioButton
 
