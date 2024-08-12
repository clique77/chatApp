import { Auth } from "./components/Auth";
import { useState, useRef } from "react";
import "./sass/app.scss";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get("authToken"));
  const [room, setRoom] = useState<string>("");

  const roomInputRef = useRef<HTMLInputElement>(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("authToken");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <div>
          <Chat room={room} />
        </div>
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current?.value ?? " ")}>
            Enter Chat
          </button>
          <div className="sign-out">
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
