import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { appStyles } from '../../../utils/AppStyles'
import LogoContainer from '../../../components/LogoContainer'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'
import { font } from '../../../utils/font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'
import CustomButton from '../../../components/CustomButton'


const VerifiedScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.white,
                paddingBottom: 100
            }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <CustomText
                        text={"Success!"}
                        size={40}
                        color={colors.primary}
                        fontFam={font.montserratBold}
                        style={{ marginBottom: 20 }}
                    />
                    <CustomText
                        text={"You are successfully verified"}
                        size={13}
                    />
                </View>
                <View
                    style={{
                        marginTop: 100,
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={images.checked}
                        style={{
                            width: 227,
                            height: 227
                        }}
                    />
                </View>
                <CustomButton
                    text='Continue'
                    borderRadius={32}
                    style={{
                        marginTop: "22%",
                        paddingHorizontal: 65,
                    }}
                    size={16}
                    onPress={() => {
                        navigation.replace("Home");
                    }}
                />
            </View>
            {/* </ScrollView> */}
        </SafeAreaView >

    )
}
export default VerifiedScreen
const styles = StyleSheet.create({

})