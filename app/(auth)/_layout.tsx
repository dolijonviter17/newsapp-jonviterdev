import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) {
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
