import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  className?: string;
  title: string;
}
export const Button = ({ className, title, ...props }: ButtonProps) => {
  return (
    <Pressable
      {...props}
      className={["mt-4", className].filter(Boolean).join(" ")}
    >
      <LinearGradient
        colors={["#C9FF22", "#71D100"]}
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 0.9, y: 0.9 }}
        style={{
          height: 58,
          borderRadius: 29,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-[#0B0F17] text-lg font-bold">{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
