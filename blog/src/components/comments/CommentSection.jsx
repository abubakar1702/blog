import React, { useState } from "react";

const CommentSection = ({ initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: {
          username: "Anonymous", // Replace with real user if available
        },
        created_at: new Date().toISOString(),
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 p-3 rounded-lg text-sm"
          >
            <p className="font-semibold text-gray-800">
              {comment.author?.username || "Anonymous"}
              <span className="text-xs text-gray-500 ml-2">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="text-gray-700 mt-1">{comment.content}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
