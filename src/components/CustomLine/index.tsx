import React from 'react'
import { colors } from '../../utils/colors'
import { View } from 'react-native'

type Props = {
    height?:number
    width?:any
    backgroundColor?:string
    borderRadius?:number

}

const CustomLine = ({height,width,backgroundColor,borderRadius}: Props) => {
    return (
        <View style={{ height: height ||2.5,  width:width||"100%", backgroundColor: backgroundColor ||  colors.primary20,borderRadius: borderRadius||30 }} />
    )
}

export default CustomLine