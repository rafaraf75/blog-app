import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');

  const isValid =
    title.trim() &&
    author.trim() &&
    publishedDate.trim() &&
    shortDescription.trim() &&
    content.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;

    const newPost = {
      id: Date.now().toString(),      // proste ID; później można podmienić np. na uuid
      title,
      author,
      publishedDate,
      shortDescription,
      content,
    };

    dispatch(addPost(newPost));
    navigate('/'); // po dodaniu wracamy na stronę główną
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Enter author"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Published</Form.Label>
        <Form.Control
          value={publishedDate}
          onChange={e => setPublishedDate(e.target.value)}
          placeholder="Enter published date"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Short description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={shortDescription}
          onChange={e => setShortDescription(e.target.value)}
          placeholder="Leave a comment here"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Main content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Leave a comment here"
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={!isValid}>
        Add post
      </Button>
    </Form>
  );
};

export default AddPostForm;