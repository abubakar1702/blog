import React, { useState } from 'react';

// Using placeholder images since we can't access the imported assets
const pic1 = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop";
const pic2 = "https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=800&h=600&fit=crop";
const pic3 = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop";

const articles = [
  {
    title: "The Mental Health Benefits Backed by Science",
    image: pic1,
    date: "February 24, 2025",
    category: "Health"
  },
  {
    title: "How Climate Change is Impacting Global Health",
    image: pic2,
    date: "February 24, 2025",
    category: "World"
  },
  {
    title: "Breaking Down the Latest Nutritional Guidelines",
    image: pic3,
    date: "February 24, 2025",
    category: "Health"
  },
  {
    title: "The Role of Sleep in Immune System Support",
    image: pic1,
    date: "February 24, 2025",
    category: "Health"
  },
];

const TopStories = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const featuredArticle = {
    title: "Understanding the Human Brain: New Insights from Neuroscience",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
    date: "February 24, 2025",
    category: "Science"
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Row */}
      <div className="flex justify-between items-center border-b pb-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-red-600 pl-3">
          Top Stories
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-red-600 hover:underline flex items-center space-x-1"
        >
          <span>View All</span>
          <span>→</span>
        </a>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Featured Article */}
        <div className="lg:col-span-2">
          <div className="relative group cursor-pointer">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-80 object-cover rounded"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="text-xs font-bold text-red-400 uppercase mb-2">
                {featuredArticle.category}
              </p>
              <h3 className="text-2xl font-semibold leading-snug mb-2">
                {featuredArticle.title}
              </h3>
              <p className="text-xs text-gray-300">{featuredArticle.date}</p>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-red-600 text-white p-6 rounded h-fit">
          <p className="text-xs font-bold uppercase tracking-wide mb-4">NEVER MISS A HEADLINE!</p>
          <h3 className="text-xl font-semibold mb-4 leading-snug">
            Subscribe to our newsletter for daily updates.
          </h3>
          <p className="text-sm mb-6 text-red-100">
            Get the latest stories delivered straight to your inbox.
          </p>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 bg-white text-sm"
            />
            <button
              onClick={handleSubscribe}
              className="w-full bg-gray-900 text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <div key={index}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover rounded"
            />
            <div className="mt-3">
              <p className="text-xs font-bold text-red-600 uppercase">{article.category}</p>
              <h3 className="mt-1 text-sm font-semibold text-gray-900 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{article.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopStories;