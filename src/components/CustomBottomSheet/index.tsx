import { SafeAreaView, View, ScrollView } from "react-native";
import React, { useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetScrollView,BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { colors } from "../../utils/colors";


const CustomBottomSheet = (props: any) => {
  const { bottomSheetModalRef, snapTo, onDismiss, children, snap,handleSheetChanges } = props;

  const snapPoints = useMemo(() => snapTo || ["60%"], []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetModalRef.current?.close();
      };
    }, [])
  );

  return (
    <BottomSheetModal
    ref={bottomSheetModalRef}
    backdropComponent={(props) => <Backdrop {...props} bottomSheetModalRef={bottomSheetModalRef} />}
    snapPoints={snapPoints}
    backgroundStyle={{backgroundColor:colors.primary}}
    // style={{marginHorizontal:10}}
    onDismiss={props?.onDismiss}
    >
      <BottomSheetScrollView

        // contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
         <SafeAreaView>
          <View style={{ paddingBottom: 30 }}>{children}</View>
        </SafeAreaView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const Backdrop = ({ animatedIndex, bottomSheetModalRef, style }:any) => {
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

  return <Animated.View onTouchStart={() => bottomSheetModalRef.current?.close()} style = { containerStyle } />;
};
export default CustomBottomSheet;
