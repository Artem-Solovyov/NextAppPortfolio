"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

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
          image: session.data.user.image,
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
      <h2 className="comments__title">Comments</h2>
      {session.status == "authenticated" ? (
        <div className="comments__form">
          <input
            type="text"
            placeholder="Enter your comment..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="comments__input"
          />
          <button onClick={handleSubmit} className="comments__button">
            Commit
          </button>
        </div>
      ) : (
        <div className="comments__none">
          <div className="comments__nocoment">Unfortunately, you cannot comment on posts.</div>
          <Link href="/dashboard/login" className="comments__button">
            LogIn
          </Link>
        </div>
      )}
      <div className="comments__items">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          data.map((comment) => (
            <div className="comments__item item-comment" key={comment._id}>
              <div className="item-comment__body">
                <div className="item-comment__content">
                  {comment.comment}
                  {session?.data?.user.name === comment.author ? (
                    <button className="item-comment__delete comments__button" onClick={() => handleDelete(comment._id)}>
                      Delete
                    </button>
                  ) : null}
                </div>
                <div className="item-comment__data">
                  <div className="item-comment__author">
                    <Image
                      src={comment.image}
                      alt={comment.comment}
                      width={50}
                      height={50}
                      className="item-comment__avatar"
                    />
                    <div className="item-comment__name">{comment.author}</div>
                  </div>
                  <div className="item-comment__clock">
                    <div className="item-comment__day">{comment.createdAt.slice(0, 10)}</div>
                    <div className="item-comment__time">{comment.createdAt.slice(11, 16)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
