import { Text, TouchableOpacity, View, Image, StyleSheet, Platform } from "react-native";
import { colors } from "../../utils/colors";
import { appStyles } from "../../utils/AppStyles";
import CustomText from "../CustomText";
import { Spacer } from "../Spacer";
import { images } from "../../assets/images";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
  onPressSetting?: any;
  onPressNotification?: any;
  isEdit?:any
  txt?:any
};

const Header = ({ title, onPressSetting, onPressNotification,isEdit,txt }: Props) => {
  const navigation=useNavigation()
  return (
    <View style={styles.main}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            style={{ width: 18, height: 18,tintColor:colors.white }}
            source={images.cross}
            resizeMode="contain"
          />
       
        </TouchableOpacity>
       
       
      <CustomText color={colors.white} size={19} 
        fontFam={"Poppins-SemiBold"}
        fontWeight={"600"}
        style={{marginLeft:!isEdit ?40:0}}
        text={ txt|| "New Status"} />

    
{
    isEdit?(
        <TouchableOpacity onPress={onPressSetting}>
        <Image
          style={{ width: 20, height: 20 }}
          source={images.delete}
          resizeMode="contain"
        />
      </TouchableOpacity>
        
    ):<>
    <CustomButton
    text="Post"
    width={65}
    height={35}
    borderRadius={30}
    bgColor={colors.white}
    textColor={colors.black}
    />
    </>
}
     

     
    </View>
  );
};
export default Header;

const styles=StyleSheet.create({
    main:{  backgroundColor: colors.black300,
        alignItems: "center",
        paddingTop: Platform.OS=="ios"?"18%":"5%",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom: "5%",
        paddingHorizontal:15,
    }

})
