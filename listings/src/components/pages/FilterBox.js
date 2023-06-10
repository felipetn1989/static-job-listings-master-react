import closeIcon from "../images/icon-remove.svg";

export default function FilterBox({ tags, clearAll, clearFilter }) {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-md mt-[-5.75rem] mb-4">
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center">
            <span className="bg-[#eef6f6] text-[#5ba4a4] font-bold px-2 py-1 rounded-l-md">
              {tag}
            </span>
            <button onClick={() => clearFilter(tag)} >
              <img
                className="bg-[#5ba4a4] p-[0.5625rem] rounded-r-md hover:cursor-pointer hover:bg-[#2c3a3a]"
                src={closeIcon}
                alt="CloseIcon"
              />
            </button>
          </div>
        ))}
      </div>
      <span
        onClick={clearAll}
        className="font-bold text-[#7b8e8e] hover:text-[#5ba4a4] hover:text-decoration-line:underline hover:cursor-pointer hover:underline translate-x-[-0.4375rem]"
      >
        Clear
      </span>
    </div>
  );
}
