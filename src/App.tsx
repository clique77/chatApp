import { Auth } from "./components/Auth";
import { useState, useRef } from "react";
import "./sass/auth.scss";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get("authToken"));
  const [room, setRoom] = useState<string | null>(null);

  const roomInputRef = useRef<HTMLInputElement | null>(null);

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
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current?.value ?? " ")}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
