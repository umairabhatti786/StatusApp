import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";

export const RewardLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <ScrollView>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View style={{margin:20}}>
            <View
              style={{
                borderRadius: 4,
                width: 70,
                height: 16,
                marginBottom: 8,
              }}
            />

            <View
              style={{
                width: DEVICE_WIDTH,
                height: 150,
                marginBottom: 40,
                borderRadius: 5,
              }}
            />

            <View style={{ ...appStyles.rowJustify, marginBottom: 60 }}>
              <View
                style={{
                  width: "40%",
                  height: 140,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
              <View
                style={{
                  width: "40%",
                  height: 140,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
              />
            </View>

            <View
              style={{
                borderRadius: 4,
                width: 70,
                height: 16,
                marginBottom: 8,
              }}
            />

            <View
              style={{
                width: DEVICE_WIDTH,
                height: 150,
                marginBottom: 40,
                borderRadius: 5,
              }}
            />

          
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};
