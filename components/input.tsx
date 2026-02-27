import React from "react";
import {
  Text as RSText,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import Text from "./Text";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}
export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <View className="mb-4">
      <Text weight="medium" className="text-sm mb-2">
        {label}
      </Text>
      <View className="bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-4">
        <TextInput
          {...props}
          placeholderTextColor="text-black dark:text-white"
          className="text-black dark:text-white text-base"
        />
      </View>
      {error && (
        <RSText className="text-[#ff4d4f]/80  text-sm mt-2">{error}</RSText>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
