import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/postsRedux';
import { getAllCategories } from '../../redux/categoriesRedux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import dateToStr from '../../utils/dateToStr';

const Category = () => {
  const { id } = useParams();                 // np. 'c1'
  const allPosts = useSelector(getAllPosts);
  const categories = useSelector(getAllCategories);

  // znajdź obiekt kategorii po id (np. {id:'c1', name:'Sport'})
  const currentCategory = categories.find(c => c.id === id);
  const headerName = currentCategory ? currentCategory.name : id; // fallback

  // pomocnicza mapa id -> name (by ładnie pokazać nazwę przy każdym poście)
  const catNameById = Object.fromEntries(categories.map(c => [c.id, c.name]));

  const posts = allPosts.filter(p => p.category === id);

  return (
    <>
      <h1 className="mb-4">Category: {headerName}</h1>

      <Row xs={1} md={2} lg={3} className="g-3">
        {posts.map(post => (
          <Col key={post.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>

                <p className="mb-1"><strong>Author:</strong> {post.author}</p>
                <p className="mb-1"><strong>Published:</strong> {dateToStr(post.publishedDate)}</p>

                {/* pokaż nazwę kategorii, nie id */}
                <p className="mb-3">
                  <strong>Category:</strong> {catNameById[post.category] || '—'}
                </p>

                <Card.Text className="mb-3">{post.shortDescription}</Card.Text>

                <Button as={Link} to={`/post/${post.id}`} variant="primary">
                  Read more
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {posts.length === 0 && <p className="mt-3">No posts in this category yet.</p>}
    </>
  );
};

export default Category;