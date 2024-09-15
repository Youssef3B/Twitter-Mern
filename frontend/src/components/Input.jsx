function Input() {
  return (
    <div className="pt-4">
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
            <div>
              <button className="float-right bg-sky-500 px-8 py-2 rounded-full text-white font-bold">
                Tweet
              </button>
              <input type="file" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Input;
