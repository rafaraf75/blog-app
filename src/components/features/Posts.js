import { useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/postsRedux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Posts = () => {
  const posts = useSelector(getAllPosts);

  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {posts.map(post => (
        <Col key={post.id}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <p className="mb-1"><strong>Author:</strong> {post.author}</p>
              <p className="mb-3"><strong>Published:</strong> {post.publishedDate}</p>
              <Card.Text className="mb-3">{post.shortDescription}</Card.Text>
              <Button as={Link} to={`/post/${post.id}`} variant="primary">
                Read more
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Posts;