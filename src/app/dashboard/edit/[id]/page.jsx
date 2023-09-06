"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Edit = ({ params }) => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR(`/api/posts/${params.id}`, fetcher);

  const [title, setTitle] = useState(data?.title);
  const [desc, setDesc] = useState(data?.desc);
  const [area, setArea] = useState(data?.content);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTitle(data?.title);
    setDesc(data?.desc);
    setArea(data?.content);
  }, [isLoading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          desc,
          img: data.img,
          content: area,
          username: data.username,
          userimage: data.userimage,
        }),
      });
      setLoading(false);
      router?.push("/dashboard");

      mutate();
      // e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status == "unauthenticated") {
    router?.push("/dashboard/login");
  }
  if (session.status == "loading") {
    return <h3>Loading...</h3>;
  }
  if (session.status == "authenticated") {
    if (!isLoading) {
      return (
        <form className="dashboard__new" onSubmit={handleUpdate}>
          <h1>Edit Post</h1>
          <div className="dashboard__image--02">
            <Image src={data.img} alt={data.title} width={200} height={200} className="dashboard__img--02" />
            <div className="dashboard__img-text">Нажаль ви не зможете змінити зображення.</div>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="dashboard__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Desc"
            className="dashboard__input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {/* <input type="text" placeholder="Image" className="dashboard__input" /> */}
          <textarea
            cols="30"
            rows="10"
            className="dashboard__textarea"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <button className="dashboard__button">Оновити</button>
        </form>
      );
    } else {
      return <h3>Loading...</h3>;
    }
  }
};

export default Edit;
