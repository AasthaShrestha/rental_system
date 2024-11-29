const SearchOption = ({ setSearch }) => {
  return (
    <input
      type="text"
      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search"
      onChange={({ currentTarget: input }) => setSearch(input.value)}
    />
  );
};

export default SearchOption;
