import { Image, ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
import { images } from "../../assets";

export const LocationSearchLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <ScrollView>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View>

          <View style={appStyles.rowJustify}>
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
                borderRadius: 4,
                width: 30,
                height: 16,
                marginBottom: 8,
              }}
            />
          </View>

          <View
            style={{
              width: DEVICE_WIDTH,
              height: 300,
              marginBottom: 40,
              borderRadius: 5,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              alignItems: "center",
              justifyContent: "space-between",
            }}
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
            style={{
              flexDirection: "row",
              marginBottom: 30,
              alignItems: "center",
              justifyContent: "space-between",
            }}
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
            style={{
              flexDirection: "row",
              marginBottom: 30,
              alignItems: "center",
              justifyContent: "space-between",
            }}
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
            style={{
              flexDirection: "row",
              marginBottom: 30,
              alignItems: "center",
              justifyContent: "space-between",
            }}
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
      </ScrollView>
    </>
  );
};
