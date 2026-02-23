import { BASE_URL } from "@/utils/constants";
import * as WebBrowser from "expo-web-browser";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithUsernamePassword: (
    username: string,
    password: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      const login_user = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });
      const current_user = await login_user.json();
      console.log("pengguna : ", current_user);

      const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });
      const userData = await tokenResponse.json();

      console.log("tokenResponse", userData);

      // Current timestamp in seconds
      // const issuedAt = Math.floor(Date.now() / 1000);
      // const random_id = randomUUID();
      // console.log("random_id", random_id);

      // const crate_token = await new jose.SignJWT({
      //   id: random_id,
      //   email: email,
      // })
      //   .setProtectedHeader({ alg: "HS256" })
      //   .setExpirationTime(JWT_EXPIRATION_TIME)
      //   .setIssuedAt(issuedAt)
      //   .sign(new TextEncoder().encode(JWT_SECRET));

      // setIsLogin(true);
      // console.log("token :", crate_token);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const signOut = async () => {
    setIsLogin(false);
  };
  const signInWithUsernamePassword = async (
    username: string,
    password: string,
  ) => {
    try {
      const login_user = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });
      const current_user = await login_user.json();
      console.log("pengguna : ", current_user);
      const formData = new FormData();
      const name = `${current_user.firstName} ${current_user.lastName}`;
      formData.append("email", current_user.email);
      formData.append("name", name);
      formData.append("picture", current_user.image);
      const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });
      const userData = await tokenResponse.json();

      console.log("tokenResponse", userData);
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        signInWithUsernamePassword,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
