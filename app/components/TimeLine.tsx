"use client";

// import React, { useEffect, useState } from "react";
// import Posts from "./Posts";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { z } from "zod";
// import { useRouter, redirect } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import apiClient from "@/lib/apiClient";
// import { Button } from "@/components/ui/button";
// import { PostProps } from "../types/types";

// type Params = { userId: string };

// export const formContentSchema = z.object({
//   content: z.string().min(1, { message: "投稿内容を入力してください。" }),
// });

// const getData = async ({ params }: { params: Params }) => {
//   const res = await fetch(
//     `${process.env.BASE_URL}/users/profile/${params.userId}`,
//     {
//       cache: "no-cache",
//     }
//   );

//   return await res.json();
// };

// const TimeLine = () => {
//   const router = useRouter();
//   const [latestPosts, setLatestPosts] = useState<PostProps[]>([]);
//   const form = useForm({
//     resolver: zodResolver(formContentSchema),
//     defaultValues: {
//       content: "",
//     },
//   });

//   // getData({ params: { userId: params.userId } });

//   const fetchLatestPosts = async () => {
//     try {
//       const res = await apiClient.get("/posts/get_latest_posts");
//       setLatestPosts(res.data);
//       router.replace("/");
//       router.refresh();
//     } catch (error) {
//       console.log("エラーです。 : ", error);
//     }
//   };

//   const onSubmit = async (value: z.infer<typeof formContentSchema>) => {
//     const { content } = value;

//     // PostsのAPIを叩く
//     try {
//       const newPost = await apiClient.post("/posts/post", {
//         content,
//       });

//       // prevPost・・・前のPostデータ
//       // 下記の書き方は、prevPostsの配列にnewPost.dataを追加するという意味
//       setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);

//       // 投稿が成功したら最新の投稿を再取得する
//       await fetchLatestPosts();

//       router.replace("/");
//       router.refresh();
//       // window.location.reload();
//     } catch (error: any) {
//       console.log("エラーです。 : ", error);
//       alert("ログインしてください。");

//       router.replace("/login");
//       router.refresh();
//     }
//   };

//   useEffect(() => {
//     fetchLatestPosts();

//     router.replace("/");
//     router.refresh();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main className="container mx-auto py-4">
//         <div className="bg-white shadow-md rounded p-4 mb-4">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <FormField
//                 control={form.control}
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="mt-4">投稿内容</FormLabel>
//                     <FormControl>
//                       <Textarea placeholder="投稿内容" {...field}></Textarea>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
//               >
//                 投稿
//               </Button>
//             </form>
//           </Form>
//         </div>
//         {latestPosts.map((post: PostProps, index) => (
//           // <Posts key={post.newPost.id} post={post} />
//           <Posts key={index} post={post} />
//         ))}
//       </main>
//     </div>
//   );
// };

// export default TimeLine;

import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useRouter } from "next/navigation"; // import router only from next/navigation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { PostProps } from "../types/types";

const formContentSchema = z.object({
  content: z.string().min(1, { message: "投稿内容を入力してください。" }),
});

const TimeLine = () => {
  const router = useRouter();
  const [latestPosts, setLatestPosts] = useState<PostProps[]>([]);
  const form = useForm({
    resolver: zodResolver(formContentSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    fetchLatestPosts(); // Fetch latest posts when component mounts
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const res = await apiClient.get("/posts/get_latest_posts");
      setLatestPosts(res.data);
    } catch (error) {
      console.log("エラーです。 : ", error);
    }
  };

  const onSubmit = async (value: z.infer<typeof formContentSchema>) => {
    const { content } = value;
    try {
      const newPost = await apiClient.post("/posts/post", { content });
      setLatestPosts([newPost.data, ...latestPosts]); // Update latest posts with the new one
      fetchLatestPosts(); // Fetch latest posts again after posting
      router.replace("/");
    } catch (error: any) {
      console.log("エラーです。 : ", error);
      alert("ログインしてください。");
      router.replace("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">投稿内容</FormLabel>
                    <FormControl>
                      <Textarea placeholder="投稿内容" {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
              >
                投稿
              </Button>
            </form>
          </Form>
        </div>
        {latestPosts.map((post: PostProps, index) => (
          <Posts key={index} post={post} />
        ))}
      </main>
    </div>
  );
};

export default TimeLine;
