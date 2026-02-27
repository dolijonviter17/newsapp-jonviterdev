import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "./Text";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  onDetail?: boolean;
  title?: string;
}
const Container = ({
  onDetail = false,
  title,
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <SafeAreaView
      {...props}
      className={["flex-1 bg-white dark:bg-gray-900", className]
        .filter(Boolean)
        .join(" ")}
    >
      {onDetail && (
        <View className="px-6 py-3 flex-row items-center justify-between border-b border-black/10 dark:border-white/10 mb-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/10"
          >
            <Text className="text-2xl">‹</Text>
          </Pressable>

          <Text
            className="flex-1 px-3 text-center text-[14px] font-semibold "
            numberOfLines={1}
          >
            {title}
          </Text>

          <View className="h-10 w-10" />
        </View>
        // <View className="px-6 pt-2">
        //   <View className="flex-row items-center justify-between">
        //     <Pressable
        //       onPress={() => {
        //         // TODO: navigation.goBack()
        //         router.back();
        //       }}
        //       className="h-12 w-12 items-center justify-center rounded-full bg-black/10 dark:bg-white/10"
        //     >
        //       <Text weight="bold" variant="title">
        //         ‹
        //       </Text>
        //     </Pressable>
        //   </View>
        // </View>
      )}
      {/* <ScrollView
        contentContainerClassName="px-6 pt-14 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView> */}
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({});
