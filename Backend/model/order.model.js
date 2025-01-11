import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    payment_method: {
      type: String,
      required: true,
      default: "esewa",
    },
    transaction_code: String,
    amount: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: String,
          required: true,
          default: "Test",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        parentCategory: {
          type: String,
        },
        subCategory: {
          type: String,
        },
        price: {
          type: Number,
        },
        address: {
          type: String,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["created", "paid", "shipping", "delivered"],
      default: "created",
    },
    address: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
