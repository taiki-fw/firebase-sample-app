import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const Component = () => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot(querySnapshot => {
        const datas: any = [];
        querySnapshot.forEach(doc => {
          datas.push(doc.data());
        });
        setPosts(datas);
      });
  }, []);

  return (
    <div>
      {posts
        ? posts.map(
            (post: { title: string; content: string }, index: number) => (
              <p key={index}>
                {post.title}: {post.content}
              </p>
            )
          )
        : null}
    </div>
  );
};

export default Component;
