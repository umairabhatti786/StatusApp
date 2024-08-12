import { useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { colors } from '../../utils/colors'
import { scale, verticalScale } from 'react-native-size-matters'
import CustomText from '../CustomText'
import { windowWidth } from '../../utils/Dimensions'
import { images } from '../../assets/images'
import sizeHelper from '../../utils/helpers/sizeHelper'
import NewText from '../NewText'

const DropDown = ({
  data,
  value,
  placeholderColor,
  placeholder,
  dropWidth,
  borderWidth,
  onChangeDropDown,
  setValue,
  mainWidth,
  innerWidth,
}:any) => {
  const [open, setOpen] = useState(false)


  const renderRightIcon = () => (
    <View style={styles.iconStyle}>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={images.arrowdown}
        resizeMode="contain"
      />

      {/* Your custom right icon component */}
      {/* Example: <Icon name="arrow-down" type="font-awesome" color="#000" /> */}
    </View>
  )

  return (
    <View style={{...styles.container,width: mainWidth|| "100%"}}>
      <Dropdown
        style={{
          ...styles.dropdown,
          width: dropWidth || '100%',
          borderWidth: borderWidth || 1,
          
          // backgroundColor:"red"
        }}
        containerStyle={{
          backgroundColor: colors.primary,
          minHeight: verticalScale(100),
          borderWidth: -1,
        

          width: innerWidth||"88%",
          borderBottomLeftRadius:scale(5),
          borderBottomRightRadius:scale(5)
        }}
        placeholderStyle={{
          ...styles.placeholderStyle,
          color: placeholderColor || colors.white,
          fontSize:15,


        }}
        // itemContainerStyle={{borderRadius:10,borderBottomWidth:1,borderColor:colors.placeholdeColor,marginVertical:5}}

        selectedTextStyle={{
          fontSize:15,
          color: colors.white,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        renderRightIcon={renderRightIcon}
        itemTextStyle={styles.inputTextStyle}
        renderItem={(item) => {
          console.log('Itemdata', item)
          return (
            <View
              style={{
                height: verticalScale(40),
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor:colors.primary
              }}
            >
              <NewText
                text={item.label}
                fontWeight={'400'}
                size={15}
                color={colors.white}
              />
            </View>
          )
        }}
        data={data}
        // search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder || 'Select'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        // backgroundColor	={"red"}
        // renderSelectedItem={()=>{

        //   return(

        //   )
        // }}
        onChange={(item) => {
          console.log("AllValcnd",item)
          setValue(item.label);



          // if (item.value == value) {
          //   setOpen(false)
          //   setValue(item.value);
          //   return
          // }
          //   setValue(item.value);
          setOpen(false)
        }}
      />
    </View>
  )
}

export default DropDown
const styles = StyleSheet.create({
  container: {
    // width:300,

    backgroundColor: colors.primary,
    borderRadius: scale(10),
    height:verticalScale(48)
  },
  dropdown: {
    // borderColor: colors.superLightGray,
    // borderColor: '#A0A2B1',
    borderRadius: scale(10),
    height: verticalScale(48),
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    height:scale(20),
    width: scale(20),
  },
  inputSearchStyle: {
    color: colors.white,
    fontSize: 16,
    height: 40,
  },
  inputTextStyle: {
    // backgroundColor: 'red',
    color: colors.white,
    fontSize: 16,
  },
  label: {
    backgroundColor: 'white',
    color: colors.white,
    fontSize: 14,
    left: 22,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 8,
    zIndex: 999,
  },
  placeholderStyle: {
    fontSize: verticalScale(16),
  },
  selectedTextStyle: {
    color: colors.white,
    fontSize: 16,
  },
})
