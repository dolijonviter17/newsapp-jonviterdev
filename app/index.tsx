import React from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-[#315aac]">
      <ScrollView
        contentContainerClassName="px-6 pt-14 pb-36"
        showsVerticalScrollIndicator={false}
      ></ScrollView>

      {/* Bottom actions */}
    </View>
  );
}
