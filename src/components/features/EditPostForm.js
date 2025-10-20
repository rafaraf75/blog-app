import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { getPostById, updatePost } from '../../redux/postsRedux';
import PostForm from './PostForm';

const EditPostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector(state => getPostById(state, id));

  // jeśli ID niepoprawne → wróć na Home
  if (!post) return <Navigate to="/" />;

  const handleSubmit = (formValues) => {
    // dopinamy ID z adresu i wysyłamy aktualizację
    dispatch(updatePost({ ...formValues, id }));
    navigate('/'); // po edycji wracamy na stronę główną (zgodnie z zadaniem)
  };

  return (
    <PostForm
      action={handleSubmit}
      actionText="Edit post"
      // startowe wartości pól
      title={post.title}
      author={post.author}
      publishedDate={post.publishedDate}
      shortDescription={post.shortDescription}
      content={post.content}
    />
  );
};

export default EditPostForm;