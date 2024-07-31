import { Image, Pressable, Text, View, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import { font } from '../../utils/font'
import { useState } from 'react'
import CustomButton from '../CustomButton'
import { appStyles } from '../../utils/AppStyles'

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
}


const CartTotal = ({ amount, onPress }: Props) => {
    return (
        <View
            style={{
                gap: 5,
                backgroundColor: colors.white,
                padding: 20,
           
                ...appStyles.elevation,
                elevation: 20,
                shadowRadius: 10
                
            }}
        >
            <View
                style={{
                    gap: 5,
                    backgroundColor: colors.white,
                    paddingHorizontal: 5
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >

                    <CustomText
                        text="Subtotal"
                        size={14}
                    />
                    <View style={{ minWidth: 50, alignItems: "flex-start" }}>
                        <CustomText
                            text={`$${amount?.subTotal || '12.45'}`}
                            size={14}
                        />

                    </View>

                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <CustomText
                        text="Tax"
                        size={14}
                    />
                    <View style={{ minWidth: 50, alignItems: "flex-start" }}>

                        <CustomText
                            text={`$${amount?.tax || "4.25"}`}
                            size={14}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <CustomText
                        text="Delievery"
                        size={14}
                    />
                    <View style={{ minWidth: 50, alignItems: "flex-start" }}>

                        <CustomText
                            text={`$${amount?.delivery || "1.04"}`}
                            size={14}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <CustomText
                        text="Promo Discount"
                        size={14}
                    />
                    <View style={{ minWidth: 50, alignItems: "flex-start" }}>

                        <CustomText
                            text={`$${amount?.promoCode || '0.00'}`}
                            size={14}
                        />
                    </View>
                </View>
            </View>

            <View style={{ height: 2, backgroundColor: colors.primaryLight, marginVertical: 10 }} />
            <View

                style={{
                    gap: 5,
                    backgroundColor: colors.white,
                    paddingHorizontal: 5
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <CustomText
                        text="Total"
                        size={15}
                        fontWeight='500'
                        fontFam={font.montserratMedium}                    />
                    <CustomText
                        text={`$${amount?.total || '25.89'}`}
                        size={18}
                        color={colors.primary}
                        fontWeight='500'
                        fontFam={font.montserratMedium}
                        style={{ paddingHorizontal: 5 }}
                    />
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                    <CustomButton
                        text='Confirm'
                        // size={20}
                        height={45}
                        disable={false}
                        onPress={onPress}
                        borderRadius={32}
                    />
                </View>
            </View>

        </View>
    )
}
export default CartTotal
