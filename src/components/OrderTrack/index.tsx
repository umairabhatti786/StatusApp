import { Image, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import { font } from '../../utils/font'
import { useState } from 'react'
import CustomButton from '../CustomButton'
import LocationCard from '../LocationCard'
import { useSelector } from 'react-redux'
import { getSelectedBranch } from '../../redux/reducers/branchesReducer'
import { verticalScale } from 'react-native-size-matters'

interface CartData {
    subTotal?: number;
    total?: number;
    tax?: number;
    delivery?: number;
    promoCode?: number;
}

type Props = {
    amount?: CartData,
    onPress?: any,
    branchName?:any,
    branchDes?:any,
    addressName?:any,
    addressDes?:any
}


const OrderTrack = ({ amount, onPress,branchName,branchDes,addressName,addressDes }: Props) => {
    const selectedBranch=useSelector(getSelectedBranch)
    return (
        <View
            style={{
                gap: 5,
                backgroundColor: colors.white,
                elevation: 20,
            
                overflow: "hidden",
                paddingBottom: 70
            }}
        >
           
            <View
                style={{
                    marginHorizontal: 20,
                    paddingTop:verticalScale(10)
                }}
            >
                
                <LocationCard
                    title={branchName}
                    description={branchDes}
                    isShowLine
                />
                <LocationCard
                    title={addressName}
                    description={addressDes}
                    ishomePin
                />
            </View>

        </View>
    )
}
export default OrderTrack
