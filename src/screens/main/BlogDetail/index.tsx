import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/colors";
import { font } from "../../../utils/font";
import { useDispatch, useSelector } from "react-redux";
import { dollarSymbol, isiPad, windowHeight, windowWidth } from "../../../utils/CommonFun";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import { getLocalizeFile } from "../../../redux/reducers/localizeReducer";
import { ProductDetailLayout } from "../../../utils/Layouts/ProductDetailLayout";
import HTML from "react-native-render-html";

type Props = {
  navigation?: any;
  route?: any;
};

const BlogDetail = ({ navigation, route }: Props) => {
  const localize: any = useSelector(getLocalizeFile);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<any>(null);
  let data = route?.params?.data;

  return (
    <>
      <ScreenLayout
        ScrollRef={scrollViewRef}
        navigation={navigation}
        title={localize?.home_blog_title}
        style={{
          paddingHorizontal: 20,
          marginBottom: verticalScale(20),
        }}
        isProfileVisible
      >
        {loading ? (
          <>
            <View
              style={{
                marginTop: 20,
                height: "100%",
              }}
            >
              <ProductDetailLayout />
            </View>
          </>
        ) : (
          // onLayout={(event) => onItemLayout(event, index)}

          <View
            style={{
              backgroundColor: colors.white,
              marginTop: "5%",
              paddingBottom: "15%",
              flex: 1,
              borderRadius: 7,
            }}
          >
            <View
              //   onLayout={(event) => onHeaderLayout(event)}
              style={{ paddingHorizontal: 10 }}
            >
              <View style={{ paddingVertical: 10, gap: 5 }}>
                <CustomText
                  text={data?.heading}
                  size={isiPad?22: 14}

                  style={{ width: windowWidth / 1.3 }}
                  fontFam={font.montserratMedium}
                  fontWeight="700"
                  color={colors.primary}
                />
                <CustomText
                  text={data?.sub_heading}
                  size={isiPad?20: 14}
                  style={{ width: windowWidth / 1.3,  }}
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: windowHeight/4,
                  marginTop: 10,
                }}
              >
                <FastImage
                  resizeMode="cover"
                  source={{ uri: data?.header }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                  paddingTop: 10,
                }}
              ></View>

              <View
                style={{
                  // paddingHorizontal: 15,
                  marginVertical: 15,
                }}
              >
                <HTML 
                          contentWidth={windowWidth - 60}
                          

                source={{ html: data?.blog }} />

                {/* <CustomText
                  text={data?.blog}
                  size={14}
                  style={{ width: windowWidth / 1.3, marginLeft: 5 }}
                  fontFam={font.montserratMedium}
                  fontWeight="500"
                /> */}
              </View>
            </View>
          </View>
        )}
      </ScreenLayout>
    </>
  );
};
export default BlogDetail;

const styles = StyleSheet.create({
  addonContainer: {
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
  },
});
