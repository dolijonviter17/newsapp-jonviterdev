import React from "react";
import { ScrollView, StyleSheet, View, type ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}
const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <View
      {...props}
      className={["flex-1 bg-[#0B0F17]", className].filter(Boolean).join(" ")}
    >
      <ScrollView
        contentContainerClassName="px-6 pt-14 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
