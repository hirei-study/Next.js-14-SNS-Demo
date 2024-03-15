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
import { formLoginSchema } from "@/lib/formLoginSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter, redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
