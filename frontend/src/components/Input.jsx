import { GrGallery } from "react-icons/gr";
import { useRef } from "react";

function Input() {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg border shadow-md ">
      <div className="flex items-center space-x-1 ">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src="/user.jpg"
          alt=""
        />
        <div className="bg-gray-200 w-full rounded-full py-2 px-4 hover:bg-gray-300 cursor-pointer transition-all">
          <p>what do you Think ?</p>
        </div>
      </div>
    </div>
  );
}
export default Input;
