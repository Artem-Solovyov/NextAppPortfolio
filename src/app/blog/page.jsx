import Link from "next/link";
import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className="blog">
      {data.map((item) => (
        <Link
          href={`blog/${item._id}`}
          className="blog__conteiner"
          key={item._id}
        >
          <div className="blog__image">
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className="blog__img"
            />
          </div>
          <div className="blog__content">
            <h1 className="blog__title">{item.title}</h1>
            <p className="blog__desc">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;