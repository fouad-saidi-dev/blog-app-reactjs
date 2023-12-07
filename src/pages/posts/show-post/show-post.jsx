import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import postApi from '../../../services/posts/post-api';
import postService from '../../../services/posts/post.service';

const ShowPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch post details using postApi.showPost
    postService.showPost(postId)
      .then((res) => {
        setPost(res.data);
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography color="text.secondary">
          {post.description}
        </Typography>
        <Typography color="text.secondary">
          {post.body}
        </Typography>
        <Button variant="contained" color="primary">
          Edit Post
        </Button>
        <Button variant="contained" color="secondary">
          Delete Post
        </Button>

        {post.comments && post.comments.length > 0 && (
          <div>
            <h2>Comments</h2>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default ShowPost;
