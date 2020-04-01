import React, { useState, useEffect } from "react";
import firebase from "../firebase";

type User = {
  uid?: string;
};

const Component: React.FC<User> = props => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", props.uid)
      .onSnapshot(querySnapshot => {
        const datas: any = [];
        querySnapshot.forEach(doc => {
          datas.push(doc.data());
        });
        setPosts(datas);
      });
  }, [props.uid]);

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
