import { useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { GrGallery } from "react-icons/gr";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 transition-all bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-lg relative  ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function Input() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTextAreaChange = (e) => {
    setPostContent(e.target.value);
  };
  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg border shadow-md">
        <div className="flex items-center space-x-1">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/user.jpg"
            alt=""
          />
          <div
            onClick={openModal}
            className="bg-gray-200 w-full rounded-full py-2 px-4 hover:bg-gray-300 cursor-pointer transition-all"
          >
            <p>What do you think?</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-center font-bold text-xl">Create a post</h2>
        <div className="py-4">
          <div className="flex items-center space-x-2">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="/user.jpg"
              alt=""
            />
            <div>
              <h3 className="font-semibold">Youssef Ababou</h3>
              <p className="text-sm text-gray-600">Youssef07</p>
            </div>
          </div>
          {/* TextArea */}
          <div className="my-3">
            {/* <textarea
              className="border w-full px-3 py-2 rounded-md resize-none outline-none"
              rows="4"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={handleTextAreaChange}
              style={{ minHeight: "100px", maxHeight: "300px" }}
            ></textarea> */}
          </div>
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
            background="white"
          />
        </div>

        <div className="float-right cursor-pointer mb-4">
          {/* Hidden file input */}
          <input type="file" ref={fileInputRef} style={{ display: "none" }} />
          {/* Gallery icon */}
          <GrGallery size={24} onClick={handleIconClick} />
        </div>
        <div className="pt-4">
          <img className="rounded-lg" src="/banner.png" alt="" />
        </div>

        <div className="my-4">
          <button className="bg-sky-500 text-white px-8 py-1 rounded-full float-right font-semibold hover:bg-sky-600 transition-all">
            Post
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Input;
