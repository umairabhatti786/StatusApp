import React from "react";

import {
  ScrollView,
  Text,
  useWindowDimensions,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  FlatList,
} from "react-native";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import * as Animatable from "react-native-animatable";
import { scale, verticalScale } from "react-native-size-matters";
import CustomButton from "../../../components/CustomButton";
import { isiPad } from "../../../utils/CommonFun";

interface Props {
  onPress?: () => void;
  count?: number;
  bottomSheetModalRef?: any;
  navigation?: any;
  activeOrders?: any[]; // Define the type for activeOrders as an array of any type
  title?:string,
  preparingOrderTitle?:string
}

const ActiveOrdersModel: React.FC<Props> = ({
  onPress,
  count,
  bottomSheetModalRef,
  navigation,
  activeOrders,
  title,
  preparingOrderTitle
}) => {
  return (
    <View>
      <View style={{ padding: 20 }}>
        <CustomText
          text={title}
          size={isiPad?20: 16}
          fontFam={font.montserratMedium}
          fontWeight="bold"
          color={colors.primary}
          // style={{ marginLeft: 20 }}
        />
      </View>

      <FlatList
        data={activeOrders}
        nestedScrollEnabled={true}
        style={{ paddingTop: verticalScale(15) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }: any) => {
          return (
            <>
              <TouchableOpacity
                style={{
                  ...appStyles.rowJustify,
                  ...appStyles.elevation,
                  backgroundColor: colors.white,
                padding:isiPad?20:7,

                  // padding: s7,
                  borderRadius: 8,
                  marginHorizontal: scale(15),
                  marginBottom: 10,
                  // paddingVertical
                }}
                activeOpacity={0.6}
                onPress={() => {
                  bottomSheetModalRef.current.dismiss()
                  setTimeout(() => {
                    navigation.navigate("ActiveOrders", { id: item?.id });

                  }, 500);
                }}
              >
                <View>
                  <View style={appStyles.row}>
                    <View
                      style={{
                        padding: 5,
                        borderRadius: 999,
                        backgroundColor: colors.primary + "20",
                      }}
                    >
                      <View
                        style={{
                          padding: 4,
                          borderRadius: 999,
                          backgroundColor: colors.primary,
                        }}
                      ></View>
                    </View>

                    <CustomText
                      text={item?.branch_name}
                      size={isiPad?20: 16}
                      fontWeight="600"
                      style={{ marginHorizontal:  isiPad?20:10 }}
                      fontFam={font.montserratMedium}
                      color={colors.black}
                    />
                  </View>

                  <CustomText
                    text={preparingOrderTitle}
                    size={isiPad?16: 13}

                    fontWeight="500"
                    style={{ marginVertical: 5 }}
                    fontFam={font.montserratMedium}
                    color={colors.lightBlack}
                  />
                </View>

                <View
                  style={{
                    paddingHorizontal: 15,
                    backgroundColor: colors.darkGrey,
                    borderRadius: 30,
                    paddingVertical: isiPad?5: 3,
                  }}
                >
                  <CustomText
                                      size={isiPad?16: 13}

                    fontWeight="700"
                    fontFam={font.montserratMedium}
                    color={colors.lightBlack}
                    text={`${item.id}`}
                  />
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />

      <CustomButton
        text="Cancel"
        bgColor={colors.white}
        width={"95%"}
        height={isiPad ? verticalScale(33) : 50}
        shadowOpacity={0.3}
        size={isiPad ? 22 : 18}
        borderColor={colors.primary}
        borderWidth={1}
        onPress={() => bottomSheetModalRef.current.close()}
        textColor={colors.primary}
        style={{ alignSelf: "center", marginVertical: 30 }}
      />
      {/* <SelectLocation
       navigation={navigation}
       handleSheetClosePress={handleSheetClosePress}
       LOCATION={LOCATION1}
     /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActiveOrdersModel;
