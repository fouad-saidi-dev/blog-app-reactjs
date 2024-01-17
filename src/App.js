import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/register/register";
import DisplayUsers from "./pages/display/displayUsers";
import DisplayPosts from "./pages/posts/diplay-posts/display-posts";
import AddPost from "./pages/posts/add-post/AddPost";
import EditPost from "./pages/posts/edit-post/edit-post";
import ShowPost from "./pages/posts/show-post/show-post";
import Profile from "./pages/users/profile/user-profile";
import LikeComment from "./components/LikeComment";
import GetPostsUser from "./pages/posts/get-posts-by-user/get-posts-user";
import PostsTag from "./pages/posts/posts-tag/posts-tag";
import Each from "./components/Each";
import TextEditor from "./components/TextEditor";

function App() {
  const isAuthenticed = localStorage.getItem("token") != "null";
  const routes = [
    { path: "users", component: <DisplayUsers /> },
    { path: "add-post", component: <AddPost /> },
    { path: "/edit-post/:postId", component: <EditPost /> },
    { path: "/profile", component: <Profile /> },
    { path: "/posts-user", component: <GetPostsUser /> },
  ];
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        {routes.map((route, index) => (
          <Route
            path={route.path}
            element={
              isAuthenticed ? route.component : <Navigate to={"/login"} />
            }
          ></Route>
        ))}
        <Route path="posts" element={<DisplayPosts />}></Route>
        {"<Route path='add-post' element={<AddPost />}></Route>"}
        {"<Route path='/edit-post/:postId' element={<EditPost />}></Route>"}
        <Route path="/post/:postId" element={<ShowPost />}></Route>
        {"<Route path='/profile' element={<Profile />}></Route>"}
        <Route
          path="/like-comment/:commentId"
          element={<LikeComment />}
        ></Route>
        {"<Route path='/posts-user' element={<GetPostsUser />}></Route>"}
        <Route path="/posts/:tagName" element={<PostsTag />}></Route>
        <Route path="/text-editor" element={<TextEditor />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
