import { tokenCache } from "@/utils/cache";
import { BASE_URL } from "@/utils/constants";
import {
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as jose from "jose";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithUsernamePassword: (
    username: string,
    password: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
};

const appleConfig: AuthRequestConfig = {
  clientId: "apple",
  scopes: ["name", "email"],
  redirectUri: makeRedirectUri(),
};

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<any | null>(null);

  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  React.useEffect(() => {
    handleResponse();
  }, [response]);

  const handleNativeTokens = async (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    console.log(
      "Received initial access token:",
      newAccessToken ? "exists" : "missing",
    );
    console.log(
      "Received initial refresh token:",
      newRefreshToken ? "exists" : "missing",
    );

    // Store tokens in state
    if (newAccessToken) setAccessToken(newAccessToken);
    if (newRefreshToken) setRefreshToken(newRefreshToken);

    // Save tokens to secure storage for persistence
    if (newAccessToken)
      await tokenCache?.saveToken("accessToken", newAccessToken);
    if (newRefreshToken)
      await tokenCache?.saveToken("refreshToken", newRefreshToken);

    // Decode the JWT access token to get user information
    if (newAccessToken) {
      const decoded = jose.decodeJwt(newAccessToken);
      setUser(decoded as any);
    }
  };

  async function handleResponse() {
    // This function is called when Google redirects back to our app
    // The response contains the authorization code that we'll exchange for tokens

    if (response?.type === "success") {
      try {
        setIsLoading(true);
        // Extract the authorization code from the response
        // This code is what we'll exchange for access and refresh tokens
        const { code } = response.params;

        // Create form data to send to our token endpoint
        // We include both the code and platform information
        // The platform info helps our server handle web vs native differently
        const formData = new FormData();
        formData.append("code", code);

        // Add platform information for the backend to handle appropriately

        console.log("request", request);

        // Get the code verifier from the request object
        // This is the same verifier that was used to generate the code challenge
        if (request?.codeVerifier) {
          formData.append("code_verifier", request.codeVerifier);
        } else {
          console.warn("No code verifier found in request object");
        }

        // Send the authorization code to our token endpoint
        // The server will exchange this code with Google for access and refresh tokens
        // For web: credentials are included to handle cookies
        // For native: we'll receive the tokens directly in the response
        const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
          method: "POST",
          body: formData,
          credentials: "same-origin", // Include cookies for web
        });

        const tokens = await tokenResponse.json();
        await handleNativeTokens(tokens);
      } catch (e) {
        console.error("Error handling auth response:", e);
      } finally {
        setIsLoading(false);
      }
    } else if (response?.type === "cancel") {
      alert("Sign in cancelled");
    } else if (response?.type === "error") {
      setError(response?.error as any);
    }
  }

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

  const signInWithGoogle = async () => {
    try {
      if (!request) {
        console.log("No request");
        return;
      }

      await promptAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        signInWithUsernamePassword,
        signInWithGoogle,
        signIn,
        signOut,
        user,
        isLoading,
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
