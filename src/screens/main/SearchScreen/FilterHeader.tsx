import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomSearch from "../../../components/CustomSearch";
import { Spacer } from "../../../components/Spacer";
import TopBar from "../../../components/TopBar";
import BottomSheet from "@gorhom/bottom-sheet";

import TopHeader from "../../../components/TopHeader";
import { appStyles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/colors";
import UserList from "./UserList";
import { scale, verticalScale } from "react-native-size-matters";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  setNotificationAlert,
} from "../../../redux/reducers/authReducer";
import { GetAllUsers } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import axios from "axios";
import { getApiUrl } from "../../../api/Config";
import { URLS } from "../../../api/baseUrl";
import FilterCategory from "./FilterCategory";
import NewText from "../../../components/NewText";
import CustomBottomSheet from "../../../components/CustomBottomSheet";

const FilterHeader = ({
  navigation,
  bottomSheetModalRef,
  setFilterTwo,
  item,
  filterIndex,
   setFilterIndex
  
}: any) => {
  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(true);


  return (
    <>
      <View style={{ marginHorizontal: scale(3) }}>
        <Button
          onPress={() => {
            setFilterTwo(item.filter);

            setIsActiveFilter(!isActiveFilter);
          }}
          height={32}
          fontFam={"Inter-Regular"}
          fontWeight={"400"}
          paddingHorizontal={8}
          size={15}
          textColor={isActiveFilter ? colors.black100 : colors.white}
          bgColor={isActiveFilter ? colors.white : colors.primary}
          text={item.value}
        />
      </View>
    </>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  categoryBtn: {
    height: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // minWidth:scale(50),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
    marginLeft: scale(3),
    marginRight: scale(20),
    flexDirection: "row",

    // paddingTop:5
  },
});
