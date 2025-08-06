import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 duration-300 cursor-pointer"
      style={{
        color: "#5044e5",
        // backgroundColor: "rgba(80, 68, 229, 0.2)",
      }}
    >
      <img src={image} alt="" className="aspect-video" />
      <span
        className="ml-5 mt-4 px-3 py-1 inline-block rounded-full text-xs"
        style={{
          color: "#5044e5", // text color
          backgroundColor: "rgba(80, 68, 229, 0.2)", // background color with 20% opacity
        }}
      >
        {category}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{"__html": description.slice(0, 80)}} ></p>
      </div>
    </div>
  );
};

export default BlogCard;
