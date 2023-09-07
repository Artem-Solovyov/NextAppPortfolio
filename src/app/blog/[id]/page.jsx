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

const postId = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className="post">
      <div className="post__info">
        <div className="post__author">
          <Image src={data.userimage} alt="" width={40} height={40} className="post__avatar" />
          <span className="post__username">{data.username}</span>
        </div>
        {data.createdAt === data.updatedAt ? (
          <div className="post__data">
            <h6>Published</h6>
            <div className="post__clock">
              <p className="post__day">{data.createdAt.slice(0, 10)}</p>
              <p className="post__time">{data.createdAt.slice(11, 16)}</p>
            </div>
          </div>
        ) : (
          <div className="post__data">
            <h6>Updated</h6>
            <div className="post__clock">
              <p className="post__day">{data.updatedAt.slice(0, 10)}</p>
              <p className="post__time">{data.updatedAt.slice(11, 16)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="post__body">
        <div className="post__content">
          <h1 className="post__title">{data.title}</h1>
          <p className="post__desc">{data.desc}</p>
        </div>
        <div className="post__image">
          <Image src={data.img} alt="" fill={true} className="post__img" />
        </div>
      </div>
      <div className="post__description">
        <p className="post__text">{data.content}</p>
      </div>
      <Comments idPost={params.id} />
    </div>
  );
};

export default postId;
