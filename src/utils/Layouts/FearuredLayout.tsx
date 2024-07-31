import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";

export const FearuredLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
            <View style={{ borderRadius: 4, width: 100, height: 16 }} />
            <View style={{ borderRadius: 4, width: 50, height: 16 }} />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 30,
              borderRadius: 5,
            }}
          />

          <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
            <View style={{ borderRadius: 4, width: 100, height: 16 }} />
            <View style={{ borderRadius: 4, width: 50, height: 16 }} />
          </View>
          <View
            style={{
              width: DEVICE_WIDTH,
              height: 100,
              marginBottom: 30,
              borderRadius: 5,
            }}
          />

          <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
            <View style={{ borderRadius: 4, width: 100, height: 16 }} />
            <View style={{ borderRadius: 4, width: 50, height: 16 }} />
          </View>

          <View style={appStyles.rowJustify}>
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
          </View>

          <View
            style={{ ...appStyles.rowJustify, marginBottom: 20, marginTop: 30 }}
          >
            <View style={{ borderRadius: 4, width: 100, height: 16 }} />
            <View style={{ borderRadius: 4, width: 50, height: 16 }} />
          </View>

          <View style={appStyles.rowJustify}>
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
            <View
              style={{
                width: "30%",
                height: 170,
                borderRadius: 5,
                marginLeft: 10,
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};
