import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./init";
import React from "react";

export async function createPost() {
  const post = {
    title: "Land a $400k job",
    description: "Finish Frontend Simplified",
  };

  await addDoc(collection(db, "posts"), post);
}

export async function getAllPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = querySnapshot.docs.map((doc) => doc.data());
  console.log(posts);
  return posts;
}

function Post() {
  return (
    <div>
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
    </div>
  );
}

export default Post;