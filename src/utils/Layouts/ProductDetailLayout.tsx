import { Image, ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
import { images } from "../../assets";

export const ProductDetailLayout = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <ScrollView>
        <SkeletonPlaceholder
        // speed={900}
        >
          <View>
            <View
              style={{
                width: DEVICE_WIDTH,
                height: 250,
                marginBottom: 20,
                borderRadius: 5,
              }}
            />
            <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
              <View
                style={{
                  width: 100,
                  height: 10,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 10,
                  borderRadius: 4,
                }}
              />
            </View>
            <View
              style={{
                width: 180,
                height: 8,
                borderRadius: 4,
                marginBottom: 20,
              }}
            />
            <View
              style={{
                width: "100%",
                height: 4,
                borderRadius: 4,
                marginBottom: 20,
              }}
            />
            <View>
              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View
                  style={{
                    width: 80,
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

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 8,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>

            <View>
              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View
                  style={{
                    width: 80,
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

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
                  }}
                />
              </View>

              <View style={{ ...appStyles.rowJustify, marginBottom: 20 }}>
                <View style={appStyles.row}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      width: 80,
                      height: 10,
                      borderRadius: 4,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: 80,
                    height: 10,
                    borderRadius: 4,
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
