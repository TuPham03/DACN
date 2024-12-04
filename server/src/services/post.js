import db from "../models";
const { Op, where } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "fbUrl"], // Thêm fbUrl
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });


  export const getPostsLimitService = (
    page,
    { limitPost, order, ...query },
    { priceNumber, areaNumber }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        let offset = !page || +page <= 1 ? 0 : +page - 1;
        const queries = { ...query };
        const limit = +limitPost || +process.env.LIMIT;
        queries.limit = limit;
        if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
        if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
        if (order) queries.order = [order];
  
        const response = await db.Post.findAndCountAll({
          where: {
            ...query,
            vipCost_time: {
            [db.Sequelize.Op.gte] : Date.now()
            }
          },
          raw: true,
          nest: true,
          offset: offset * limit,
          ...queries,
          include: [
            { model: db.Image, as: "images", attributes: ["image"] },
            {
              model: db.Attribute,
              as: "attributes",
              attributes: ["price", "acreage", "published", "hashtag"],
            },
            {
              model: db.User,
              as: "user",
              attributes: ["name", "zalo", "phone", "fbUrl"], // Thêm fbUrl
            },

            {
              model: db.VipCost,
              as : "vipCost",
              attributes: ["id", "top", "html", "name"],
             
            },

            { model: db.Overview, as: "overviews" },
            {
              model: db.Label,
              as: "labelData",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: ["id", "title", "star", "address", "description", "vipCost_time", "createdAt"],
          order: [[{ model: db.VipCost, as: "vipCost" }, "top", "DESC"],
            ["createdAt","DESC"]
        ],
       // logging: console.log,
        });

        let coverNumberTimeToFullDateTime = (timestamp) => {
          const date = new Date(timestamp);

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

const dayOfWeek = daysOfWeek[date.getDay()];
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
const seconds = date.getSeconds().toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
const year = date.getFullYear();

return `${dayOfWeek}, ${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
        }

        response.rows.forEach(e => {
            e.overviews.bonus = e.vipCost.name;
            e.overviews.expired = coverNumberTimeToFullDateTime(e.vipCost_time)
        })
        
      
  
        resolve({
          err: response ? 0 : 1,
          msg: response ? "OK" : "Getting posts is failed.",
          response,
        });
      } catch (error) {
        reject(error);
      }
    });
  

export const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostService = (body, userId, timeSet, vipId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = generateDate();

      let desArr = [];
      let split = body.description.split("\n");


      await db.Post.create({
        vipcost_id : vipId,
        vipCost_time : timeSet,
        id: generateId(),
        title: body.title,
        labelCode,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode,
        description: JSON.stringify(split) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố") ? generateCode(body?.province?.replace("Thành phố ", ""))
          : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
        vipcost_id : body.vipcost,

      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });

      // body.categoryCode

      let nameCat = "Chưa phân loại";
      let getNameCatGory = await db.Category.findOne({
        where: { code : body.categoryCode },
        raw: true,
        attributes: {
        }
      })
      if(getNameCatGory) {
        nameCat = getNameCatGory.value;
      }

      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        type: nameCat, // ?
        target: body?.target,
        bonus: "Tin thường",
        created: currentDate.today,
        expired: currentDate.expireDay,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });

      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });

  export const getPostsLimitAdminService = (page, id, query) =>
    new Promise(async (resolve, reject) => {
      try {
        let offset = !page || +page <= 1 ? 0 : +page - 1;
        const queries = { ...query, userId: id };
  
        const response = await db.Post.findAndCountAll({
          where: queries,
          raw: true,
          nest: true,
          offset: offset * +process.env.LIMIT,
          limit: +process.env.LIMIT,
          order: [["createdAt", "DESC"]],
          include: [
            { model: db.Image, as: "images", attributes: ["image"] },
            {
              model: db.Attribute,
              as: "attributes",
              attributes: ["price", "acreage", "published", "hashtag"],
            },
            {
              model: db.VipCost,
              as : "vipCost",
              attributes: ["id", "top", "html", "name"],
             
            },

            {
              model: db.User,
              as: "user",
              attributes: ["name", "zalo", "phone", "fbUrl"], // Thêm fbUrl
            },
            { model: db.Overview, as: "overviews" },
          ],
        });

        let coverNumberTimeToFullDateTime = (timestamp) => {
          const date = new Date(timestamp);

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

const dayOfWeek = daysOfWeek[date.getDay()];
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
const seconds = date.getSeconds().toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
const year = date.getFullYear();

return `${dayOfWeek}, ${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
        }

        response.rows.forEach(e => {
            e.overviews.bonus = e.vipCost.name;
            e.overviews.expired = coverNumberTimeToFullDateTime(e.vipCost_time)
        })
        
      
  
        resolve({
          err: response ? 0 : 1,
          msg: response ? "OK" : "Getting posts is failed.",
          response,
        });
      } catch (error) {
        reject(error);
      }
    });
  

//update post admin
export const updatePost = ({ postId, overviewId, imagesId, attributesId, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label)
      await db.Post.update({
        title: body.title,
        labelCode,
        address: body.address || null,
        categoryCode: body.categoryCode,
        description: JSON.stringify(body.description) || null,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố") ? generateCode(body?.province?.replace("Thành phố ", ""))
          : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      }, {
        where: { id: postId }
      });
      await db.Attribute.update({
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
      }, {
        where: {
          id: attributesId
        }
      });
      await db.Image.update({
        image: JSON.stringify(body.images),
      }, {
        where: { id: imagesId }
      });
      await db.Overview.update({
        area: body.label,
        type: body?.category,
        target: body?.target,
      }, {
        where: { id: overviewId }
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        default: {
          code: labelCode,
          value: body.label,
        },
      });
      resolve({
        err: 0,
        msg: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });

//delete post admin
export const deletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: {
          id: postId
        }
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "Deleting posts is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });
