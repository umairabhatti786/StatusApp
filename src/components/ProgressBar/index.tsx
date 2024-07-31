import { View, StyleSheet, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../utils/colors";
import CustomText from "../CustomText";
import { font } from "../../utils/font";
import { images } from "../../assets";
import * as Animatable from "react-native-animatable";
import { isiPad } from "../../utils/CommonFun";

type Level = {
  level: string;
  points: number;
};
type Props = {
  points?: any;
  progressColor?: any;
  height?: number;
  useAngle?: boolean;
  primaryBackgrondColor?: any;
  secondaryBackgrondColor?: any;
  angle?: number;
  tierSilverPoints: number;
  tierBronzePpoints: number;
  tierGoldPoints: number;
  tierPlatinumPoints: number;
};
function ProgressBar({
  points,
  progressColor,
  height,
  useAngle,
  primaryBackgrondColor,
  secondaryBackgrondColor,
  angle,
  tierSilverPoints,
  tierBronzePpoints,
  tierGoldPoints,
  tierPlatinumPoints,
}: Props) {
  let earnedPoints = points;

  const levels: Level[] = [
    { level: "Level 1", points: tierBronzePpoints },
    { level: "Level 2", points: tierSilverPoints },
    { level: "Level 3", points: tierGoldPoints },
    { level: "Level 4", points: tierPlatinumPoints },
  ];
  const totalPoints = tierPlatinumPoints; //levels?.reduce((acc, curr) => acc + curr?.points, 0);
  const width: string = `${(totalPoints / totalPoints) * 100}%`;
  const progress = (earnedPoints / totalPoints) * 100;
  console.log("progress", earnedPoints);
  const renderLevels = () => {
    let accumulatedWidth = 0;
    return (
      totalPoints > 0 &&
      levels?.map((levelObj, index) => {
        const levelWidth = (levelObj?.points / totalPoints) * 100; // Assuming 300 as the total width for calculation
        accumulatedWidth = levelWidth - 10; // Update accumulatedWidth for the next level
        const leftPosition = accumulatedWidth; // Set the left position based on accumulatedWidth
        return (
          totalPoints > 0 && (
            <View
              key={index}
              style={[styles.levelMarker, { left: `${leftPosition}%` }]}
            >
              {levelObj?.points == tierPlatinumPoints ? (
                <Image
                  source={images.star}
                  resizeMode="contain"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    tintColor:
                      earnedPoints >= tierPlatinumPoints
                        ? "#E6E6FA"
                        : "#FFC107",
                    top: -15,
                    width: isiPad ? 40 : 30,
                    height: isiPad ? 40 : 30,
                    left: 13,
                  }}
                />
              ) : (
                <View style={styles.circleContainer}>
                  <View
                    style={{
                      ...styles.circle,
                      backgroundColor:
                        earnedPoints >= levelObj?.points
                          ? colors.yellow
                          : colors.white,
                    }}
                  />

                  <CustomText
                    text={levelObj.points}
                    size={isiPad ? 18 : 13}
                    fontWeight="400"
                    fontFam={font.montserratMedium}
                    color={colors.white}
                    style={{ marginTop: 8 }}
                  />
                </View>
              )}
            </View>
          )
        );
      })
    );
  };
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <LinearGradient
        useAngle={useAngle}
        angle={angle}
        colors={[primaryBackgrondColor, secondaryBackgrondColor]}
        style={{
          height: height,
          width: width,
          borderRadius: 9999,
        }}
      >
        {totalPoints > 0 && (
          <Animatable.View
            animation="slideInLeft"
            style={[
              {
                width: 12,
                backgroundColor: progressColor,
                height: height,
                borderRadius: 9999,
              },
              { width: earnedPoints > totalPoints ? "100%" : `${progress}%` },
            ]}
          ></Animatable.View>
        )}
      </LinearGradient>

      <View
        style={{
          position: "absolute",
          width: width,
          height: 25,
          flexDirection: "row",
          alignItems: "center",
          top: 0,
        }}
      >
        {renderLevels()}
        {earnedPoints < totalPoints && (
          <Image
            source={images.pointer}
            style={{
              height: isiPad ? 25 : 18,
              width: isiPad ? 18 : 12,
              marginTop: isiPad ? 10 : 0,
              marginLeft: isiPad
                ? points == 0
                  ? -5
                  : `${progress - 2}%`
                : `${progress - 2}%`,
            }}
          />
        )}
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  circle: {
    width: isiPad ? 30 : 20,
    height: isiPad ? 30 : 20,
    borderRadius: 999,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: isiPad ? 8 : 0,
    width: 50,
  },
  levelMarker: {
    position: "absolute",
    top: 6,
    bottom: -2,
    zIndex: 1,
    justifyContent: "center",
  },
  levelText: {
    position: "absolute",
    bottom: -15,
    fontSize: isiPad ? 15 : 12,
    color: "#FFC107",
  },
});

export { ProgressBar };
