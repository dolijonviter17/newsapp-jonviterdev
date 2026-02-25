import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(protected)/profile" />;
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
