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
import apiClient from "@/lib/apiClient";
import { formSignUpSchema } from "@/lib/formSignUpSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSignUpSchema>) => {
    const { username, email, password } = value;
    // console.log(username, email, password, passwordConfirm);

    // 新規登録のAPIを叩く
    try {
      await apiClient.post("/auth/register", {
        username,
        email,
        password,
      });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.log("入力内容が正しくありません。: ", error);
    }
  };

  return (
    <div
      style={{ height: "88vh" }}
      className="flex flex-col justify-center sm:px-6 lg:px-8"
    >
      <Head>
        <title>新規作成</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          アカウントを作成
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザー名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ユーザー名"
                        {...field}
                        className="mb-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>確認用パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="確認用パスワード"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  新規登録
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
