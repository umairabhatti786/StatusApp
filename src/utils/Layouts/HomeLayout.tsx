import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";

export const HomeLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <ScrollView >
        <SkeletonPlaceholder
        // speed={900}
      
        >
          <View>

          <View
            style={{ borderRadius: 4, width: 70, height: 16, marginBottom: 8 }}
          />

          <View
            style={{
              width: DEVICE_WIDTH,
              height: 150,
              marginBottom: 40,
              borderRadius: 5,
            }}
          />
          <View
            style={{ borderRadius: 4, width: 100, height: 30, marginVertical: 10 }}
          />
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 30,
              borderRadius: 5,

            }}
          />

          <View
            style={{ borderRadius: 4, width: 100, height: 20, marginBottom: 8 }}
            />
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 30,
              borderRadius: 5,

            }}
          />

          <View
            style={{ borderRadius: 4, width: 100, height: 20, marginBottom: 8 }}
            />
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 30,
              borderRadius: 5,

            }}
          />

          <View
            style={{ borderRadius: 4, width: 100, height: 20, marginBottom: 8 }}
            />
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 20,
              borderRadius: 5,

            }}
          />

          <View
            style={{ borderRadius: 4, width: 100, height: 20, marginBottom: 8 }}
            />
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 20,
              borderRadius: 5,

            }}
          />
                    </View>

        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};
