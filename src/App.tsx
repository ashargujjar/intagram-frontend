import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import CreatePost from "./pages/CreatePost";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import PostDetail from "./pages/AddComent";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notification";
import FloatingChat from "./pages/Chatbot";
import VerifyAccount from "./pages/VerifyAccount";
import VerifyToken from "./pages/VerifyToken";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordVerify from "./pages/ForgotPasswordVerify";
import ForgotPasswordReset from "./pages/ForgotPasswordReset";
import FriendRequests from "./pages/FriendRequests";
import SendRequest from "./pages/SendRequest";
import SentRequests from "./pages/SentRequests";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/verify-account/verify" element={<VerifyToken />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/forgot-password/verify"
            element={<ForgotPasswordVerify />}
          />
          <Route
            path="/forgot-password/reset"
            element={<ForgotPasswordReset />}
          />
          <Route path="/friend-requests" element={<FriendRequests />} />
          <Route path="/send-request" element={<SendRequest />} />
          <Route path="/sent-requests" element={<SentRequests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addComment" element={<PostDetail />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <FloatingChat />
      </div>
    </BrowserRouter>
  );
};

export default App;
