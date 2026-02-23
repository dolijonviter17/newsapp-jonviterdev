import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const ProtectedLayout = () => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
