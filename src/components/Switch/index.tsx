import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";

type Props = {
  value?: boolean
  onValueChange?: any
  disabled?: boolean
}

const ToggleSwitch = ({ value, onValueChange, disabled }: Props) => {
  const [animatedValue, setAnimatedValue] = useState(
    new Animated.Value(value ? 1 : 0)
  );
  const [isOn, setIsOn] = useState(value);
  useEffect(() => {
    setIsOn(value);
    setAnimatedValue(new Animated.Value(value ? 1 : 0));
  }, [value]);
  const toggleSwitch = () => {
    const toValue = isOn ? 0 : 1;
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsOn(!isOn);
    onValueChange(!isOn);
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#bdc3c7", "#092F74"],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 22],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={toggleSwitch}
    >
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX }],
              backgroundColor: disabled ? "#e6e6e6" : "white",
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: "white",
  },
});

export { ToggleSwitch };
