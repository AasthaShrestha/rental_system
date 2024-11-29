const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <button
            onClick={() => onClick(index)}
            className={`px-4 py-2 border rounded-md ${
              page === index + 1
                ? "bg-blue-500 text-white font-semibold"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 transition duration-300 ease-in-out`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
