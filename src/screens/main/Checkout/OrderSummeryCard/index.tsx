import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  getCartData,
  getTotalCartAmount,
  setCartData,
  setDecrementCartItem,
  setIncrementCartItem,
  setTotalCartAmount,
} from "../../../../redux/reducers/cartReducer";
import { getToken } from "../../../../redux/reducers/authReducer";
import { getSelectedBranch } from "../../../../redux/reducers/branchesReducer";
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../../../../components/CustomText";
import { ApiServices } from "../../../../api/ApiServices";
import ScreenLayout from "../../../../components/ScreenLayout";
import { colors } from "../../../../utils/colors";
import CartItem from "../../../../components/CartItem";
import CustomLine from "../../../../components/CustomLine";
import { font } from "../../../../utils/font";
import PopularOrder from "../../../../components/PopularOrder";
import { Spacer } from "../../../../components/Spacer";
import { appStyles } from "../../../../utils/AppStyles";
import { dollarSymbol } from "../../../../utils/CommonFun";
import CustomButton from "../../../../components/CustomButton";
import EmptyCart from "../../../../components/EmptyCart";

type Props = {
  navigation?: any;
  Qty?:string
};

const windowHeight = Dimensions.get("window").height;
const OrderSummeryCard = ({ navigation,Qty }: Props) => {
  const cartData = useSelector(getCartData);

 

  

  



  // const [cardData, setCardData] = useState(abc);


  // const formattedCharges = calculatePackagingIncharges().toFixed(2);

  return (
    <View
      style={{ width: "100%", backgroundColor: colors.white }}
    >
      {cartData.length > 0 && (
        <View>
          <FlatList
            contentContainerStyle={{
              gap: 10,
            }}
            keyExtractor={(item, index) => item.toString() + index}

            style={{ marginTop: 10, paddingHorizontal: 10 }}
            scrollEnabled={false}
            data={cartData}
            renderItem={({ item, index }) => {
              const lastIndex = cartData.length - 1;
              return (
                <>
                  <CartItem
                  Qty={Qty}
                   item={item} key={index} disableIncrement={true} />
                  <View style={{ paddingRight: 10 }}>
                    {lastIndex !== index && <CustomLine />}
                  </View>
                </>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default OrderSummeryCard;
