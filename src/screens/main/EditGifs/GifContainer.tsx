import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../HomeScreen/FriendList'
import { colors } from '../../../utils/colors'
import { images } from '../../../assets/images'
import { verticalScale } from 'react-native-size-matters'
import FastImage from 'react-native-fast-image'

const GifContainer = ({item,onPress,selectedGif}:any) => {
    const [isSelectGif,setSelectGif]=useState(false)
    const [loading, setLoading] = useState(true);
    let findIndex = selectedGif.findIndex((it) => it === item);

     // Replace yourTargetItem with the item you want to find


  return (
    <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    style={{
      width: "33%",
      height: verticalScale(130),
      margin: 3,
    }}>
    <FastImage
      style={{ width: "100%", height: "100%" }}
      source={{ uri: item?.images?.original?.url ,
        headers: { Authorization: 'AuthToken' },
        priority: FastImage.priority.high,
    
      }}
      resizeMode="cover"
      

      
      />
    {
        findIndex!=-1&&(
            <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 999,
              backgroundColor: colors.sky,
              position: "absolute",
              bottom: 10,
              right: 10,
              alignItems:"center",
              justifyContent:"center"
            }}>
                              <Image
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
            source={images.check}
          />


            </View>

        )
        
    }
  
  </TouchableOpacity>
  )
}

export default GifContainer