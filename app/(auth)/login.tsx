import Button from "@/components/button";
import Container from "@/components/container";
import Input from "@/components/input";
import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  return (
    <Container>
      <View className="flex-1 items-center justify-center px-6 pt-16">
        {/* Logo */}
        {/* <View className="bg-white/20 p-4 rounded-2xl mb-6">
          <Feather name="hexagon" size={40} color="white" />
        </View> */}

        <Text className="text-white text-3xl font-bold mb-2">
          Welcome back!
        </Text>

        <Text className="text-white/80 text-center text-base">
          You've been missed,{"\n"}
          Please sign in your account
        </Text>

        {/* Illustration */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          className="w-60 h-60 mt-8"
          resizeMode="contain"
        />
      </View>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Your email"
      />
      <Input
        secureTextEntry={true}
        label="Pasword"
        value={password}
        onChangeText={setPassword}
        placeholder="Your email"
      />
      <Button title="Login" />
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
