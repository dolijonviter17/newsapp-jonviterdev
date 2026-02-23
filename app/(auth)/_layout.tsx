import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  const { isLogin } = useAuth();

  if (isLogin) {
    return <Redirect href="/(protected)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
