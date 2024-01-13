import { React, useEffect, useState } from "react";
import postApi from "../../../services/posts/post-api";
import PostsComponent from "../../../components/PostsComponent";


export default function DisplayPosts(params) {
  const [posts, setPosts] = useState([]);

  const displayPosts = () => {
     postApi.getPosts(setPosts)
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return(
    <>
    <PostsComponent posts={posts} />
    </>
  )
}
