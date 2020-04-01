import React, { useState, useEffect } from "react";
import firebase from "../firebase";

type User = {
  uid?: string;
};

const Component: React.FC<User> = props => {
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setMessage("");
  }, [title, content]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(title && content)) {
      setMessage("入力して下さい");
      return;
    }
    firebase
      .firestore()
      .collection("posts")
      .add({
        title,
        content,
        uid: props.uid
      })
      .then(() => {
        setMessage("");
        // 保存出来たら中身を空にする
        setTitle("");
        setContent("");
      })
      .catch(error => {
        setMessage("エラー：入力内容が保存されませんでした");
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <p style={{ backgroundColor: "red", color: "white" }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル：
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <br />
        <p>コンテンツ</p>
        <textarea
          name="content"
          cols={30}
          rows={10}
          value={content}
          placeholder="記載内容"
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};

export default Component;
