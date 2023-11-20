// import React from "react";

// export const dynamicParams = true;

// type user = {
//   id: string;
//   name: string;
// };

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:8000/getUser");
//   const userData = await res.json();
//   console.log("res", userData);
//   return userData.map((user: user) => ({
//     params: { id: user.id },
//   }));
// }

// // Three versions of this page will be statically generated
// // using the `params` returned by `generateStaticParams`
// // - /product/1
// // - /product/2
// // - /product/3
// export default function Page({ params }: { params: { id: string } }) {
//   const { id } = params;

//   return <div>Product {id}</div>;
//   // ...
// }

// // "use client";
// // import React from "react";
// // import { useParams } from "next/navigation";

// // const Post = () => {
// //   const params = useParams();
// //   console.log("params", params);

// //   return <div>Post</div>;
// // };

// // export default Post;

import Image from "next/image";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }));
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <main className="flex min-h-screen flex-col p-24 space-y-2">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.body}</p>
      {/* <Image alt="turtles" src="/turtles.jpg" width={300} height={300} /> */}
    </main>
  );
}
