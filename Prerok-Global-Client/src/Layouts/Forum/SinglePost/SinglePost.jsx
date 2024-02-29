import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt, FaRegShareSquare } from "react-icons/fa";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosPublic } from "../../../api/axiosInstances";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";

const SinglePost = () => {
  const { id: postId } = useParams();
  const { user } = useAuth();
  const [postData, setPostData] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const likePostData = {
    forumId: postId,
    userEmail: user.email,
  };

  const getForumData = () => {
    axiosPublic.get(`api/forum/get-forum/${postId}`).then((res) => {
      setPostData(res.data);
    });
  };
  const handleLikeForum = () => {
    console.log(likePostData);
    axiosPublic
      .post("api/forum/like-forum", likePostData)
      .then((res) => console.log(res.data));
  };
  const handleCommentSubmit = () => {
    console.log("Comment submitted:", commentInput);
    axiosPublic
      .post("api/forum/add-comment", {
        forumId: postId,
        userEmail: user.email,
        comment: commentInput,
      })
      .then((res) => console.log(res.data));
    getForumData();
    setCommentInput("");
  };
  useEffect(() => {
    getForumData();
  }, [getForumData]);
  return (
    <div className="border border-[#f5ab35] w-full lg:w-6/12 mx-auto mt-2 mb-4 pt-2 pb-3 shadow-xl p-4 h-full my-3">
      <div className="overflow-hidden h-full">
        <h4 className="text-xl font-semibold">{postData?.title}</h4>
        <div className="flex gap-8 border-2 border-blue justify-start py-2">
          <h6>
            Posted On:{" "}
            <span className="font-semibold">
              {format(
                new Date(
                  postData?.createdAt || "2024-02-08T14:10:44.361+00:00"
                ),
                "MMM dd, yyyy"
              )}
            </span>{" "}
            by <span className="font-semibold">{postData?.author}</span>
          </h6>
        </div>
        <img
          src={
            postData?.thumbnail
              ? postData?.thumbnail
              : "https://i.ibb.co/XpHLjb0/class-thumbnail-10.jpg"
          }
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <p className="text-justify py-6">{postData?.content}</p>
      </div>
      <div className="flex gap-4 text-lg font-bold pt-2">
        <button
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-yellow-400"
          onClick={handleLikeForum}
        >
          <AiOutlineLike /> Like {postData?.likes?.length}
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-yellow-400">
          <FaRegCommentAlt /> Comment
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-yellow-400">
          <FaRegShareSquare /> Share
        </button>
      </div>

      <div>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add your comment..."
          className="border border-gray-300 rounded-lg w-full p-2 mt-4"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-2"
        >
          Submit Comment
        </button>
      </div>
      {postData?.comments?.map((comment) => (
        <div key={comment._id}>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default SinglePost;
