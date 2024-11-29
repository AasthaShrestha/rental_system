const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <p className="text-lg font-semibold">Sort By :</p>
      <select
        onChange={onSelectChange}
        className="px-4 py-2 border rounded-md text-gray-700"
        defaultValue={sort.sort}
      >
        <option value="price">Price</option>
      </select>
      <button
        className="flex flex-col justify-center items-center p-2"
        onClick={onArrowChange}
      >
        <p className={`text-xl ${sort.order === "asc" ? "block" : "hidden"}`}>
          &uarr;
        </p>
        <p className={`text-xl ${sort.order === "desc" ? "block" : "hidden"}`}>
          &darr;
        </p>
      </button>
    </div>
  );
};

export default Sort;
