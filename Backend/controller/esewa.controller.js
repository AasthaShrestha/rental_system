// esewa.controller.js

import orderModel from "../model/order.model.js";
import Rental from "../model/rental.model.js";
import { createSignature } from "./order.controller.js";
import userModel from "../model/user.model.js";
import crypto from "crypto";

export const handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "error" });
    }

    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => {
        return field == "total_amount"
          ? `${field}=${decodedData[field].replace(",", "")}`
          : `${field}=${decodedData[field]}`;
      })
      .join(",");

    const signature = createSignature(message);

    if (signature !== decodedData.signature) {
      return res.json({ message: "integrity error" });
    }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;

    // console.log(req.transaction_uuid,req.transaction_code)
    const selectedOrder = await orderModel.findOne({ _id: req.transaction_uuid })
    const selectedRental = await Rental.findOne({ _id: selectedOrder.products[0].productId })
    selectedRental.occupied = true;
    selectedRental.orderId = req.transaction_uuid;
    await selectedRental.save();

    const selectedUser = await userModel.findOne({ _id: selectedOrder.user })
    // const payload = 'abcd'
    const payload = `${selectedRental.name};;${selectedRental.address};;${selectedRental.price};;${selectedOrder.products[0].startDate};;${selectedOrder.products[0].endDate}`
    const sign = crypto.createSign('SHA256')
    sign.update(payload)
    sign.end()
    let privateKey = crypto.createPrivateKey({
      key: Buffer.from(selectedUser.privateKey, 'base64'),
      type: 'pkcs8',
      format: 'der',
    })
    const DocSignature = sign.sign(privateKey).toString('base64')
    selectedOrder.signature = DocSignature
    selectedOrder.payload = payload
    await selectedOrder.save();
    console.log(selectedUser.publicKey)
    console.log(selectedUser.privateKey)
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};