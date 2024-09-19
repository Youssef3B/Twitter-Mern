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
    <div className="py-4 border-2 p-4 rounded-lg">
      <div className="grid grid-cols-8">
        <div className="col-span-1">
          <img
            className="h-16 w-16 rounded-full object-cover object-center"
            src="/user.jpg"
            alt=""
          />
        </div>
        <div className="col-span-7">
          <form action="">
            <textarea
              className="border-none outline-none w-full h-28"
              name="post"
              id="post"
              placeholder="What's happening"
            ></textarea>

            <div className="float-right flex items-center space-x-3 ">
              <div>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />

                {/* Icon that acts as the file input trigger */}
                <div className="cursor-pointer" onClick={handleIconClick}>
                  <GrGallery size={22} />
                </div>
              </div>
              <button className=" bg-sky-500 px-8 py-2 rounded-full text-white font-bold">
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Input;
