import { View } from "react-native";
import { colors } from "../../../../utils/colors";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import { appStyles } from "../../../../utils/AppStyles";
import CustomSearch from "../../../../components/CustomSearch";
import { useState } from "react";
import CustomText from "../../../../components/CustomText";
import { font } from "../../../../utils/font";
import { isiPad } from "../../../../utils/CommonFun";
import { verticalScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { getLocalizeFile } from "../../../../redux/reducers/localizeReducer";
type Props = {
  isModalVisible?: any;
  setIsModalVisible?: any;
  onSeletePickup?: () => void;
  setTableNo?: any;
  tableNo?: any;
  Placeholder?: string;
  applyButtonTitle?: string;
};
const DineInModal = ({
  isModalVisible,
  setIsModalVisible,
  setTableNo,
  tableNo,
  Placeholder,
  applyButtonTitle,
}: Props) => {
  console.log("tableNo", tableNo);
  const [table, setTable] = useState("");
  const [error, setError] = useState("");
  const tableNumberFieldvalidation:any=useSelector(getLocalizeFile)?.checkout_delivery_type_dine_in_field_validation
  return (
    <CustomModal
      isModalVisible={isModalVisible}
      // setModalVisible={setIsModalVisible}
      justifyContent={"center"}
      paddingTop={"0%"}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            backgroundColor: colors.white,
            paddingVertical: 30,
            paddingHorizontal: 20,
            borderRadius: 7,
            ...appStyles?.modalElevation,
          }}
        >
          <CustomSearch
            placeholder={Placeholder}
            backgroundColor={colors.grey}
            width={"100%"}
            value={table}
            textColor={colors.primary}
            onChangeText={(txt) => {
              if (txt.length == 0) {
                setError(tableNumberFieldvalidation);
              } else {
                setError("");
              }

              setTable(txt);
            }}
          />
          {error && (
            <CustomText
              text={error}
              style={{ textAlign: "right", marginTop: 5 }}
              //  fontWeight="600"
              color={colors.warning}
              fontFam={font.montserratMedium}
            />
          )}

          <View
            style={{
              gap: 10,
              marginTop: 20,
            }}
          >
            <CustomButton
              text={applyButtonTitle}
              borderRadius={32}
             
              size={ isiPad?20: 16}
              height={ isiPad?verticalScale(27): 45}
              onPress={() => {
                if (table.length == 0) {
                setError(tableNumberFieldvalidation);

                  return;
                }
                setTableNo(table);

                setIsModalVisible(false);
              }}
              notRequiredShadow
            />
            {/* <CustomButton
              text={cancelButton}
              borderRadius={32}
              bgColor={colors.white}
              textColor={colors.primary}
              size={14}
              height={45}
              onPress={() => setIsModalVisible(false)}
              notRequiredShadow
            /> */}
          </View>
        </View>
      </View>
    </CustomModal>
  );
};
export default DineInModal;
