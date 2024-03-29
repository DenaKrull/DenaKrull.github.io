import { useState } from "react";

export default function AddComment({ id, endCommenting, setError }) {
  const [commentBody, setCommentBody] = useState('');
  const addComment = async (e) => {
    try {
      const response = await fetch(`/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: commentBody })
      });
      if (!response.ok) {
        throw new Error('Something went wrong' + response.status);
      }
      endCommenting();
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div>
      <input name="body" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
      <button onClick={addComment}>add</button>
      <button onClick={endCommenting}>cancel</button>
    </div>
  )
}
