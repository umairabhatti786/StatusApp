import {
  Alert,
  Image,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../assets";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import RadioButton from "../RadioButton";
import { useEffect, useState } from "react";
import { Spacer } from "../Spacer";
import { ApiServices } from "../../api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/reducers/authReducer";
import {
  getBranchesData,
  getFavouriteBranches,
  getSelectedBranch,
  setFavouriteBranches,
} from "../../redux/reducers/branchesReducer";
import { scale, verticalScale } from "react-native-size-matters";
import { appStyles } from "../../utils/AppStyles";
import { isiPad } from "../../utils/CommonFun";
interface cardData1 {}
type Props = {
  title?: string;
  description?: string;
  onPress?: any;
  navigation?: any;
  isShowChange?: boolean;
  isShowLine?: boolean;
  ishomePin?: boolean;
  isShowInfo?: boolean;
  isShowHeart?: boolean;
  distance?: string;
  isFavourite?: any;
  id?: any;
  index?: any;
  item?: object;
  isOpenBranch?:boolean
  token?:any,
  onBranchPress?: () => void;
  onInfo:()=>void
};

const LocationCard = ({
  title,
  description,
  onPress,
  isShowChange,
  isShowLine,
  ishomePin,
  isShowHeart,
  isShowInfo,
  navigation,
  distance,
  isFavourite,
  id,
  item,
  index,
  isOpenBranch,
  onBranchPress,
  onInfo
}: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const token = useSelector(getToken);
  const favouriteBranches = useSelector(getFavouriteBranches);
  const selectedBranch=useSelector(getSelectedBranch)

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFavourite == 0) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, []);
  useEffect(() => {
    if(selectedBranch.id==id){
      setActive(true)
    }
    else {
      setActive(false)
    }
   
  }, [selectedBranch]);


  const onIsFavourite = () => {
    setIsLiked(!isLiked);

    const formData = new FormData();
    formData.append("is_favorite", isLiked ? 0 : 1);
    formData.append("branch_id", Number(id));
    const params = {
      token: token,
      data: formData,
    };

    ApiServices.branchFavorite(params, async ({ isSuccess, response }: any) => {
      if (isSuccess) {
        let result = JSON.parse(response);
        if (result?.success) {
          const findIsFavourate = favouriteBranches.filter(
            (data) => data.id != id
          );
          dispatch(setFavouriteBranches(findIsFavourate));

        } else {
          setIsLiked(false);
        }
      } else {
        setIsLiked(false);

        Alert.alert("Alert!", "Something went wrong");
      }
    });
  };
  return (
    <TouchableOpacity
    activeOpacity={0.6}
    disabled={!onBranchPress}


      onPress={onBranchPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10,
        paddingRight:scale(5),
        // backgroundColor:"red"
      }}
    >
      <View
        style={{
          width:  isiPad?scale(15):  "10%",
          marginBottom: "5%",
          alignItems: "flex-start",
          // backgroundColor:"red"
        }}
      >
        {ishomePin ? (
          <Image
            source={images.homePin}
            style={{ width: 28, height: 28, resizeMode: "contain" }}
          />
        ) : (
          <RadioButton
            active={active}
            setActive={setActive}
            disabled={!onBranchPress}
            onActivePress={onBranchPress}
            style={{ marginTop: "20%" }}
          />
        )}
        {isShowLine && (
          <View
            style={{
              width: 3,
              height: verticalScale(26),
              backgroundColor: colors.primary,
              opacity: 0.35,
              position: "absolute",
              bottom: Platform.OS === "ios" ? -35 : -30,
              right: "65%",
              borderRadius: 12,
            }}
          />
        )}
      </View>
      <View
        style={{
          width: "68%",
        }}
      >
        <CustomText
          text={title}
          size={ isiPad?18: 14}
          numberOfLines={2}
          fontWeight="500"
          fontFam={font.montserratMedium}
          color={colors.primary}
        />
        <Spacer height={3} />
        <CustomText
          text={description}
          color={colors?.lightBlack}
          numberOfLines={2}
          size={ isiPad?15: 12}

          fontWeight="400"
          style={{ width: "100%" }}
        />
        <Spacer height={3} />
        <View  style={appStyles.row}>
        <CustomText
          text={distance}
          color={colors?.lightBlack}
          numberOfLines={2}
          size={ isiPad?15: 12}

          fontWeight="400"
          // style={{ width: "100%" }}
        />
        
        {
          !item?.open&&  isOpenBranch&&(
            <CustomText
            text={"closed"}
            color={"red"}
            numberOfLines={2}
            size={ isiPad?15: 12}

            fontWeight="400"
            style={{marginLeft:scale(5) }}
          />

          )
        }
         
       

        </View>
       
      </View>
      <View
        style={{
          width: "25%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {isShowChange && (
          <Pressable
            onPress={onPress}
            style={{
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <CustomText
              text={"Change"}
              fontFam={font.montserratMedium}
              fontWeight="500"
              style={{ textDecorationLine: "underline" }}
              color={colors.primary}
            />
          </Pressable>
        )}
        {isShowHeart && (
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={!token}
            onPress={() => {
              onIsFavourite();
              //   setIsLiked(!isLiked);
            }}
            style={{
              alignSelf: "center",
              justifyContent:"center",
              alignItems:"center",
              width:40,
              height:55,
            }}
          >
            {
              token&&(
                  <Image
              source={isLiked ? images.heartFilled : images.heart1}
              style={{ width:isiPad?35:  24, height: isiPad?35:24 }}
            />

              )
            }
          
          </TouchableOpacity>
        )}
        {isShowInfo && (
          <TouchableOpacity
          activeOpacity={0.6}
            onPress={onInfo}
            style={{
              alignSelf: "center",
              justifyContent:"center",
              alignItems:"center",
              width:40,
              height:55,


            }}
           
          >
            <Image
              source={images.info}
              style={{
                width:isiPad?35:  24, height: isiPad?35:24 ,
                ...(active ? {} : { tintColor: colors.primary }),
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default LocationCard;
