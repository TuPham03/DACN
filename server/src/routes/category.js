import express from "express";
import * as controllers from "../controllers/category";

const router = express.Router();


import db from "../models";


const GetListTypeVip = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.VipCost.findAll({
        raw: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get categories.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

  const getCategories = async (req, res) => {
    try {
      const response = await GetListTypeVip();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at category controller: " + error,
      });
    }
  };

router.get("/all", controllers.getCategories);
router.get("/package", getCategories);


export default router;
