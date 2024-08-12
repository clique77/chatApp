import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import { useState } from "react";
import "./sass/app.scss";
import Cookies from "universal-cookie";
import Home from "./components/Home";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(!!cookies.get("authToken"));

  return (
    <Router>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:room" element={<ChatWrapper />} />
          </>
        ) : (
          <Route path="/" element={<Auth setIsAuth={setIsAuth} />} />
        )}
      </Routes>
    </Router>
  );
};

const ChatWrapper = () => {
  const { room } = useParams<{ room: string }>();

  return room ? <Chat room={room} /> : <div>No Room Selected</div>;
};

export default App;
