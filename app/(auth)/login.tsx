import Button from "@/components/button";
import Container from "@/components/container";
import Input from "@/components/input";
import { useAuth } from "@/context/auth";
import { passwordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Image, StyleSheet, Text, View } from "react-native";
import z from "zod";

const signInScheme = z.object({
  username: z.string().min(1, {
    message: "Silahkan masukan username dengan benar",
  }),
  //z.email({ message: "Silahkan masukan email dengan benar" }),
  password: passwordSchema,
});

type signInValues = z.infer<typeof signInScheme>;
const LoginScreen = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<signInValues>({
    resolver: zodResolver(signInScheme),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = async (values: signInValues) => {
    await signIn(values.username, values.password);
  };

  return (
    <Container>
      <View className="flex-1 items-center justify-center px-6 pt-16">
        {/* Logo */}
        {/* <View className="bg-white/20 p-4 rounded-2xl mb-6">
          <Feather name="hexagon" size={40} color="white" />
        </View> */}

        <Text className="text-white text-3xl font-bold mb-2">
          Selamat datang!
        </Text>

        <Text className="text-white/80 text-center text-base">
          Halo reader,{"\n"}
          Silahkan login ke aplikasi
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
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            autoCapitalize="none"
            label="Username"
            value={value}
            onChangeText={onChange}
            placeholder="Masukan username anda"
            error={errors.username ? errors.username.message : ""}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            secureTextEntry={true}
            label="Pasword"
            value={value}
            onChangeText={onChange}
            placeholder="Masukan password anda"
            error={errors.password ? errors.password.message : ""}
          />
        )}
      />

      <Button
        title="Login"
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <Button
        title="Lanjutkan dengan Google"
        disabled={isSubmitting}
        onPress={signInWithGoogle}
        icon="logo-google"
      />
      {/* Google Login Button */}
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
