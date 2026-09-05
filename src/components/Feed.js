import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../api';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

// Feed Component - Displays all posts with pagination
function Feed({ user }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 5; // Pagination: 5 posts per page

    // Fetch all posts from backend
    const fetchPosts = async () => {
        try {
            setError('');
            const response = await getAllPosts();
            setPosts(response.data.posts);
            setCurrentPage(1); // Reset to page 1 when fetching
        } catch (err) {
            setError('Error loading posts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle new post creation - add to top of feed
    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
        setCurrentPage(1); // Go to first page
    };

    // Handle post updates (likes/comments)
    const handlePostUpdated = (updatedPost) => {
        setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
    };

    // Pagination Logic
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="container-main">
            <CreatePost user={user} onPostCreated={handlePostCreated} />

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading posts...</div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                    <p>No posts yet. Be the first to post something! 🎉</p>
                </div>
            ) : (
                <>
                    {/* Display paginated posts */}
                    {paginatedPosts.map(post => (
                        <PostCard
                            key={post._id}
                            post={post}
                            user={user}
                            onPostUpdated={handlePostUpdated}
                        />
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '30px',
                            marginBottom: '30px',
                            flexWrap: 'wrap'
                        }}>
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '8px 16px',
                                    background: currentPage === 1 ? '#ddd' : '#667eea',
                                    color: currentPage === 1 ? '#999' : 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                ← Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    style={{
                                        padding: '8px 12px',
                                        background: currentPage === page ? '#667eea' : '#f0f0f0',
                                        color: currentPage === page ? 'white' : '#333',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: currentPage === page ? 'bold' : 'normal',
                                        minWidth: '40px'
                                    }}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '8px 16px',
                                    background: currentPage === totalPages ? '#ddd' : '#667eea',
                                    color: currentPage === totalPages ? '#999' : 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Feed;
