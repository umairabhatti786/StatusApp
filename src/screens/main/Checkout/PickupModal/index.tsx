import { TouchableOpacity, View } from "react-native";
import { colors } from "../../../../utils/colors";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomLine from "../../../../components/CustomLine";
import { appStyles } from "../../../../utils/AppStyles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../../redux/reducers/authReducer";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import RadioButton from "../../../../components/RadioButton";
import { setPickupType } from "../../../../redux/reducers/cartReducer";
import { isiPad } from "../../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";
type Props = {
  isModalVisible?: any;
  setIsModalVisible?: any;
  setPickup?: any;
  entityType?: any;
  getLabel?: (item:any) => void;
  onSeletePickup?: () => void;
  pickup?: string;
  setIsDineInModal?: any;
  applyTitle?:string,
  cancelTitle?:string
};

const PickupModal = ({
  isModalVisible,
  setIsModalVisible,
  setPickup,
  entityType,
  pickup,
  getLabel,
  setIsDineInModal,
  applyTitle,
  cancelTitle
}: Props) => {
  const [selectedPickup, setSelectedPickup] = useState(pickup);
  const dispatch=useDispatch()

  return (
    <CustomModal
      isModalVisible={isModalVisible}
      setModalVisible={setIsModalVisible}
      justifyContent={"center"}
      paddingTop={"0%"}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            backgroundColor: colors.white,
            paddingBottom: 30,
            paddingHorizontal: 20,
            ...appStyles?.modalElevation,
          }}
        >
          {entityType.map((item, index) => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setSelectedPickup(item)}
                  style={{
                    paddingVertical: 20,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <RadioButton
                    onActivePress={() => setSelectedPickup(item)}
                    active={selectedPickup == item ? true : false}
                  />

                  <CustomText
                    text={getLabel(item)}
                    size={ isiPad?19: 14}
                    numberOfLines={2}
                    fontWeight="500"
                    style={{ marginLeft: 10 }}
                    fontFam={font.montserratMedium}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <CustomLine />
              </>
            );
          })}

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
              disable={!setSelectedPickup ? true : false}
              onPress={() => {
             dispatch(   setPickupType(selectedPickup))
                setIsModalVisible(false);
                if (selectedPickup == "3") {
                  setTimeout(() => {
                    setIsDineInModal(true);
                  }, 500);
                }
              }}
              notRequiredShadow
            />
            <CustomButton
              text={cancelTitle}
              borderRadius={32}
              bgColor={colors.white}
              textColor={colors.primary}
              size={ isiPad?20: 14}
              height={ isiPad?verticalScale(27): 45}
              onPress={() => {
                setIsModalVisible(false)

              }}
              notRequiredShadow
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};
export default PickupModal;
