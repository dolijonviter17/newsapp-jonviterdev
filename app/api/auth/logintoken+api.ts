import {
  JWT_EXPIRATION_TIME,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRY,
} from "@/utils/constants";
import * as jose from "jose";

export async function POST(request: Request) {
  // Create a new object without the exp property from the original token
  const body = (await request.formData()) as any;
  const email = body.get("email") as string;
  // User id
  const sub = "124831631356600220630";

  // Current timestamp in seconds
  const issuedAt = Math.floor(Date.now() / 1000);

  // Generate a unique jti (JWT ID) for the refresh token
  const jti = crypto.randomUUID();
  const jwt_values = {
    sub,
    jti, // Include a unique ID for this refresh token
    type: "refresh",
    // Include all user information in the refresh token
    // This ensures we have the data when refreshing tokens
    name: "Jonviter Simbolon",
    email: email,
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocLuKu53BbOs_eLWAucSIX9lWRrdk0lB-jGULhOtvViUqMQ16rG0=s96-c",
    given_name: "Jonviter",
    family_name: "Simbolon",
    email_verified: true,
  };
  // Create access token (short-lived)
  const accessToken = await new jose.SignJWT(jwt_values)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .setSubject(sub)
    .setIssuedAt(issuedAt)
    .sign(new TextEncoder().encode(JWT_SECRET));

  // Create refresh token (long-lived)
  const refreshToken = await new jose.SignJWT(jwt_values)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setIssuedAt(issuedAt)
    .sign(new TextEncoder().encode(JWT_SECRET));

  // For native platforms, return both tokens in the response body
  return Response.json({
    accessToken,
    refreshToken,
  });
}
