import React from "react";
import { ActivityIndicator, StatusBar, View,TouchableOpacity, StyleSheet, Platform } from "react-native";
import { colors } from "../../utils/colors";

const AbsoluteHeader = ({children,paddingBottom,paddingTop}:any) => {
  return (
  <>

<StatusBar barStyle={"light-content"} backgroundColor={'#1D2029'} />

<View style={{
   backgroundColor: colors.black300,
   alignItems: "center",
   paddingTop: Platform.OS=="ios"?"18%": paddingTop || "5%",
   paddingBottom:  paddingBottom || "5%",
   flexDirection: "row",
   justifyContent: "space-between",
   paddingHorizontal: 18,
   borderBottomColor:"#2F3541",
   borderBottomWidth:1

}}>
  {children}
  
</View>
  </>

  );
};

export default AbsoluteHeader;
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black300,
    alignItems: "center",
    paddingTop: Platform.OS=="ios"?"18%":"5%",
    paddingBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomColor:"#2F3541",
    borderBottomWidth:1
  },

});
