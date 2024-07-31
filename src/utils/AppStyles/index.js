import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const appStyles = StyleSheet.create({
  coontainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 9999,
    backgroundColor:colors.primary

  },
  rowJustify:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },

  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  elevation: {
    elevation: 5,
    shadowColor:colors.lightBlack,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingButton:{
    width: 150,
    height: 45,
    borderRadius: 30,
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: 20,
    right: 15,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    paddingHorizontal:12
  },
  modalElevation: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonElevation: {
    elevation: 5,
    shadowColor: colors.lightBlack,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
