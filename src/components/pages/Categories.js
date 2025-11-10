import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { getAllCategories } from '../../redux/categoriesRedux';

const Categories = () => {
  const categories = useSelector(getAllCategories);

  return (
    <>
      <h1 className="mb-4">Categories</h1>
      <ListGroup>
        {categories.map(cat => (
          <ListGroup.Item key={cat.id} as={Link} to={`/category/${cat.id}`}>
            {cat.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Categories;