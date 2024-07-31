import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
interface ProductLayoutProps {}

export const ProductLayout: React.FC<ProductLayoutProps> = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <View >
        <SkeletonPlaceholder
        // speed={900}
        >
          
     

          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>

          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>

          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>

          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>

          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>
          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>
          <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
            <View>
              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 12,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 140,
                  height: 10,
                  marginBottom: 25,
                }}
              />

              <View
                style={{
                  borderRadius: 4,
                  width: 100,
                  height: 10,
                  marginBottom: 8,
                }}
              />
            </View>

            <View style={{ width: 130, height: 80, borderRadius: 8 }}></View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </>
  );
};


