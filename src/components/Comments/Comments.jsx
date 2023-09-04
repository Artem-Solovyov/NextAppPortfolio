"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

const Comments = ({ idPost }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, mutate, isLoading } = useSWR(`/api/comments?post=${idPost}`, fetcher);

  const session = useSession();
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          idPost,
          comment: value,
          author: session.data.user.name,
        }),
      });
      mutate();
      setValue("");
    } catch (error) {}
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comments">
      {session.status == "authenticated" ? (
        <div className="comments__form">
          <input
            type="text"
            placeholder="Enter your comment..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="comments__input"
          />
          <button onClick={handleSubmit}>Commit</button>
        </div>
      ) : (
        <div className="comments__nocoment">
          <span>Нажаль ви не можете коментувати пости. Пройдіть авторизацію</span>
          <Link href="/dashboard/login">LogIn</Link>
        </div>
      )}

      <div className="comments__items">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          data.map((comment) => (
            <div className="comments__item item-comment" key={comment._id}>
              <div className="item-comment__content">{comment.comment}</div>
              <div className="item-comment__author">{comment.author}</div>
              <div className="item-comment__day">{comment.createdAt.slice(0, 10)}</div>
              <div className="item-comment__time">{comment.createdAt.slice(11, 16)}</div>

              {session?.data?.user.name === comment.author ? (
                <button className="item-comment__delete" onClick={() => handleDelete(comment._id)}>
                  Delete
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
