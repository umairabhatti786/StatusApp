import { Image, Platform, Pressable, Text, View } from 'react-native'
import { colors } from '../../../../utils/colors'
import CustomText from '../../../../components/CustomText'
import { font } from '../../../../utils/font'
import { images } from '../../../../assets'
import CustomButton from '../../../../components/CustomButton'
import CustomModal from '../../../../components/CustomModal'
import LocationCard from '../../../../components/LocationCard'
import CustomLine from '../../../../components/CustomLine'
interface data {

}
type Props = {
    isModalVisible?: any
    setIsModalVisible?: any
    onConfirm?: any
    onCancel?: any
}

const AddressModal = ({ isModalVisible, setIsModalVisible, onConfirm, onCancel }: Props) => {
    return (
        <CustomModal
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
        >
            <View
                style={{ flex: 1, paddingTop: "35%", alignItems: "center" }}>
                <View
                    style={{
                        width: "90%",
                        backgroundColor: colors.white,
                        borderRadius: 14,
                        overflow: "hidden",
                        paddingVertical: 30,
                        paddingHorizontal: 20
                    }}
                >
                    <CustomText
                        text={"Delivery Address"}
                        size={16}
                        fontFam={font.montserratBold}
                    />
                    <LocationCard
                        title='Lorem Ipsum'
                        description='Lorem ipsum, dolor sit amet, CW 80.0 km'
                    />
                    <CustomLine />
                    <LocationCard
                        title='Lorem Ipsum'
                        description='Lorem ipsum, dolor sit amet, CW 80.0 km'
                    />
                    <CustomLine />
                    <LocationCard
                        title='Lorem Ipsum'
                        description='Lorem ipsum, dolor sit amet, CW 80.0 km'
                    />
                    <CustomLine />
                    <View style={{
                        paddingVertical: 10,
                        flexDirection: "row",
                        gap: 10,
                        paddingHorizontal: 4
                    }}>
                        <View
                            style={{
                                width: 23,
                                height: 23,
                                backgroundColor: colors.primary,
                                borderRadius: 9999,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={images.plus}
                                style={{ width: 13, height: 13 }}
                            />
                        </View>
                        <CustomText
                            text={"ADD NEW ITEM"}
                            size={14}
                            color={colors.primary}
                        />
                    </View>
                    <View
                        style={{
                            gap: 10,
                            marginTop: 20
                        }}
                    >
                        <CustomButton
                            text='Apply'
                            borderRadius={32}
                            size={14}
                            height={40}
                            onPress={onConfirm}
                        />
                        <CustomButton
                            text='Cancel'
                            borderRadius={32}
                            bgColor={colors.white}
                            textColor={colors.primary}
                            size={14}
                            height={40}
                            onPress={onCancel}
                        />
                    </View>
                </View>
            </View>
        </CustomModal>
    )
}
export default AddressModal


