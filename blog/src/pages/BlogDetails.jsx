import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import default_pfp from "../assets/Default_pfp.jpg";
import CommentSection from "../components/comments/CommentSection";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const BlogDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/blogs/slug/${slug}/`
        );
        setArticle(res.data);
        setLikeCount(res.data.total_likes || 0);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlogDetails();
  }, [slug]);

  const handleBookmark = async () => {
    setIsBookmarked((prev) => !prev);
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/blogs/${article.id}/bookmark/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
    } catch (error) {
      setIsBookmarked((prev) => !prev);
      console.error("Error bookmarking post:", error);
    }
  };


  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/blogs/${article.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
    } catch (error) {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error("Error liking post:", error);
    }
  };

  if (!article) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          {article.category?.map((cat) => (
            <span
              key={cat.id}
              className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mr-2"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-6">
          {/* Author info: picture, name, date */}
          <div className="flex items-center mb-4 sm:mb-0 space-x-4">
            <img
              src={article.author?.profile_picture || default_pfp}
              alt={article.author?.full_name || article.author?.email}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = default_pfp;
              }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <p className="font-semibold text-gray-900 whitespace-nowrap">
                {article.author?.full_name || article.author?.email}
              </p>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* bookmark button */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full border transition-colors ${
                isBookmarked
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-red-600 hover:text-red-600"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* View Count and Likes */}
      <div className="text-sm text-gray-500 mb-12 flex items-center space-x-6">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 focus:outline-none"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? (
            <IoMdHeart className="text-red-600 w-5 h-5" />
          ) : (
            <IoMdHeartEmpty className="text-gray-400 w-5 h-5" />
          )}
          <span>{likeCount}</span>
        </button>
        <div>
          <span className="ml-2">Views: {article.view_count}</span>
        </div>
      </div>

      <CommentSection initialComments={article.comments || []} />
    </div>
  );
};

export default BlogDetails;
