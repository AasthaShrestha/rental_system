const SubCategory = ({ subCategory, filterCategory, setFilterCategory }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterCategory, input.value];
      setFilterCategory(state);
    } else {
      const state = filterCategory.filter((val) => val !== input.value);
      setFilterCategory(state);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Filter By SubCategory</h1>
      <div className="space-y-2">
        {subCategory.map((category) => (
          <div className="flex items-center space-x-2" key={category}>
            <input
              className="form-checkbox text-blue-500"
              type="checkbox"
              value={category}
              onChange={onChange}
            />
            <p className="text-gray-700">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
