const Table = ({ rooms }) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-3 text-center font-semibold bg-gray-100 p-4 rounded-md mb-4">
        <p className="text-gray-700">Name</p>
        <p className="text-gray-700">SubCategory</p>
        <p className="text-gray-700">Price</p>
      </div>
      {rooms.map((room) => (
        <div
          className="grid grid-cols-3 items-center text-center p-4 border-b last:border-none"
          key={room._id}
        >
          <div className="flex items-center gap-4">
            <img
              src={room.image}
              alt="rooms"
              className="w-12 h-12 object-cover rounded-md"
            />
            <p className="text-gray-800 font-medium">{room.name}</p>
          </div>
          <div className="flex justify-center gap-1 text-gray-600">
            {room.subCategory.map((subCategory, index) => (
              <p key={subCategory}>
                {subCategory}
                {index !== room.subCategory.length - 1 && "/"}
              </p>
            ))}
          </div>
          <div className="text-gray-800 font-medium">
            <span className="text-gray-500">RS.</span> {room.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
