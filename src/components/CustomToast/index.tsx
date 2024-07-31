import { Image, Platform, Pressable, Text, View } from 'react-native'
import { colors } from '../../utils/colors'
import { Snackbar } from "react-native-paper";
import { verticalScale } from 'react-native-size-matters';


type Props = {
    isVisable?:any
    setIsVisable:any
    color:string,
    message:string
    marginBottom?:any
    duration?:any


}

const CustomToast = ({ message, isVisable,setIsVisable,color,duration,marginBottom }: Props) => {
    return (

        <Snackbar
        duration={ duration|| 2000}
        style={{ backgroundColor: colors.primary,marginBottom: marginBottom|| verticalScale(10), }}
        visible={isVisable}
        onDismiss={() => setIsVisable(false)}
        action={{
          label: "OKAY",
          textColor: color || colors.white,

          onPress: () => setIsVisable(false),
        }}
      >
        {message}
      </Snackbar>
       
    )
}
export default CustomToast
