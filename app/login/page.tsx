"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import apiClient from "@/lib/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter, redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
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

const Login = () => {
  const router = useRouter();
  let redirectRequested = false;
  const form = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();

  const onSubmit = async (value: z.infer<typeof formLoginSchema>) => {
    const { email, password } = value;

    // ログインのAPIを叩く
    try {
      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      //   console.log(token);
      login(token);

      // console.log(res.status);

      if (res.status === 200) {
        redirectRequested = true;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      alert("メールアドレスかパスワードが間違っています。");
      console.log("エラーです。 : ", error);
    }
  };

  if (redirectRequested) {
    redirect("/");
  }

  return (
    <div
      style={{ height: "88vh" }}
      className="flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <Head>
        <title>ログイン</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          アカウントにログイン
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="メールアドレス" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="パスワード"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div> */}

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ログイン
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
