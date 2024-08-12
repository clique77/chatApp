import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../sass/chat.scss";

interface ChatProps {
  room: string;
}

interface Message {
  text: string;
  createdAt: ReturnType<typeof serverTimestamp>;
  user: string | null | undefined;
  room: string;
}

export const Chat: React.FC<ChatProps> = ({ room }) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      console.log("New message");
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message: Message = {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room: room,
    };

    if (newMessage === "") {
      return;
    } else {
      await addDoc(messagesRef, message);

      setNewMessage("");
    }
  };

  return (
    <div className="chat-app">
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="type your message here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
