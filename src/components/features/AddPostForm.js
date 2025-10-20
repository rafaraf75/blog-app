import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../../redux/postsRedux';
import PostForm from './PostForm';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // post ma pola: { title, author, publishedDate, shortDescription, content }
  const handleSubmit = (post) => {
    // dodajemy ID po stronie akcji/reducera lub tutaj —
    // jeśli w reducerze nie generujesz ID, to możesz zrobić:
    // const withId = { id: Date.now().toString(), ...post };
    // dispatch(addPost(withId));
    dispatch(addPost(post));
    navigate('/');
  };

  return <PostForm action={handleSubmit} actionText="Add post" />;
};

export default AddPostForm;