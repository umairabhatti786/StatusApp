import React from 'react'
import CustomModal from '../../../../components/CustomModal'
import { Image, Platform, View } from 'react-native'
import { colors } from '../../../../utils/colors'
import CustomText from '../../../../components/CustomText'
import { font } from '../../../../utils/font'
import { images } from '../../../../assets'
import CustomButton from '../../../../components/CustomButton'
import { appStyles } from '../../../../utils/AppStyles'

type Props = {
    isModalVisible?: any
    setIsModalVisible?: any
}

const AddtoCartModal = ({ isModalVisible, setIsModalVisible }: Props) => {
    return (
        <CustomModal
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            backdropStyle={{
                marginTop: Platform.OS === "ios" ? "28%" : "18%",
            }}
        >
            <View
                style={{ alignItems: "center", }}>
                <View
                    style={{
                        width: "90%",
                        backgroundColor: colors.white,
                        paddingVertical: 30,
                        paddingHorizontal: 30,
                        ...appStyles?.modalElevation
                    }}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 15 }}>
                        <View style={{ gap: 5 }}>
                            <CustomText
                                text={"Lorem Ipsum Dolor"}
                                size={14}
                                fontWeight={"500"}
                                color={colors.darkBlack}
                                fontFam={font.montserratBold}
                            />
                            <CustomText
                                text={"#OrderIDCode"}
                                size={12}
                                fontFam={font.montserratMedium}
                            />
                        </View>
                        <View>
                            <CustomText
                                text={"$45.25"}
                                size={16}
                                color={colors.primary}
                                fontFam={font.montserratBold}
                                fontWeight={500}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            height: 170,
                            width: "100%",
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={images.order1}
                            style={{
                                height: "100%",
                                resizeMode: "contain",
                                width: "100%",
                                borderRadius: 12,
                            }}
                            resizeMode='cover'
                        />
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 20
                        }}
                    >
                        <CustomText
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum nec sem a elementum. Ut volutpat."}
                            size={12}
                            fontFam={font.montserratMedium}
                        />
                    </View>
                    <View
                        style={{
                            alignItems: "flex-end",
                            marginTop: 20,
                        }}
                    >
                        <CustomButton
                            text='Add to Cart'
                            width={120}
                            borderRadius={32}
                            size={12}
                            height={45}
                        />
                    </View>
                </View>
            </View>
        </CustomModal>
    )
}

export default AddtoCartModal