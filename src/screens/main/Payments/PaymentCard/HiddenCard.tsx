import { Image, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { images } from "../../../../assets";
import { appStyles } from "../../../../utils/AppStyles";
import { scale, verticalScale } from "react-native-size-matters";
import { isiPad } from "../../../../utils/CommonFun";
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
  onDelete?:()=>void
};

const HiddenCard = ({
  index,
  data,
  navigation,
  onPress,
  children,
  isCard,
  item,
  name,
  onDelete
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          // paddingVertical: 19,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems:"flex-end",
          height: 70
          ,}}
      >
        <View
          style={{
           
            alignItems:"center",
          }}
        >
          <TouchableOpacity 
          onPress={onDelete}
          activeOpacity={0.6}
          style={{width:scale(30),height:scale(30),alignSelf:"center",alignItems:"center",justifyContent:"center",         
        }}>
            <Image
            style={{flex:1,width:scale( isiPad?10: 20),height:scale(isiPad?10: 20)}}
            resizeMode="contain"
            source={images.bin}
            />

          </TouchableOpacity>
         
        </View>
      </View>
     
    </Pressable>
  );
};
export default HiddenCard;
