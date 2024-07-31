import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { dollarSymbol, isiPad, windowHeight, windowWidth } from "../../utils/CommonFun";
import { useSelector } from "react-redux";
import { getCartData } from "../../redux/reducers/cartReducer";
import { appStyles } from "../../utils/AppStyles";
import CustomLine from "../CustomLine";
export interface cardData1 {
  description?: string;
  price?: number;
  image?: any;
}
type Props = {
  data?: cardData1;
  onPress?: () => void;
  Addresses: any;
  onAddressPress?:()=>void
};

const PredictionList = ({ data, onPress, Addresses,onAddressPress }: Props) => {
  return (
    <View
      style={{
        width: windowWidth / 1,
        position: "absolute",
        top: 100,
        backgroundColor: colors.white,
        maxHeight: 300,
      }}
    >
      <View>
        <ScrollView horizontal={false}>
          {Addresses.map((i, index) => {
            return (
              <View key={i.toString() + index}>
                <TouchableOpacity 
                onPress={()=>onAddressPress(i)}
                style={{ ...appStyles.row, padding: 15 }}>
                  <Image
                    style={{ width:  isiPad?20: 15, height: isiPad?20: 15 }}
                    resizeMode="contain"
                    source={images.location}
                  />
                  <CustomText
                    text={i.description}
                    size={ isiPad?18: 14}
                    fontFam={font.montserratMedium}
                    fontWeight="400"
                    style={{ marginLeft: 10 }}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <CustomLine height={1} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default PredictionList;
