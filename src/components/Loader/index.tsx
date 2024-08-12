import { Text,View,ActivityIndicator } from 'react-native'
import { colors } from '../../utils/colors'
import { verticalScale } from 'react-native-size-matters'

const Loader = () => {
    return (
        <View
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 9,
          width: '100%',
          height:'100%',
        }}
      >
        <ActivityIndicator
          size={'large'}
          color={colors.white}
        />
      </View>
      
    )
}
export default Loader
