import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../../../assets";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { Spacer } from "../../../components/Spacer";
import moment from 'moment';

interface data {
  description?: string;
  order_id?: string;
  created_at?: any;
  amount: string;
}
type Props = {
  data?: data;
};

const PointsHistoryCard = ({ data }: Props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: "3%",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: colors.white,
        }}
      >
        <View style={{ width: "65%" }}>
          <View>
            <CustomText
              text={data?.description}
              fontWeight={"500"}
              color={colors.black}
              numberOfLines={2}
              fontFam={font.montserratMedium}
              size={verticalScale(11)}
            />
            <Spacer height={5} />
            {data?.order_id && (
              <CustomText
                text={`#${data?.order_id}`}
                fontWeight={"500"}
                color={colors.black}
                numberOfLines={2}
                fontFam={font.montserratMedium}
                size={verticalScale(11)}
              />
            )}
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white,
          }}
        >
          <CustomText
            text={data?.amount}
            fontWeight={"700"}
            color={colors.primary}
            numberOfLines={2}
            fontFam={font.montserratMedium}
            size={verticalScale(11)}
          />
          <Spacer height={5}/>
          <CustomText
            text={moment(data.created_at).format('D MMM YY')}
            fontWeight={"500"}
            color={colors.black}
            numberOfLines={2}
            fontFam={font.montserratMedium}
            size={verticalScale(11)}
          />
        </View>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: colors.primary,
          opacity: 0.25,
          marginVertical: 2,
        }}
      />
    </View>
  );
};
export default PointsHistoryCard;
