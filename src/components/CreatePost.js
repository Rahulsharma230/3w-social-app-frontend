import React, { useState } from 'react';
import { createPost } from '../api';

function CreatePost({ user, onPostCreated }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!content.trim()) {
            setError('Please write something...');
            setLoading(false);
            return;
        }

        try {
            const response = await createPost(content, image);
            setContent('');
            setImage('');
            onPostCreated(response.data.post);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-card">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
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
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ flex: 1 }}>
                    <h6 style={{ margin: '0 0 4px 0', color: '#333' }}>{user?.username}</h6>
                    <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>What's on your mind?</p>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <textarea
                    className="create-post-input"
                    placeholder="What's on your mind?"
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="text"
                    className="create-post-input"
                    style={{ marginTop: '12px' }}
                    placeholder="Image URL (optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <div className="create-post-actions">
                    <button
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                        }}
                        title="Add image"
                    >
                        🖼️
                    </button>
                    <button
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                        }}
                        title="Add emoji"
                    >
                        😊
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
