import Link from "next/link";

const Button = ({ text, url }) => {
  return (
    <Link href={url}>
      <button className="button">
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default Button;
