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
} from "react-native";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import * as Animatable from 'react-native-animatable';
import { isiPad } from "../../../utils/CommonFun";


interface Props {
  onPress?: () => void;
  count?: number;
  title?:string
}

const FlotingButton: React.FC<Props> = ({ onPress, count,title }) => {
  return (
    <Animatable.View
    animation={"slideInUp"}
    >
          <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        ...appStyles.elevation,
        ...appStyles.floatingButton,
        width: isiPad?200: 150,
        height:isiPad?60: 45
        
      }}
    >
      <CustomText
      style={{width:"80%",textAlign:"center"}}
        text={title}
        size={isiPad?18:12}

        fontWeight="600"
        fontFam={font.montserratMedium}
        color={colors.white}
      />

      <View style={styles.countContainer}>
        <CustomText
          text={count}

          size={isiPad?19:14}

          fontWeight="700"
          fontFam={font.montserratMedium}
          color={colors.primary}
        />
      </View>
    </TouchableOpacity>

    </Animatable.View>
  
  );
};

const styles = StyleSheet.create({
  countContainer: {
    width:  isiPad?35: 28,
    height: isiPad?35: 28,
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FlotingButton;
