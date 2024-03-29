import './AddPost.css';
import useForm from './useForm';
import { useNavigate } from 'react-router-dom';

export default function AddPost({ setError }) {
  const [formData, setFormData] = useForm({ title: '', body: '' });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Something went wrong' + response.status);
      }
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form id="addPost" onSubmit={onSubmit}>
      <label>Title:
        <input name="title" value={formData.title} onChange={setFormData} />
      </label>
      <label>Body
        <textarea name="body" value={formData.body} onChange={setFormData}></textarea>
      </label>
      <button>add Post</button>
    </form>
  )
}