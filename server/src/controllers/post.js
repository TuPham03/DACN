import db from '../models';
import * as postService from '../services/post';

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        });
    }
};
export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber });
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService();
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        let { categoryCode, title, priceNumber, areaNumber, label, vipcost, vipcost_day, vipcost_type } = req.body
        const { id } = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label || !vipcost || !vipcost_day || !vipcost_type  ) return res.status(400).json({
            err: 1,
            msg: "Missing inputs"
        })

        let err = (content) => {
            return res.status(200).json({
                err: 1,
                msg: content
            })
        }

        if(vipcost_type <= 0 || vipcost_type > 3) {
            return err("typed");
        }

        if(vipcost_day <= 0) {
            return err("day");
        }

        let packageT = await db.VipCost.findOne({
            where: { id : vipcost },
            raw: true,
            attributes: {
            }
        })
        if(!packageT) {
            return err("package");
        }


        let cost = 0;
        vipcost_type = vipcost_type >> 0;
        if(vipcost_type === 1) cost = vipcost_day * packageT["day"];
        if(vipcost_type === 2) cost = vipcost_day * packageT["week"];
        if(vipcost_type === 3) cost = vipcost_day * packageT["month"];


        let user = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
            }
        })

        if(!user) {
            return err("user");
        }
        if(user["vnd"] < cost) {
            return err("money");
        }


        let newVnd = user["vnd"] - cost;

        await db.User.update(
            { vnd: newVnd },
            { where: { id } }
          );

        let timeSet = Date.now();
        if(vipcost_type == 1) timeSet+= vipcost_day * 86400 * 1e3; // songay * giay => tinh theo ngay * so ngay
        if(vipcost_type == 2) timeSet+= vipcost_day * (86400 * 1e3)*7; // songay * giay => tinh theo tuan * so tuan
        if(vipcost_type == 3) timeSet+= vipcost_day * (86400 * 1e3)*30; // songay * giay => tinh theo thang * so thang

        const response = await postService.createNewPostService(req.body, id, timeSet, vipcost); // truyen them thoi gian het han voi ID cua goi vip
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const { id } = req.user
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.getPostsLimitAdminService(page, id, query);
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId, overviewId, imagesId, attributesId, ...payload } = req.body
    const { id } = req.user
    try {
        if (!postId || !id || !overviewId || !imagesId || !attributesId) return res.status(400).json({
            err: 1,
            msg: 'Missing postId'
        })
        const response = await postService.updatePost(req.body);
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

//delete post
export const deletePost = async (req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id) return res.status(400).json({
            err: 1,
            msg: 'Missing postId'
        })
        const response = await postService.deletePost(postId);
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}