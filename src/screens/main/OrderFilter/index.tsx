import React, { useState } from 'react'
import { View, Dimensions, Image, Pressable, Text, FlatList } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'
import { images } from '../../../assets'
import CustomButton from '../../../components/CustomButton'
import LocationCard from '../../../components/LocationCard'
import CustomLine from '../../../components/CustomLine'
import SearchBar from '../../../components/SearchBar'
import CustomInput from '../../../components/CustomInput'
import { filterData } from '../../../utils/Data'
import { font } from '../../../utils/font'
import { appStyles } from '../../../utils/AppStyles'

type Props = {
    navigation?: any,
}
const windowHeight = Dimensions.get('window').height;
const OrderFilter = ({ navigation }: Props) => {
    const [selectedTabs, setSelectedTabs] = useState([1, 15, 18]);
    const isInclude = (item: any) => {
        return selectedTabs.includes(item);
    }
    const onSelectCategory = (item: any) => {
        if (isInclude(item?.id)) {
            let abc = selectedTabs.filter((x) => x != item?.id);
            setSelectedTabs(abc);
        } else {
            setSelectedTabs([...selectedTabs, item?.id]);
        }
    }
    return (
        <ScreenLayout
            navigation={navigation}
            title='Order'
            style={{
                paddingHorizontal: 20,
            }}
            isProfileVisible
        >
            <View
                style={{
                    backgroundColor: colors.white,
                    marginTop: "5%",
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        height: 4,
                        width: 64,
                        backgroundColor: colors.primary,
                        borderRadius: 32,
                        opacity: 0.25,
                        marginTop: 10,
                        alignSelf: "center",
                    }}
                />
                <View
                    style={{
                        marginVertical: 20
                    }}
                >
                    <CustomText
                        text={"Filter"}
                        size={17}
                        fontFam={font.montserratMedium}
                        fontWeight='500'
                        
                        color={colors.primary}
                    />
                </View>
                <CustomLine />
                <View
                    style={{
                        marginVertical: 15,

                    }}
                >
                    <CustomText
                        text={"Keywords"}
                        fontWeight='500'
                        fontFam={font.montserratMedium}
                        size={13}
                    />
                    <View
                        style={{
                            height: 80
                        }}
                    >
                        <CustomInput
                            placeholder='Lorem Ipsum...'
                            textColor={colors.black}
                            bgColor={colors.offWhite}
                            // borderRadius={12}
                            style={{
                                paddingHorizontal: 20,
                                marginVertical: 15,
                                height: 47
                            }}
                            height={47}
                        />
                    </View>
                    <FlatList
                        data={filterData}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            marginBottom: "10%"
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <CustomText
                                        text={item?.title}
                                        fontWeight='500'
                                        fontFam={font.montserratMedium}
                                        size={13}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            width: "100%",
                                            gap: 10,
                                            marginVertical: 20
                                        }}
                                    >
                                        {item.category.map((item, index) => {

                                            return (
                                                <Pressable key={index}
                                                    onPress={() => onSelectCategory(item)}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderRadius: 32,
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 12,
                                                        borderColor: colors.primary,
                                                        backgroundColor: isInclude(item?.id) ? colors.primary : colors.white
                                                    }}
                                                >
                                                    <CustomText
                                                        text={item?.name}
                                                        size={13}
                                                        fontFam={font.montserratMedium}
                                                        fontWeight='500'
                                                        color={isInclude(item?.id) ? colors.white : colors.primary}
                                                    />
                                                </Pressable>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </ScreenLayout >
    )
}
export default OrderFilter