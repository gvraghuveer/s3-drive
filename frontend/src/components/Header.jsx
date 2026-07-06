import { Cloud } from "lucide-react";

function Header({ title }) {
  return (
    <div className="text-center mb-10">
      <div className="flex justify-center items-center gap-4">
        <Cloud size={50} className="text-(--mint)" />
        <h1 className="text-5xl font-bold text-white">{title}</h1>
      </div>
      <p className="text-(--mint) mt-4 text-xl">
        Store, upload and manage your files.
      </p>
    </div>
  );
}

export default Header;
