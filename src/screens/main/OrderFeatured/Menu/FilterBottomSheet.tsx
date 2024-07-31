import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomBottomSheet from "../../../../components/CustomBottomSheet";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { colors } from "../../../../utils/colors";
import { isiPad } from "../../../../utils/CommonFun";
import { scale, verticalScale } from "react-native-size-matters";
import CustomLine from "../../../../components/CustomLine";
import { filterData } from "../../../../utils/Data";
import CustomInput from "../../../../components/CustomInput";
import { ApiServices } from "../../../../api/ApiServices";
import { useSelector } from "react-redux";
import { getLocalizeFile } from "../../../../redux/reducers/localizeReducer";
import { getToken } from "../../../../redux/reducers/authReducer";
import { appStyles } from "../../../../utils/AppStyles";
import CustomButton from "../../../../components/CustomButton";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
const TAGS = ["Alcdcdl", "Chacdcir", "Tabcdcle", "Lacdcmp", "Floocdcr"];
const TAG_WIDTH = 64;

const CONTAINER_H_P = 30;

const FilterBottomSheet = ({
  bottomSheetModalRef,
  selectedCategories,
  setSelectedCategories,
  onApply,
  onReset,
  resetFilter,
}: any) => {
  const [cuisineData, setCuisineData] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState<any>({});
  const snapPoints = useMemo(() => ["48%", "95%"], []);
  const [search, setSearch] = useState("");

  const localize: any = useSelector(getLocalizeFile);
  const token = useSelector(getToken);
  const focused=useIsFocused()

  const isInclude = (item: any) => {
    return selectedCategories.includes(item);
  };

  console.log("cuisineData",cuisineData)

  useEffect(() => {
    getContent();
  }, [bottomSheetModalRef,focused]);

  const onSelectCategory = (item: any) => {
    if (isInclude(item?.id)) {
      let abc = selectedCategories.filter((x) => x != item?.id);
      setSelectedCategories(abc);
    } else {
      setSelectedCategories([...selectedCategories, item?.id]);
    }
  };

  const getContent = () => {
    ApiServices.getCuisinesAndCategory(
      token,
      async ({ isSuccess, response }: any) => {
        if (isSuccess) {
          const result = response;
          if (result.success) {
            setCuisineData(result?.data);
          } else {
            // Alert.alert("Alert!", "Network Error.");
          }
        } else {
          Alert.alert(
            `${localize?.something_went_wrong_generic_toast_title}`,
            `${localize?.something_went_wrong_generic_toast_description}`
          );
        }
      }
    );
  };

  const onSearch = (txt:string) => {
    setSearch(txt);
    if (txt.length == 0) {
      getContent()
      
      return;
    } else {

      const filteredData = cuisineData?.filter((item) => {
        return `${item?.cuisine_name || ""}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });
      setCuisineData(filteredData)

    }
  };
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={(props) => (
        <Backdrop {...props} bottomSheetModalRef={bottomSheetModalRef} />
      )}
      snapPoints={snapPoints}
      index={0}
      // style={{marginHorizontal:10}}
      // onDismiss={props?.onDismiss}
    >


      <View style={{ flex: 1 }}>
        <BottomSheetScrollView
          // contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView>
            <View style={{ paddingBottom: 30 }}>
              <View style={{ flex: 2 }}>
                <CustomText
                  text={localize?.menu_cuisines_heading}
                  size={isiPad ? 20 : 16}
                  fontFam={font.montserratMedium}
                  fontWeight="bold"
                  color={colors.primary}
                  style={{
                    marginHorizontal: scale(15),
                    marginVertical: verticalScale(10),
                  }}
                />
                <CustomLine />
                <View style={{ paddingHorizontal: scale(15) }}>
                  <View
                    style={{
                      height: 80,
                    }}
                  >
                    <CustomInput
                      placeholder={localize?.menu_cuisines_search_label}
                      textColor={colors.black}
                      bgColor={colors.offWhite}
                      value={search}
                      onChangeText={(txt:string)=>onSearch(txt)}
                      // borderRadius={12}
                      style={{
                        paddingHorizontal: 20,
                        marginVertical: 15,
                        height: 47,
                      }}
                      height={47}
                    />
                  </View>
                  <CustomText
                    text={localize?.menu_cuisines_title}
                    fontWeight="600"
                    fontFam={font.montserratMedium}
                    size={16}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: "100%",
                      gap: 10,
                      marginVertical: 20,
                    }}
                  >
                    {cuisineData?.map((item: any, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.4}
                          onPress={() => setSelectedCuisine(item)}
                          key={item?.cuisine_id}
                          // onPress={() => onSelectCategory(item)}
                          style={{
                            borderWidth: 1,
                            borderRadius: 32,
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderColor: colors.primary,
                            backgroundColor:
                              selectedCuisine?.cuisine_id == item?.cuisine_id
                                ? colors.primary
                                : colors.white,
                          }}
                        >
                          <CustomText
                            text={item?.cuisine_name}
                            size={13}
                            fontFam={font.montserratMedium}
                            fontWeight="500"
                            color={
                              selectedCuisine?.cuisine_id == item?.cuisine_id
                                ? colors.white
                                : colors.primary
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  
                  {selectedCuisine?.product_categories?.length > 0 && (
                    <>
                      <CustomText
                        text={localize?.menu_cuisines_category_title}
                        fontWeight="600"
                        fontFam={font.montserratMedium}
                        size={16}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          width: "100%",
                          gap: 10,
                          marginVertical: 20,
                        }}
                      >
                        {selectedCuisine?.product_categories?.map(
                          (item: any, index: any) => {
                            return (
                              <TouchableOpacity
                                activeOpacity={0.4}
                                onPress={() => onSelectCategory(item)}
                                key={item?.id}
                                // onPress={() => onSelectCategory(item)}
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 32,
                                  paddingHorizontal: 16,
                                  paddingVertical: 12,
                                  borderColor: colors.primary,
                                  backgroundColor: isInclude(item?.id)
                                    ? colors.primary
                                    : colors.white,
                                }}
                              >
                                <CustomText
                                  text={item.name}
                                  size={13}
                                  fontFam={font.montserratMedium}
                                  fontWeight="500"
                                  color={
                                    isInclude(item?.id)
                                      ? colors.white
                                      : colors.primary
                                  }
                                />
                              </TouchableOpacity>
                            );
                          }
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </BottomSheetScrollView>

        <View
          style={{
            ...appStyles.row,
            paddingBottom: verticalScale(30),
            paddingHorizontal: scale(15),
            marginTop: verticalScale(5),
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap: scale(10),
            backgroundColor: colors.white,
          }}
        >
          <CustomButton
            text={localize?.menu_cuisines_reset_button}
            borderRadius={32}
            width={scale(80)}
            size={isiPad ? 20 : 14}
            height={isiPad ? verticalScale(27) : 45}
            // disable={Object.keys(seletctedAddress).length==0? true : false}
            onPress={()=>{
              setSelectedCuisine([])
              setSelectedCategories([])
              bottomSheetModalRef.current.dismiss()
              resetFilter()

            }}
            notRequiredShadow
          />

          <CustomButton
            text={localize?.menu_cuisines_cancel_button}
            borderRadius={32}
            width={scale(80)}
            size={isiPad ? 20 : 14}
            height={isiPad ? verticalScale(27) : 45}
            // disable={Object.keys(seletctedAddress).length==0? true : false}
            onPress={() => bottomSheetModalRef.current.dismiss()}
            notRequiredShadow
          />
          <CustomButton
            text={localize?.menu_cuisines_apply_button}
            borderRadius={32}
            width={scale(80)}
            onPress={onApply}
            bgColor={
              !selectedCuisine?.cuisine_id || selectedCategories.length == 0
                ? colors.grey
                : colors.primary
            }
            borderWidth={-1}
            textColor={
              !selectedCuisine?.cuisine_id || selectedCategories.length == 0
                ? colors.black
                : colors.white
            }
            disable={
              !selectedCuisine?.cuisine_id || selectedCategories.length == 0
            }
            size={isiPad ? 20 : 14}
            height={isiPad ? verticalScale(27) : 45}
            // disable={Object.keys(seletctedAddress).length==0? true : false}
            // onPress={onConfirm}
            notRequiredShadow
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

const Backdrop = ({ animatedIndex, bottomSheetModalRef, style }: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1],
      [1, 1],
      Extrapolate.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.6)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      onTouchStart={() => bottomSheetModalRef.current?.close()}
      style={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 20,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tag: {
    alignItems: "center",
    justifyContent: "center",
    width: TAG_WIDTH,
    height: 30,
    zIndex: 4,
  },
  animatedPoint: {
    width: 60,
    height: 30,
    borderRadius: 20,
    // paddingHorizontal:40,
    backgroundColor: "#545264",
    position: "absolute",
  },
  tagText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});

export default FilterBottomSheet;
