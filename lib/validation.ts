import z from "zod";

export const passwordSchema = z
  .string()
  .min(1, { message: "Silahkan masukan password dengan benar" })
  .min(8, { message: "Password harus lebih dari 8 karakter" });
// .regex(/[^A-Za-z0-9]/, {
//   message: "Password harus berisikan spesial karakter",
// });
