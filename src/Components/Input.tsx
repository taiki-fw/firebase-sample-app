import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const Component = () => {
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
        content
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        setMessage("");
        // 保存出来たら中身を空にする
        setTitle("");
        setContent("");
      })
      .catch(function(error) {
        setMessage("エラー：入力内容が保存されませんでした");
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <p style={{ backgroundColor: "red", color: "white" }}>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <textarea
          name="content"
          cols={30}
          rows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};

export default Component;
