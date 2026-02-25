import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { WebView } from "react-native-webview";

export default function ArticleWebView() {
  const params = useLocalSearchParams<{ url: string; title?: string }>();

  const url = params.url as string;
  const title = (params.title as string) || "Artikel";

  return (
    <SafeAreaView className="flex-1 bg-[#060B12]">
      <StatusBar barStyle="light-content" />

      <View className="px-6 py-3 flex-row items-center justify-between border-b border-white/10">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
        >
          <Text className="text-2xl text-white">‹</Text>
        </Pressable>

        <Text
          className="flex-1 px-3 text-center text-[14px] font-semibold text-white"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="h-10 w-10" />
      </View>

      {/* <WebView source={{ uri: url }} /> */}
    </SafeAreaView>
  );
}
