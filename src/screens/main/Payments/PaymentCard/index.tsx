import { Image, Platform, Pressable, Text, View } from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { images } from "../../../../assets";
import { appStyles } from "../../../../utils/AppStyles";
import { scale } from "react-native-size-matters";
import { isiPad } from "../../../../utils/CommonFun";
import { useSelector } from "react-redux";
import { getLocalizeFile } from "../../../../redux/reducers/localizeReducer";
interface data {
  title?: string;
  image?: any;
}
type Props = {
  navigation?: any;
  index?: any;
  data?: data;
  onPress?: () => void;
  children?: any;
  isCard?: boolean;
  item?: Object;
  name?: string;
};

const PaymentCard = ({
  index,
  data,
  navigation,
  onPress,
  children,
  isCard,
  item,
  name,
}: Props) => {
  const localize:any=useSelector(getLocalizeFile)
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          paddingVertical:isiPad?40: 19,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:colors.white
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            height: 40,
          }}
        >
          <View style={{ width: 30, height: 30, marginRight: 10 }}>
            {children}
          </View>
          <View style={{ ...appStyles.row }}>
            {isCard ? (
              <View style={{marginLeft:isiPad?40:0,marginTop:isiPad?20:0,gap:isiPad?8:0}}>
                <View style={{ ...appStyles.row }}></View>
                <CustomText
                  text={`${
                    item.card.brand.charAt(0).toUpperCase()+ item.card.brand.slice(1)
                    
                  } ${localize?.Payment_settings_visa_card_ending_title} ${item.card.last4}`}
                  fontFam={font.montserratMedium}
                  size={isiPad?20: 14}
                  fontWeight="500"
                  color={colors.primary}
                  style={{
                    alignSelf: "center",
                    marginRight: 30,
                    marginLeft: scale(10),
                  }}
                />
                <CustomText
                  text={`${localize?.Payment_settings_visa_card_expiry_title} ${item.card.exp_month}/${item.card.exp_year}`}
                  fontFam={font.montserratMedium}
                
                  size={isiPad?18: 13}

                  color={colors.black}
                  style={{
                    marginRight: 30,
                    marginLeft: scale(10),
                  }}
                />
              </View>
            ) : (
              <CustomText
                text={data?.title}
                fontFam={font.montserratMedium}
           
                size={isiPad?18: 14}

                color={colors.primary}
                style={{
                  alignSelf: "center",
                  marginRight: 30,
                  marginLeft: scale(10),
                  marginTop:isiPad?15:0
                }}
                // style={{ alignSelf: "center" }}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{ backgroundColor: colors.primary, opacity: 0.25, height: 1.5 }}
      />
    </Pressable>
  );
};
export default PaymentCard;
