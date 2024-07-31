import { Image, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../CustomButton";
import { appStyles } from "../../utils/AppStyles";
import { isiPad, windowWidth } from "../../utils/CommonFun";
import { scale, verticalScale } from "react-native-size-matters";
import ToggleSwitch from "toggle-switch-react-native";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";

type Props = {
  data?: any;
  canUpgrade?: boolean;
  index?: number;
  style?: any;
  priceData?: any;

  periodData?: any;
  disableToggle?: boolean;
  onBuySubscription?: () => void;
  onChangeToggle?: () => void;
};

const PlanCard = ({
  data,
  canUpgrade,
  index,
  style,
  priceData,
  periodData,
  disableToggle,
  onBuySubscription,
  onChangeToggle,
}: Props) => {

  const [animation, setAnimation] = useState("fadeIn");

  const[period,setPeriod]=useState(periodData)
  const[price,sePrice]=useState(priceData)


  useEffect(() => {
    setAnimation("fadeOut");
    setTimeout(() => {
      setAnimation("fadeIn");
      setPeriod(periodData)
      sePrice(priceData)

    }, 500);
  }, [data?.isYearly,data]);

  // console.log("PlainPrice",price)
  return (
    <View
      style={[
        {
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: verticalScale(8),
          backgroundColor: data?.color,
        },
        style,
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <CustomText
              text={data?.name}
              color={data?.tintColor || colors.yellow}
              size={isiPad ? 30 : 24}
              fontWeight="500"
              fontFam={font.montserratMedium}
            />
          </View>
          <View>
            {disableToggle ? (
              <TouchableOpacity
                onPress={onChangeToggle}
                style={{ ...appStyles.row, gap: scale(7), paddingVertical: 4 }}
              >
                <TouchableOpacity onPress={onChangeToggle}>
                  <Animatable.View duration={500} animation={animation}>
                    <CustomText
                      text={period}
                      size={isiPad ? 19 : 13}
                      color={data?.descriptionColor || colors.white}
                      fontWeight="600"
                      fontFam={font.montserratMedium}
                    />
                  </Animatable.View>
                </TouchableOpacity>

                <ToggleSwitch
                  isOn={data?.isYearly}
                  onColor={"#FFB20F"}
                  offColor={"#FFB20F"}
                  circleColor={colors.primary}
                  thumbOnStyle={{ width: 24, height: 24, borderRadius: 9999 }}
                  thumbOffStyle={{ width: 24, height: 24, borderRadius: 9999 }}
                  trackOffStyle={{ width: 53, height: 30 }}
                  trackOnStyle={{ width: 53, height: 30 }}
                  // labelStyle={{ color: "black", fontWeight: "900" }}
                  size="medium"
                  onToggle={onChangeToggle}
                />
              </TouchableOpacity>
            ) : (
              <>
                <Image
                  source={images.cardIcon}
                  style={{
                    width: isiPad ? 50 : 32,
                    height: isiPad ? 50 : 32,
                    ...(data?.tintColor ? { tintColor: data.tintColor } : {}),
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", flex: 1, marginTop: 5, width: "85%" }}
      >
        <View style={{ gap: 2 }}>
          {data?.benefits?.map((x: any) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: verticalScale(5),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 6,
                    width: 6,
                    backgroundColor: data.descriptionColor || colors.white,
                    borderRadius: 9999,
                    marginRight: 5,
                  }}
                />
                <CustomText
                  text={`${x?.name}: ${x?.description} `}
                  color={colors.white}
                  size={isiPad ? 17 : 12}
                  fontFam={font.montserratMedium}
                  style={{ marginLeft: 4 }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginVertical: 5,
        }}
      >
        <Animatable.View
          duration={500}
          animation={animation}
          style={{ alignItems: "center" }}
        >
          <CustomText
            text={`$${Number(price).toFixed(2)}`}
            color={data?.descriptionColor || colors.white}
            size={isiPad ? 28 : 18}
            fontWeight="500"
            fontFam={font.montserratMedium}
          />
          <CustomText
            text={period}
            size={isiPad ? 17 : 12}
            color={data?.descriptionColor || colors.white}
            fontWeight="500"
            fontFam={font.montserratMedium}
          />
        </Animatable.View>
        <View>
          <CustomButton
            text={data?.text}
            width={windowWidth / 4}
            height={isiPad ? verticalScale(30) : 35}
            shadowOpacity={0.3}
            size={isiPad ? 20 : 14}
            onPress={onBuySubscription}
            style={appStyles.buttonElevation}
          />
        </View>
      </View>
    </View>
  );
};
export default PlanCard;
