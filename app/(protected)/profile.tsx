import MenuItem from "@/components/menu-item";
import { useAuth } from "@/context/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 bg-[#141824] border border-white/10 rounded-2xl p-4 items-center">
      <Text className="text-[#B7F10A] text-xl font-bold">{value}</Text>
      <Text className="text-white/60 text-xs mt-1">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-[#060B12]">
      <StatusBar barStyle="light-content" />
      <View className="px-6 pt-2">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => {
              // TODO: navigation.goBack()
              router.back();
            }}
            className="h-12 w-12 items-center justify-center rounded-full bg-white/10"
          >
            <Text className="text-xl text-white">‹</Text>
          </Pressable>
        </View>
      </View>
      {/* Header */}
      <View className="items-center">
        <LinearGradient
          colors={["#C9FF22", "#71D100"]}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: user.picture,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        </LinearGradient>

        <Text className="text-white text-2xl font-bold mt-4">{user.name}</Text>
        <Text className="text-white/50 text-sm mt-1">Premium Member</Text>
      </View>

      <View className="flex-row gap-3 mt-8">
        <StatCard label="Likes" value="124" />
        <StatCard label="Folowers" value="32k" />
        <StatCard label="Read" value="87h" />
      </View>
      <View className="h-[1px] bg-white/10 my-8" />

      <MenuItem
        icon="log-out-outline"
        title="Logout"
        danger
        onPress={() => signOut()}
      />
    </SafeAreaView>
  );
}
