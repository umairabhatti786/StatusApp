import { Image, ScrollView, StyleSheet, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
import { images } from "../../assets";

export const Brancheslayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;
  

  return (
    <>
      <SkeletonPlaceholder
      // speed={900}
      >
        <View style={{width:"100%"}}>
          <View
            style={styles.mainContainer}
          >
            <View style={appStyles.row}>
              <View
                style={styles.circleContainer}
              />
              <View>
                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                    marginBottom: 10,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 150,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    borderRadius: 4,
                    width: 80,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            </View>

            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
              />

              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </View>

          <View
                        style={styles.mainContainer}

          >
            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginBottom: 8,
                  marginRight: 20,
                }}
              />
              <View>
                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                    marginBottom: 10,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 150,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    borderRadius: 4,
                    width: 80,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            </View>

            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
              />

              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </View>



          <View
                        style={styles.mainContainer}

          >
            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginBottom: 8,
                  marginRight: 20,
                }}
              />
              <View>
                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                    marginBottom: 10,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 150,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    borderRadius: 4,
                    width: 80,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            </View>

            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
              />

              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </View>


          <View
                      style={styles.mainContainer}

          >
            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginBottom: 8,
                  marginRight: 20,
                }}
              />
              <View>
                <View
                  style={{
                    borderRadius: 4,
                    width: 100,
                    height: 10,
                    marginBottom: 10,
                  }}
                />

                <View
                  style={{
                    borderRadius: 4,
                    width: 150,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    borderRadius: 4,
                    width: 80,
                    height: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            </View>

            <View style={appStyles.row}>
              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
              />

              <View
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </>
  );
};

const styles=StyleSheet.create({
  mainContainer:{
    flexDirection: "row",
    marginBottom: 30,
    width:"100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circleContainer:{
    borderRadius: 30,
    width: 30,
    height: 30,
    marginBottom: 8,
    marginRight: 20,
  }

})
