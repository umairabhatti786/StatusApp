import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
interface ProductLayoutProps {}

export const PointsHistoryLayout: React.FC<ProductLayoutProps> = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <View>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View style={{height:"100%",margin:10}}>
            <View style={{ ...appStyles.rowJustify, marginVertical: 10 }}>
              <View>
                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                    marginBottom: 30,
                  }}
                />
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
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>

            <View style={{ ...appStyles.rowJustify, marginVertical: 30 }}>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>


            <View style={{ ...appStyles.rowJustify, marginVertical: 30 }}>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>


            <View style={{ ...appStyles.rowJustify, marginVertical: 30 }}>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>



            <View style={{ ...appStyles.rowJustify, marginVertical: 30 }}>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>



            <View style={{ ...appStyles.rowJustify, marginVertical:30 }}>
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
                  }}
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    borderRadius: 4,
                    width: 50,
                    height: 15,
                    marginBottom: 12,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                  }}
                />
              </View>
            </View>


            
          </View>
        </SkeletonPlaceholder>
      </View>
    </>
  );
};
