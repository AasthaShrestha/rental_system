import asynchHandler from "express-async-handler";
import Rental from "../model/rental.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Order from "../model/order.model.js";
import {
  textToVector,
  normalizeValue,
  getCombinedVector,
  calculateCosineSimilarity,
} from "../utils/utils.function.js";

const getSuggested = asynchHandler(async (req, res) => {
  const numberOfResult = req.query.numberOfResult;
  const type = req.query.type;

  const userRentals = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  //   res.json(new ApiResponse(200, "take it " + req.user._id, userRentals));
  //   return;

  if (userRentals.length == 0) {
    // if user has 0 courses enrolled just suggest the highest rated course.
    const suggestions = await Rental.find().sort({ createdAt: 1 });
    return res.json(new ApiResponse(200, "Suggested Rentals", suggestions));
  } else {
    const latestRental = userRentals[0];
    const rentals = await Rental.find({
      _id: { $ne: latestRental.products[0]?.productId },
    });

    // return res.json(latestRental);
    //   { textVectors: 0 });
    // const courses = await courseModel.find().where('_id').ne(latestCourse.course);

    const allPrices = rentals.map((obj) => obj.price);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const similarities = rentals.map((rental) => {
      const text1 = latestRental.products[0].product;

      const text2 = rental.name;

      const [v1, v2] = textToVector(text1, text2);

      const textSimilarity = calculateCosineSimilarity(v1, v2);

      const parentCategorySimilarity =
        latestRental.parentCategory == rental.parentCategory ? 1 : 0;
      const subCategorySimilarity =
        latestRental.subCategory === rental.subCategory ? 1 : 0;

      const normPriceOfLatestCourse = normalizeValue(
        latestRental.products[0].price,
        minPrice,
        maxPrice
      );
      const normPriceOfCourse = normalizeValue(
        rental.price,
        minPrice,
        maxPrice
      );
      const priceDifference =
        1 - Math.abs(normPriceOfLatestCourse - normPriceOfCourse);

      const weights = {
        text: 0.4,
        price: 0.1,
        parentCategorySimilarity: 0.3,
        subCategorySimilarity: 0.2,
      };

      const overallSimilarity =
        textSimilarity * weights.text +
        subCategorySimilarity * weights.subCategorySimilarity +
        parentCategorySimilarity * weights.parentCategorySimilarity +
        priceDifference * weights.price;

      //   return res.json({ overallSimilarity });

      return {
        ...rental._doc,
        similarity: overallSimilarity,
      };
    });

    const news = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, numberOfResult ?? 5);

    res.json(new ApiResponse(200, "okay", news));
  }
});

export { getSuggested };
