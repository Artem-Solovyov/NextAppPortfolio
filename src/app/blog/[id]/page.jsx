import Comments from "@/components/Comments/Comments";
import Image from "next/image";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogId = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className="post">
      <div className="post__top">
        <div className="post__info">
          <h1 className="post__title">{data.title}</h1>
          <p className="post__desc">{data.desc}</p>
          <div className="post__author">
            <Image src={data.userimage} alt="" width={40} height={40} className="post__avatar" />
            <span className="post__username">{data.username}</span>
          </div>
        </div>
        <div className="post__image">
          <Image src={data.img} alt="" fill={true} className="post__img" />
        </div>
      </div>
      <div className="post__content">
        <p className="post__text">{data.content}</p>
      </div>
      <Comments idPost={params.id} />
    </div>
  );
};

export default BlogId;
