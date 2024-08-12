import React from 'react'
import { colors } from '../../utils/colors'
import { View ,TouchableOpacity,Image} from 'react-native'
import { images } from '../../assets/images'

type Props = {}

const CheckBox = ({isRemember,setIsRemember}:any) => {
    return (
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>setIsRemember(!isRemember)}
          style={{
            width: 21,
            height: 21,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: colors.white,
            alignItems: "center",
            justifyContent: "center",

          }}>
            {
              isRemember&&(
                <Image
                style={{ width: 10, height: 10, alignSelf: "center" }}
                source={images.tick}
                resizeMode="contain"
              />

              )
            }
        
         
        </TouchableOpacity>
    )
}

export default CheckBox