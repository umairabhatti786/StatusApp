import { Image, ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
import { images } from "../../assets";

export const OrderDetailLayout = ({}) => {
  return (
    <>
      <ScrollView>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View>
            <View
              style={{
                width: windowWidth,
                height: 300,
                marginBottom: 20,
                borderRadius: 5,
              }}
            />
            <View style={{margin:15}}>

            <View
              style={{
                width: 140,
                height: 12,
                borderRadius: 4,
                marginBottom: 30,
              }}
            />

            <View style={{ ...appStyles.rowJustify, marginBottom: 30 }}>
              <View
                style={{
                  width: 100,
                  height: 10,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 120,
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>

            <View style={{ ...appStyles.rowJustify, marginBottom: 30 }}>
              <View
                style={{
                  width: 100,
                  height: 10,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 120,
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>

            <View style={{ ...appStyles.rowJustify, marginBottom: 30 }}>
              <View
                style={{
                  width: 100,
                  height: 10,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 120,
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>


            <View style={{ ...appStyles.rowJustify, marginBottom: 30 }}>
              <View
                style={{
                  width: 100,
                  height: 10,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 120,
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>

           

            <View style={{width:"100%",height:4,marginBottom:30}} />
            <View style={{width:"100%",height:4}} />


            

            </View>


            
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};
