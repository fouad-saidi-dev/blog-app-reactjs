import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Navbar from './components/Navbar'
import Register from './pages/register/register';
import DisplayUsers from './pages/display/displayUsers';
import DisplayPosts from './pages/posts/diplay-posts/display-posts';
import AddPost from './pages/posts/add-post/AddPost';
import EditPost from './pages/posts/edit-post/edit-post';
import ShowPost from './pages/posts/show-post/show-post';
import Profile from './pages/users/profile/user-profile';
import LikeComment from './components/LikeComment';
import GetPostsUser from './pages/posts/get-posts-by-user/get-posts-user';
import PostsTag from './pages/posts/posts-tag/posts-tag';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='users' element={<DisplayUsers />}></Route>
        <Route path='posts' element={<DisplayPosts />}></Route>
        <Route path='add-post' element={<AddPost />}></Route>
        <Route path='/edit-post/:postId' element={<EditPost />}></Route>
        <Route path='/post/:postId' element={<ShowPost />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/like-comment/:commentId' element={<LikeComment />}></Route>
        <Route path='/posts-user' element={<GetPostsUser />}></Route>
        <Route path='/posts/:tagName' element={<PostsTag />}></Route>
      </Routes>
    </Router>
    );
}

export default App;
