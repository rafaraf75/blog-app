import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


/**
 * Uniwersalny formularz postu.
 * - action: funkcja wywoływana przy submit, otrzymuje { title, author, publishedDate, shortDescription, content }
 * - actionText: tekst na przycisku (np. "Add post" / "Edit post")
 * - title/author/...: (opcjonalnie) wartości startowe pól
 */
const PostForm = ({ action, actionText, ...props }) => {
  // startowe wartości: z props lub pusty string
  const [title, setTitle] = useState(props.title || '');
  const [author, setAuthor] = useState(props.author || '');
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || '');
  const [shortDescription, setShortDescription] = useState(props.shortDescription || '');
  const [content, setContent] = useState(props.content || '');

  const isValid =
    title.trim() &&
    author.trim() &&
    publishedDate.trim() &&
    shortDescription.trim() &&
    content.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    // przekaż wartości pól do funkcji z rodzica
    action({ title, author, publishedDate, shortDescription, content });
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
          placeholder="Short description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Main content</Form.Label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}    // ReactQuill zwraca od razu HTML string
        />
      </Form.Group>


      <Button type="submit" variant="primary" disabled={!isValid}>
        {actionText}
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  // poniższe są opcjonalne – mogą pojawić się przy edycji,
  // a przy dodawaniu mogą być pominięte
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  shortDescription: PropTypes.string,
  content: PropTypes.string,
};

export default PostForm;
