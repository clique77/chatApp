import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  const roomInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const enterChat = () => {
    const roomName = roomInputRef.current?.value.trim();
    if (roomName) {
      navigate(`/chat/${roomName}`);
    }
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("authToken");
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="room">
      <label>Enter Room Name</label>
      <input ref={roomInputRef} />
      <button onClick={enterChat}>Enter Chat</button>
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
