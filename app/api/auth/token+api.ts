import { JWT_EXPIRATION_TIME, JWT_SECRET } from "@/utils/constants";
import * as jose from "jose";

export async function POST(request: Request) {
  const body = (await request.formData()) as any;
  const email = body.get("email") as string;

  if (!email) {
    return Response.json(
      { error: "email tidak boleh kosong" },
      { status: 400 },
    );
  }

  const id = Math.floor(100000 + Math.random() * 900000);

  const data = {
    email: email,
    id: crypto.randomUUID(),
  };

  // Create a new object without the exp property from the original token

  // User id

  // Current timestamp in seconds
  const issuedAt = Math.floor(Date.now() / 1000);

  // Generate a unique jti (JWT ID) for the refresh token
  const jti = crypto.randomUUID();

  // Create refresh token (long-lived)
  const refreshToken = await new jose.SignJWT({
    jti, // Include a unique ID for this refresh token
    type: "refresh",
    ...data,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .setIssuedAt(issuedAt)
    .sign(new TextEncoder().encode(JWT_SECRET));

  // For native platforms, return both tokens in the response body
  return Response.json({
    refreshToken,
  });
}
