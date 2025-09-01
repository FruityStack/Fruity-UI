import React from "react";
import { View, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, interpolate } from "react-native-reanimated";

interface Props {
  borderRadius?: number;
  borderWidth?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRADIENT_WIDTH = SCREEN_WIDTH * 2;

const AnimatedGradientBorder = ({ borderRadius = 12, borderWidth = 3, children, style }: Props) => {
  const offset = useSharedValue(0);

  React.useEffect(() => {
    offset.value = withRepeat(withTiming(1, { duration: 6000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(offset.value, [0, 1], [-GRADIENT_WIDTH, 0]),
        },
      ],
    };
  });

  return (
    <View
      style={[
        {
          borderRadius,
          padding: borderWidth,
          overflow: "visible",
          position: "relative",
        },
        style,
      ]}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 0,
          borderRadius,
          overflow: "hidden",
        }}
        pointerEvents="none"
      >
        <Animated.View
          style={[
            {
              width: GRADIENT_WIDTH * 2,
              height: "100%",
              flexDirection: "row",
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={["#3B82F6", "#9333EA", "#F59E0B", "#10B981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: GRADIENT_WIDTH, height: "100%" }}
          />
          <LinearGradient
            colors={["#3B82F6", "#9333EA", "#F59E0B", "#10B981"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: GRADIENT_WIDTH, height: "100%" }}
          />
        </Animated.View>
      </View>
      <View
        style={{
          borderRadius: borderRadius - borderWidth,
          overflow: "hidden",
          backgroundColor: "#111827",
          zIndex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default AnimatedGradientBorder;
