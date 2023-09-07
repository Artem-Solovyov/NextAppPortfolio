"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

// async function getData() {
//   const res = await fetch("http://localhost:3000/api/posts", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Blog = () => {
  // const data = await getData();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, mutate, isLoading } = useSWR(`api/posts`, fetcher);
  const [search, setSearch] = useState("");
  const [post, setPost] = useState(null);
  const [sort, setSort] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      setPost(null);
    } else {
      setPost(data.filter((value) => value.title.toLowerCase().startsWith(e.target.value.toLowerCase())));
    }
  };
  const handleSort = (e) => {
    e.preventDefault();
    data.reverse();
    if (sort) {
      setSort(false);
    } else {
      setSort(true);
    }
  };

  return (
    <div className="blog">
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <>
          <div className="blog__search search">
            <input type="text" placeholder="Search..." className="search__input" onChange={(e) => handleSearch(e)} />

            {post ? (
              <div className="blog__result">
                {post.map((item) => (
                  <Link href={`blog/${item._id}`} className="blog__conteiner blog__conteiner--2" key={item._id}>
                    <div className="blog__image">
                      <Image src={item.img} alt="" width={150} height={100} className="blog__img--2" />
                    </div>
                    <div className="blog__content">
                      <h1 className="blog__title blog__title--2">{item.title}</h1>
                      <p className="blog__desc">{item.desc.slice(0, 22)}...</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <button className="blog__sort " onClick={handleSort}>
            [Sort in reverse]
          </button>
          <div className="blog__items">
            {data.map((item) => (
              <Link href={`blog/${item._id}`} className="blog__conteiner" key={item._id}>
                <div className="blog__image">
                  <Image src={item.img} alt="" className="blog__img" width={400} height={300} />
                </div>
                <div className="blog__content">
                  <h1 className="blog__title">{item.title}</h1>
                  <div className="blog__view">[View and comment]</div>
                  <p className="blog__desc">{item.desc}</p>
                  {item.createdAt === item.updatedAt ? (
                    <div className="blog__info">
                      <h6>Published:</h6>
                      <div className="blog__clock">
                        <p className="blog__day">{item.createdAt.slice(0, 10)}</p>
                        <p className="blog__time">{item.createdAt.slice(11, 16)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="blog__info">
                      <h6>Updated:</h6>
                      <div className="blog__clock">
                        <p className="blog__day">{item.updatedAt.slice(0, 10)}</p>
                        <p className="blog__time">{item.updatedAt.slice(11, 16)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
