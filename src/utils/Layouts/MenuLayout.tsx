import { ScrollView, View } from "react-native";
import { windowWidth } from "../CommonFun";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Spacer } from "../../components/Spacer";
import { appStyles } from "../AppStyles";
interface MenuLayoutProps {}

export const MenuLayout: React.FC<MenuLayoutProps> = ({}) => {
  const DEVICE_WIDTH = windowWidth - 40;

  return (
    <>
      <View >
        <SkeletonPlaceholder
        // speed={900}
        >
          <View
            style={{
              width: windowWidth,
              height: 50,
              borderRadius: 5,
              // marginBottom: 10,
            }}
          />
          <View style={{...appStyles.rowJustify,marginVertical:20}}>
            <View style={{width:"22%",height:40,borderRadius:30}}/>
            <View style={{width:"22%",height:40,borderRadius:30}}/>
            <View style={{width:"22%",height:40,borderRadius:30}}/>

            <View style={{width:"22%",height:40,borderRadius:30}}/>


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

{
  /* <SkeletonPlaceholder
>
  <View
    style={{
      width: windowWidth,
      height: 60,
      borderRadius: 5,
      marginVertical: 20,
    }}
  />
 
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



  
  

  
  
</SkeletonPlaceholder> */
}
