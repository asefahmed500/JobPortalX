import React from 'react';
import blogs from '../../../../public/blogs.json';

const Page = async ({ params }) => {
    const { slug } = await params; // Ensure `params` is awaited

    // Find the blog based on the slug in params
    const blog = blogs.find((b) => b.slug === slug); // Assuming blogs have a 'slug' field

    if (!blog) {
        return <p className="text-center text-xl mt-4">Blog not found</p>;
    }

    return (
        <div>
            <div>
                <div className="min-h-screen bg-gray-100 p-6">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
                        <p className="text-gray-600 mt-2">{blog.description}</p>

                        <div className="mt-4 text-gray-700">
                            <p><strong>Author:</strong> {blog.author}</p>
                            <p><strong>Published Date:</strong> {new Date(blog.publishedDate).toLocaleDateString()}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800">Full Content</h2>
                            <p className="text-lg text-gray-700 mt-4">{blog.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
