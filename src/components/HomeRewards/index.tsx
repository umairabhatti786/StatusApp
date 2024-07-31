import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "../ProgressBar";
import CustomButton from "../CustomButton";
import { isiPad, windowWidth } from "../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";
type Props = {
  totalPoints?: any
  points?: number
  rewardsTitle?:string
  pointsTitle?:string
  redeemTitle?:string
  hideRedeemButton?:boolean
  tierSilverPoints:number,
  tierBronzePpoints:number
  tierGoldPoints:number,
  tierPlatinumPoints:number,
};

const HomeRewards = ({ points, totalPoints,rewardsTitle,pointsTitle ,redeemTitle,hideRedeemButton,tierSilverPoints,tierBronzePpoints,tierGoldPoints ,tierPlatinumPoints}: Props) => {


  return (
    <View>
      <View style={{ marginTop: 20, marginBottom: 15 }}>
        <CustomText text={rewardsTitle} size={ isiPad?22: 18}  
        fontFam={font.montserratMedium}
        fontWeight="500"  />
      </View>
      <View
        style={style.rewardMain}
      >
        <View
          style={style.gradientContainer}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <CustomText
              text={points?.toFixed(2)}
              color={colors.yellow}
              size={ isiPad?30: 24} 
              fontWeight="500"
            />
            <CustomText
              text={pointsTitle}
              color={colors.white}

              size={ isiPad?18: 13} 
              fontFam={font.montserratMedium}
            />
          </View>
          <View style={{ marginTop: isiPad?30:  23, flexDirection: "row" }}>
            <ProgressBar
              points={points}
              progressColor={colors.yellow}
              primaryBackgrondColor={"#E8E8E880"}
              secondaryBackgrondColor={"#D9D9D900"}
              height={isiPad?verticalScale(10): 10}
              tierSilverPoints={tierSilverPoints}
              tierBronzePpoints={tierBronzePpoints}
              tierGoldPoints={tierGoldPoints}
              tierPlatinumPoints={tierPlatinumPoints}
              useAngle={true}
            />
           
          </View>
          <View>
            {/* <Image
              source={images.pointer}
              style={{ height: 18, width: 12, marginLeft: `${abc - 1.3}%` }}
            /> */}
          </View>
        </View>

        {/* {
          !hideRedeemButton&&(
            <View style={{ position: "relative",}}>
            <View
              style={style.redeemBox}
            >
              <CustomButton
                text={redeemTitle}
                borderRadius={8}
                borderWidth={1}
                
                textColor={colors.primary}
                bgColor={ colors.white }
                notRequiredShadow
                paddingHorizontal={30}
                size={12}
                height={37}
              />
            </View>
          </View>

          )
        } */}
      
      </View>
    </View>
  );
};
export default HomeRewards;

const style = StyleSheet.create({
  rewardMain: {
    backgroundColor: colors.white,
    borderRadius: 20,
    
  },
  gradientContainer: {
    width: "100%",
    height: isiPad?verticalScale(120): 150,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor:colors.primary,
    // elevation: 3,
    // shadowColor: colors.lightBlack,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  redeemBox: { position: "absolute", height: 44, right: 20, bottom: -25 }
});
