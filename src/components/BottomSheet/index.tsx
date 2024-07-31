import { SafeAreaView, View } from "react-native";
import React, { useMemo, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const BottomSheet = (props:any) => {
  const { bottomSheetModalRef, snapTo, onDismiss, children,snap } = props;

  const snapPoints = useMemo(() => snapTo || [  "80%"], []);

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
      snapPoints={ snap|| snapPoints}
      onDismiss={props?.onDismiss}
      children={() => (
        <SafeAreaView>
          <View style={{ paddingTop: 12, paddingBottom: 30 }}>{children}</View>
        </SafeAreaView>
      )}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: "#E7E7E7" }}
    />
  );
};

const Backdrop = ({ animatedIndex, bottomSheetModalRef, style }) => {
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

export default BottomSheet;
