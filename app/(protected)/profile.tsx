import Container from "@/components/container";
import MenuItem from "@/components/menu-item";
import Text from "@/components/Text";
import { useAuth } from "@/context/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text as RSText, View } from "react-native";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-4 items-center">
      <RSText className="text-black  dark:text-[#B7F10A] text-xl font-bold">
        {value}
      </RSText>
      <Text className="text-xs mt-1">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  return (
    <Container onDetail title="Profile">
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

        <Text variant="title" weight="bold" className="text-2xl font-bold mt-4">
          {user.name}
        </Text>
        <Text className="mt-1">Premium Member</Text>
      </View>

      <View className="flex-row gap-3 mt-8">
        <StatCard label="Likes" value="124" />
        <StatCard label="Folowers" value="32k" />
        <StatCard label="Read" value="87h" />
      </View>
      <View className="h-[1px] bg-black/10 dark:bg-white/10 my-8" />

      <MenuItem
        icon="log-out-outline"
        title="Logout"
        danger
        onPress={() => signOut()}
      />
    </Container>
  );
}
