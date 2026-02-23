import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}
export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-white/60 text-sm mb-2">{label}</Text>
      <View className="bg-[#141824] border border-white/10 rounded-2xl px-4 py-4">
        <TextInput
          {...props}
          placeholderTextColor="rgba(255,255,255,0.4)"
          className="text-white text-base"
        />
      </View>
      {error && <Text className="text-[#ff4d4f]/80 text-sm mt-2">{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
