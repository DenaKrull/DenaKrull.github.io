import './Comment.css';
export default function Comment({ comment: { author, body, date } }) {
  return (
    <div className="comments">
      <h2>{body}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()}</h3>
    </div>
  )
}