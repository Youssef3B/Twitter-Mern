function Banner() {
  return (
    <div className="w-full">
      <div
        className="relative w-full h-[340px]"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute w-36 h-36  rounded-full bottom-[-60px] left-6 border-2 border-black"
          style={{
            backgroundImage: "url('/user.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <button className="float-right my-3 mx-3 border border-black px-4 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-all">
        Edit Profile
      </button>
    </div>
  );
}
export default Banner;
