import React, { useState } from 'react';
import { likePost, unlikePost, addComment, deleteComment } from '../api';

function PostCard({ post, user, onPostUpdated }) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const isLiked = post.likes.some(like => like._id === user._id);

    const handleLike = async () => {
        setLoading(true);
        try {
            if (isLiked) {
                const response = await unlikePost(post._id);
                onPostUpdated(response.data.post);
            } else {
                const response = await likePost(post._id);
                onPostUpdated(response.data.post);
            }
        } catch (error) {
            console.error('Error liking post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setLoading(true);
        try {
            const response = await addComment(post._id, commentText);
            setCommentText('');
            onPostUpdated(response.data.post);
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Delete this comment?')) {
            try {
                const response = await deleteComment(post._id, commentId);
                onPostUpdated(response.data.post);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    return (
        <div className="post-card">
            {/* Post Header */}
            <div className="post-header">
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        flexShrink: 0
                    }}
                >
                    {post.user.username.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                    <h6 style={{ margin: '0', color: '#333' }}>{post.user.username}</h6>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#999' }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Post Content */}
            <div className="post-content">
                <p style={{ margin: '0 0 12px 0', color: '#333', lineHeight: '1.5' }}>
                    {post.content}
                </p>
                {post.image && (
                    <img src={post.image} alt="post" className="post-image" />
                )}
            </div>

            {/* Post Stats */}
            <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #eee',
                borderBottom: '1px solid #eee',
                fontSize: '13px',
                color: '#666',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>❤️ {post.likes.length} Likes</span>
                <span>💬 {post.comments.length} Comments</span>
            </div>

            {/* Post Actions */}
            <div className="post-actions">
                <button
                    className={`action-button ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={loading}
                >
                    {isLiked ? '❤️' : '🤍'} Like
                </button>
                <button
                    className="action-button"
                    onClick={() => setShowComments(!showComments)}
                >
                    💬 Comment
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="comments-section">
                    <div style={{ marginBottom: '12px' }}>
                        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '8px 12px',
                                    background: '#667eea',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: 500
                                }}
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Display Comments */}
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment._id} className="comment-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <span className="comment-author">{comment.user.username}</span>
                                        <p style={{ margin: '4px 0 0 0', color: '#666' }}>{comment.text}</p>
                                    </div>
                                    {comment.user._id === user._id && (
                                        <button
                                            onClick={() => handleDeleteComment(comment._id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#999',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#999', fontSize: '12px', margin: 0, textAlign: 'center', padding: '8px' }}>
                            No comments yet
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostCard;
