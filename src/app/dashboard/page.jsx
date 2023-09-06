"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session.data);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, mutate, isLoading } = useSWR(`api/posts?username=${session?.data?.user.name}`, fetcher);

  if (session.status == "unauthenticated") {
    router?.push("/dashboard/login");
  }
  if (session.status == "loading") {
    return <h3>Loading...</h3>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value ? e.target[0].value : "Заголовок відсутній";
    const desc = e.target[1].value ? e.target[1].value : "Опис відсутній.";
    const img = e.target[2].value
      ? e.target[2].value
      : "https://thumbs.dreamstime.com/z/%D1%83%D1%81%D0%B8%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D1%85%D0%B0%D1%80%D0%B0%D0%BA%D1%82%D0%B5%D1%80-d-%D1%80%D1%8F%D0%B4%D0%BE%D0%BC-%D1%81-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%BC-%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%BC-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%BC-%D0%BE%D1%82%D1%81%D1%83%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0-112268879.jpg?w=768";
    const content = e.target[3].value ? e.target[3].value : " ";

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
          userimage: session.data.user.image,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status == "authenticated") {
    return (
      <div className="dashboard">
        <div className="dashboard__posts">
          {isLoading
            ? "Loading..."
            : data?.map((post) => (
                <div className="dashboard__post" key={post._id}>
                  <div className="dashboard__image">
                    <Image src={post.img} alt={post.title} width={200} height={200} className="dashboard__img" />
                  </div>
                  <h2 className="dashboard__post-title">{post.title}</h2>
                  <div className="dashboard__delete" onClick={() => handleDelete(post._id)}>
                    X
                  </div>
                  <Link href={`/dashboard/edit/${post._id}`} className="dashboard__edit">
                    Редагувати
                  </Link>
                </div>
              ))}
        </div>
        <form className="dashboard__new" onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className="dashboard__input" />
          <input type="text" placeholder="Desc" className="dashboard__input" />
          <input type="text" placeholder="Image" className="dashboard__input" />
          <textarea cols="30" rows="10" className="dashboard__textarea" />
          <button className="dashboard__button"> Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
