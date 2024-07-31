import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { images } from "../../../../assets";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import LocationCard from "../../../../components/LocationCard";
import CustomLine from "../../../../components/CustomLine";
import { appStyles } from "../../../../utils/AppStyles";
import AddressCard from "./AddressCard";
import { useEffect, useState } from "react";
import { ApiServices } from "../../../../api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken, setIsAddressModal } from "../../../../redux/reducers/authReducer";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DelIVERY_ADDRESS, StorageServices } from "../../../../utils/hooks/StorageServices";
import { isiPad } from "../../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";
import { getLocalizeFile } from "../../../../redux/reducers/localizeReducer";
interface data {}
type Props = {
  isModalVisible?: any;
  setIsModalVisible?: any;
  onConfirm?: any;
  onCancel?: any;
  seletctedAddress?:any,
  setSelectedAddress?:any
  entityId?:any
  error?:any
  setError?:any
  pickup?:any
  applyTitle?:string
  cancelTitle?:string
  selectAddressTitle?:string
  addNewAddressTitle?:string
  setDelAddress?:any

};
const AddressModal = ({
  isModalVisible,
  setIsModalVisible,
  onConfirm,
  onCancel,
  setSelectedAddress,
  seletctedAddress,
  entityId,
  error,
  setError,
  pickup,
  applyTitle,
  cancelTitle,
  selectAddressTitle,
  addNewAddressTitle,
  setDelAddress
}: Props) => {
  const navigation = useNavigation();
  const token = useSelector(getToken);
  const localize:any=useSelector(getLocalizeFile)
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const dispatch=useDispatch()
  useEffect(() => {
    if(pickup=="1"){
      getAddress();


    }
  }, [isModalVisible]);



  const getAddress = () => {
    const data={
      token:token,
      id:Number(entityId)
    }



    ApiServices.getAddressList(data, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        const result = response;
        if (result.success) {
          if(result.data.length==0){
           StorageServices.removeItems(DelIVERY_ADDRESS);
           setDelAddress()
           setSelectedAddress("")

          }

          setDeliveryAddress(result.data);

        } else {

          // Alert.alert("Alert!", "Network Error.");
        }
      } else {
        Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
      }
      // resolve(result);
    });
  };


  const onDeleteAddress = (item: any) => {
    const data = {
      token: token,
      id: Number(item.id),
    };
    console.log("cdlckndl",data)

    ApiServices.deleteAddress(data, async ({ isSuccess, response }: any) => {

      if (isSuccess) {
        const result = response;
        if (result.success) {
          const address = await StorageServices.getItem(DelIVERY_ADDRESS);
          let delAddress = JSON.parse(address);
          if(delAddress!=null){
            if(item.id==delAddress.id){

              StorageServices.removeItems(DelIVERY_ADDRESS);
              setDelAddress()
              setSelectedAddress("")
   
   
             }

          }
          


          getAddress();

          // setDeliveryAddress(result.data);
        } else {
          Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
        }
      } else {
        Alert.alert(`${localize?.something_went_wrong_generic_toast_title}`, `${localize?.something_went_wrong_generic_toast_description}`);
      }
      // resolve(result);
    });
  };
  return (
    <CustomModal
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
    >
      <View style={{ alignItems: "center",marginTop:-50 }}>
        <View
          style={{
            width: "90%",
            backgroundColor: colors.white,
            paddingVertical: 30,
            paddingHorizontal: 20,
            ...appStyles?.modalElevation,
            borderRadius:10

          }}
        >
          <CustomText
            text={selectAddressTitle}
    
            size={isiPad?20:16}
            fontWeight="700"
            fontFam={font.montserratBold}
          />
          {deliveryAddress.length > 0 && (
            <ScrollView
              style={{ maxHeight: 400 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {deliveryAddress.map((item, index) => {
                  return (
                    <>
                      <AddressCard
                      key={index}
                        item={item}
                        onPress={() => {
                          setSelectedAddress(item);
                          setError("")
                        }}
                        seletctedAddress={seletctedAddress}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              `${localize?.checkout_delete_address_alert_title}`,
                              `${localize?.checkout_delete_address_alert_description}`,
                              [
                                {
                                  text:`${localize?.checkout_delete_address_alert_cancel_button}`,
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text:`${localize?.checkout_delete_address_alert_ok_button}`,
                                  onPress: () => onDeleteAddress(item),
                                },
                              ]
                            );
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{ width:  isiPad?30: 20, height:isiPad?30: 20 }}
                            resizeMode="contain"
                            source={images.remove}
                          />
                        </TouchableOpacity>
                      </AddressCard>

                      <CustomLine />
                    </>
                  );
                })}
              </View>
            </ScrollView>
          )}

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              dispatch(setIsAddressModal(false)) 

              // setIsModalVisible(false);

              setTimeout(() => {
                navigation.navigate("MyAddress");

                
              }, 500);
            }}
            style={{
              paddingVertical: 10,
              flexDirection: "row",

              gap: 10,
              paddingHorizontal: 4,
            }}
          >
            <View
              style={{
                width: isiPad?30: 23,
                height:isiPad?30: 23,
                backgroundColor: colors.primary,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={images.plus}
                style={{ width: isiPad?18:  12, height:isiPad?18: 12, resizeMode: "contain" }}
              />
            </View>
            <CustomText
              text={addNewAddressTitle}
              size={isiPad?18: 14}
              style={{marginTop:verticalScale(2)}}
              color={colors.primary}
              fontWeight="500"
              fontFam={font.montserratMedium}
            />
          </TouchableOpacity>
          {
            error.length>0&&(
              <CustomText
              text={error}
              size={12}
              color={"red"}
              fontWeight="500"
              style={{textAlign:"right"}}
              fontFam={font.montserratMedium}
            />
          

            )
          }
        
          <View
            style={{
              gap: 10,
              marginTop: 20,
            }}
          >
            <CustomButton
              text={applyTitle}
              borderRadius={32}
              size={ isiPad?20: 14}
              height={ isiPad?verticalScale(27): 45}
            
              // disable={Object.keys(seletctedAddress).length==0? true : false}
              onPress={onConfirm}
              notRequiredShadow
            />
            <CustomButton
              text={cancelTitle}
              borderRadius={32}
              bgColor={colors.white}
              textColor={colors.primary}
     
              size={ isiPad?20: 14}
              height={ isiPad?verticalScale(27): 45}


              onPress={onCancel}
              notRequiredShadow
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};
export default AddressModal;
