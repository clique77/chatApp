import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  Timestamp,
  FieldValue,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../sass/chat.scss";

interface ChatProps {
  room: string;
}

interface Message {
  text: string;
  createdAt: Timestamp | null;
  user: string | null | undefined;
  room: string;
  id?: string;
}

export const Chat: React.FC<ChatProps> = ({ room }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt ? (data.createdAt as Timestamp) : null,
        } as Message);
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    const message = {
      text: newMessage,
      createdAt: serverTimestamp() as FieldValue,
      user: auth.currentUser?.displayName,
      room: room,
    };

    await addDoc(messagesRef, message);
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to {room}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}:</span>
            <p>{message.text}</p>
            <small>
              {message.createdAt
                ? message.createdAt.toDate().toLocaleString().slice(10, 22)
                : "No date available"}
            </small>
          </div>
        ))}
      </div>
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
