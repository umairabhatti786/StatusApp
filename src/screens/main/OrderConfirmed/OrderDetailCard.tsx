import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  Image,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { appStyles } from "../../../utils/AppStyles";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { colors } from "../../../utils/colors";
import { images } from "../../../assets";
import { dollarSymbol, isiPad, windowWidth } from "../../../utils/CommonFun";
import CustomLine from "../../../components/CustomLine";

type Props = {
  navigation?: any;
  products?: [];
  orderValues?: object;
  total?: any;
  addonsTitle?:any
};

const windowHeight = Dimensions.get("window").height;

const OrderDetailCard = ({
  navigation,
  products,
  orderValues,
  total,
  addonsTitle
}: Props) => {

  return (
    <View style={{ backgroundColor: "#F7F5F8" }}>
      <FlatList
        contentContainerStyle={{
          gap: 10,
        }}
        keyExtractor={(item, index) => item.toString() + index}
        style={{ marginTop: 10 }}
        scrollEnabled={false}
        data={products}
        renderItem={({ item, index }) => {
          console.log("item?.addons?",item?.addons.length)

          return (
            <>
              <View>
                <View
                  style={{ ...appStyles.rowJustify, paddingHorizontal: 15 }}
                >
                  <View
                    style={{ flexDirection: "row", width: windowWidth / 1.5 }}
                  >
                    <CustomText
                      size={14}
                      fontWeight="700"
                      fontFam={font.montserratBold}
                      color={colors.lightBlack}
                      text={`${item?.quantity}`}
                    />
                    <Image
                      style={{
                        width: 7,
                        height: 7,
                        tintColor: colors.black,
                        marginTop: 7,
                        marginRight: 7,
                      }}
                      source={images?.closeBold}
                    />
                    <CustomText
                      size={isiPad?18:14}

                      fontWeight="500"
                      numberOfLines={1}
                      fontFam={font.montserratMedium}
                      color={colors.lightBlack}
                      text={item?.name}
                    />
                  </View>

                  <CustomText
             
                    size={isiPad?18:14}

                    fontWeight="500"
                    numberOfLines={1}
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                    text={dollarSymbol + `${Number(item?.quantity * item?.price).toFixed(2)}`}
                  />
                </View>
                {
                  item?.addons?.length>0&&(
                    <>

                <View style={{ paddingVertical: 15 }}>
                  <CustomLine height={1.5} backgroundColor={colors.darkGrey} />
                </View>
               
                
                      <CustomText
                  text={addonsTitle}

                  size={isiPad?19:15}

                  style={{ marginLeft: 15 }}
                  fontWeight="700"
                  color={colors.primary}
                  fontFam={font.montserratSemiBold}
                />

                {item?.addons?.map((ite, index) => {
                  return (
                    <View key={index} style={{ paddingHorizontal: 15 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: 10,

                          // backgroundColor:'red'
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <CustomText
                            text={ite?.name}
                            fontFam={font.montserratBold}
                            fontWeight="bold"
                            color={colors.black}
                       
                            size={isiPad?18:14}

                          />
                        </View>
                      </View>

                      {ite?.items
                        ?.filter(
                          (fil) => fil?.addon_sold_out != "sold_out_permanently"
                        )
                        .map((i, ind) => {
                          return (
                            <>
                              <View
                                style={{
                                  ...appStyles.rowJustify,
                                  paddingVertical: 5,
                                }}
                              >
                                <CustomText
                                  text={`${i?.name}`}
                                  fontFam={font.montserratMedium}
                    
                                  size={isiPad?18:14}

                                />
                                <CustomText
                                  text={
                                    "+ " +
                                    dollarSymbol +
                                    `${Number(item?.quantity *  i.price).toFixed(2)}`
                                  }
                                  fontFam={font.montserratMedium}
                                  color={colors.primary}
              
                                  size={isiPad?18:14}

                                />
                              </View>
                            </>
                          );
                        })}
                    </View>
                  );
                })}
                    </>
                  )
                }
                
              

                <View style={{ paddingTop: 15 }}>
                  <CustomLine
                    height={20}
                    backgroundColor={colors.white}
                    borderRadius={-1}
                  />
                </View>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};
export default OrderDetailCard;
