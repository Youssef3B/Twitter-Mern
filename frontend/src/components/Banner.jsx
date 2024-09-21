import { useEffect, useRef, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 transition-all bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] p-6 rounded-lg relative">
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
};

function Banner({ UpdateUserFromHisId, id, user, getUserFromHisId }) {
  const [testBanner, setTestBanner] = useState(false);
  const [testAvatar, setTestAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || "/default-avatar.png"
  );
  const [bannerPreview, setBannerPreview] = useState(
    user?.banner || "/default-banner.jpg"
  );

  const [fullName, setFullName] = useState(user?.fullName);
  const [userName, setUserName] = useState(user?.userName);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAvatarClick = () => avatarInputRef.current.click();
  const handleBannerClick = () => bannerInputRef.current.click();

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
      setTestAvatar(true);
    }
  };

  const handleBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setBannerPreview(e.target.result);
      reader.readAsDataURL(file);
      setTestBanner(true);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (fullName) formData.append("fullName", fullName);
    if (userName) formData.append("userName", userName);
    if (email) formData.append("email", email);
    if (bio) formData.append("bio", bio);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (bannerFile) formData.append("banner", bannerFile);

    try {
      await UpdateUserFromHisId(id, formData);
      closeModal();
      getUserFromHisId(id);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className="w-full">
      <div
        className="relative w-full h-[340px] bg-cover bg-center"
        style={{ backgroundImage: `url(/uploads/${user?.banner})` }}
      >
        <div
          className="absolute w-36 h-36 rounded-full bottom-[-60px] left-6 border-2 border-black bg-cover bg-center"
          style={{ backgroundImage: `url(/uploads/${user?.avatar})` }}
        ></div>
      </div>
      <button
        onClick={openModal}
        className="float-right my-3 mx-3 border border-black px-4 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-all"
      >
        Edit Profile
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

          <div className="relative">
            <img
              src={
                testBanner === false
                  ? `/uploads/${user?.banner}`
                  : bannerPreview
              }
              className="w-full h-96 object-cover cursor-pointer hover:opacity-70"
              alt="banner"
              onClick={handleBannerClick}
            />
            <input
              type="file"
              ref={bannerInputRef}
              className="hidden"
              onChange={handleBannerChange}
              accept="image/*"
            />
            <div className="absolute bottom-[-64px] left-4">
              <img
                className="w-32 h-32 object-cover rounded-full border-2 border-black cursor-pointer"
                src={
                  testAvatar === false
                    ? `/uploads/${user?.avatar}`
                    : avatarPreview
                }
                onClick={handleAvatarClick}
                alt="avatar"
              />
              <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="mt-24">
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="text"
                  placeholder="Your full name"
                  defaultValue={user?.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="userName">
                  User Name
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="text"
                  placeholder="Your username"
                  defaultValue={user?.userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="block">
                <label className="block text-lg font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  className="my-1 border outline-none border-black rounded-md font-semibold w-full px-3 py-1"
                  type="email"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <label
              htmlFor="bio"
              className="block my-3 font-medium text-gray-900 text-lg"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              placeholder="Write your bio here..."
              defaultValue={user?.bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <button
              type="submit"
              className="my-4 bg-sky-500 text-white py-2 px-4 rounded-full float-right hover:bg-sky-600 transition-all"
            >
              Update Your Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Banner;
