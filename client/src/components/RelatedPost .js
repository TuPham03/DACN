import React, { useEffect, useState } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";

const RelatedPost = ({ newPost }) => {
  const { newPosts, outStandingPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gọi API lấy dữ liệu
  useEffect(() => {
    if (newPost) {
      dispatch(actions.getNewPosts());
    } else {
      dispatch(actions.getOutStandingPost());
    }
  }, [newPost, dispatch]);

  // Cập nhật dữ liệu bài viết
  useEffect(() => {
    console.log("New Posts:", newPosts);
    console.log("Outstanding Posts:", outStandingPost);
    if (newPost) {
      setPosts(newPosts);
    } else {
      setPosts(outStandingPost);
    }
  }, [newPosts, outStandingPost, newPost]);

  // Điều hướng đến chi tiết bài đăng
  const handleNavigateToDetail = (postId, title) => {
    if (!postId || !title) {
      console.error("Thiếu postId hoặc title:", { postId, title });
      alert("Không thể mở chi tiết bài đăng vì thiếu thông tin!");
      return;
    }
    navigate(`${path.DETAIL}${encodeURIComponent(title)}/${postId}`);
  };

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavigateToDetail(item.id, item.title)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <Sitem
              title={item.title || "Không có tiêu đề"}
              price={item?.attributes?.price || "Đang cập nhật"}
              createdAt={item.createdAt || "Không rõ thời gian"}
              image={
                Array.isArray(item.images.image)
                  ? item.images.image
                  : JSON.parse(item.images.image || "[]")
              }
              star={item.star || 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
