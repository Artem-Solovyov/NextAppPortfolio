import Auth from "@/components/Auth/Auth";
import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div className="auth">
      <Auth />
      {children}
    </div>
  );
};

export default layout;
