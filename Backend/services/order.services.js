import Order from "../model/order.model.js";

export const  save = async (order) => {
  if (order && !order._id) {
    order = new Order(order);
  }
  return await order.save();
};

export const  findById = async (id = {}) => {
  return await Order.findById(id);
};

export const getCount = async (id = {}) => {
  return await Order.countDocuments();
};

export const getWhere = async (filter = {}, select, option) => {
  return await Order.find(filter, select, { ...option });
};

export const updateOne = async (filter = {}, update) => {
  return await Order.findOneAndUpdate(filter, update);
};

export const deletes = async (id) => {
  return await Order.deleteOne({
    _id: id,
  });
};