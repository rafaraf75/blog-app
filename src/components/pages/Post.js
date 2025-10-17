import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostById } from '../../redux/postsRedux';
import { Button } from 'react-bootstrap';

const Post = () => {
  const { id } = useParams();
  const post = useSelector(state => getPostById(state, id));

  if (!post) {
    return (
      <>
        <h1>Post not found</h1>
        <Button as={Link} to="/" variant="primary" className="mt-3">
          Back to home
        </Button>
      </>
    );
  }

  return (
    <>
      <h1>{post.title}</h1>
      <p className="mb-1"><strong>Author:</strong> {post.author}</p>
      <p className="mb-4"><strong>Published:</strong> {post.publishedDate}</p>
      <p>{post.content}</p>

      <Button as={Link} to="/" variant="outline-primary" className="mt-4">
        Back to home
      </Button>
    </>
  );
};

export default Post;