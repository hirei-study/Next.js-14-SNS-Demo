import { z } from "zod";

export const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください。" })
    .email()
    .regex(/^[\u0021-\u007e]+$/u, {
      message:
        "メールアドレスの形式に則って入力してください。例: xxx@gmail.com",
    }),
  password: z
    .string()
    .min(5, { message: "パスワードは5文字以上入力してください。" })
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{5,100}$/i, {
      message: "パスワードは半角英数字混合で入力してください。",
    }),
});
