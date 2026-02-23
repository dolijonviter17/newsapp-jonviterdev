import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  className?: string;
}
export const Button = ({ className, title, icon, ...props }: ButtonProps) => {
  return (
    <Pressable
      {...props}
      className={["mt-4", className].filter(Boolean).join(" ")}
    >
      <LinearGradient
        colors={["#C9FF22", "#71D100"]}
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          {
            height: 58,
            borderRadius: 29,
            alignItems: "center",
            justifyContent: icon ? "space-around" : "center",
          },
          icon && {
            flexDirection: "row",
          },
        ]}
      >
        <Text className="text-[#0B0F17] text-lg font-bold">{title}</Text>
        {icon && <Ionicons name={icon} size={30} color="#0B0F17" />}
      </LinearGradient>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
