import React from "react";
import { PostProps } from "../types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: PostProps;
};

const Posts = (props: Props) => {
  const { post } = props;

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          {post.author && post.author.profile ? (
            <Link href={`/profile/${post.authorId}`}>
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={post.author.profile.profileImageUrl}
                alt="プロフィール画像"
              />
            </Link>
          ) : (
            <Link href={`/profile/${post.authorId}`}>
              <img
                className="w-10 h-10 rounded-full mr-2"
                src=""
                alt="プロフィール画像"
              />
            </Link>
          )}
          <div>
            <h2 className="font-semibold text-md">
              {/* {post.newPost.author?.username} */}
              {post.author?.username}
            </h2>
            {/* <p className="text-gray-500 text-sm">{post.newPost.createdAt}</p> */}
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {/* <p className="text-gray-700">{post.newPost.content}</p> */}
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Posts;
