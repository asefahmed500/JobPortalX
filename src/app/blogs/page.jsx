import React from 'react';
import Link from 'next/link';
import blogs from '../../../public/blogs.json';

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Blog List</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <li
              key={blog.slug}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">By {blog.author}</span>
                <span className="text-sm text-gray-500">{blog.publishedDate}</span>
              </div>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
