import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Posts from '../features/Posts';

const Home = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">All posts</h1>
        <Button as={Link} to="/post/add" variant="outline-primary">
          Add post
        </Button>
      </div>

      <Posts />
    </>
  );
};

export default Home;