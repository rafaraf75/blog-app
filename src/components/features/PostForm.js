import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

const PostForm = ({ action, actionText, ...props }) => {
  // --- RHF: init
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  // --- lokalny stan pól formularza
  const [title, setTitle] = useState(props.title || '');
  const [author, setAuthor] = useState(props.author || '');
  const [publishedDate, setPublishedDate] = useState(
    props.publishedDate ? new Date(props.publishedDate) : null
  );
  const [shortDescription, setShortDescription] = useState(
    props.shortDescription || ''
  );
  const [content, setContent] = useState(props.content || '');

  // --- dodatkowe błędy (dla content & date)
  const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);

  // UWAGA: RHF sam zablokuje submit, jeśli inputy nie spełnią warunków;
  // my sprawdzamy dodatkowo content/date:
  const onSubmit = () => {
    const isContentEmpty =
      !content || content === '<p><br></p>' || content.trim() === '';
    const isDateEmpty = !publishedDate;

    setContentError(isContentEmpty);
    setDateError(isDateEmpty);

    if (!isContentEmpty && !isDateEmpty) {
      action({ title, author, publishedDate, shortDescription, content });
    }
  };

  return (
    <Form onSubmit={validate(onSubmit)}>
      {/* TITLE */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 3 })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        {errors.title?.type === 'required' && (
          <small className="d-block form-text text-danger mt-2">
            Title is required
          </small>
        )}
        {errors.title?.type === 'minLength' && (
          <small className="d-block form-text text-danger mt-2">
            Title is too short (min is 3)
          </small>
        )}
      </Form.Group>

      {/* AUTHOR */}
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          {...register('author', { required: true, minLength: 3 })}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author"
        />
        {errors.author?.type === 'required' && (
          <small className="d-block form-text text-danger mt-2">
            Author is required
          </small>
        )}
        {errors.author?.type === 'minLength' && (
          <small className="d-block form-text text-danger mt-2">
            Author is too short (min is 3)
          </small>
        )}
      </Form.Group>

      {/* PUBLISHED DATE */}
      <Form.Group className="mb-3">
        <Form.Label>Published</Form.Label>
        <DatePicker
          selected={publishedDate}
          onChange={(date) => setPublishedDate(date)}
          placeholderText="Select published date"
          dateFormat="MM/dd/yyyy"
          className="form-control"
          isClearable
        />
        {dateError && (
          <small className="d-block form-text text-danger mt-2">
            Published date is required
          </small>
        )}
      </Form.Group>

      {/* SHORT DESCRIPTION */}
      <Form.Group className="mb-3">
        <Form.Label>Short description</Form.Label>
        <Form.Control
          {...register('shortDescription', { required: true, minLength: 20 })}
          as="textarea"
          rows={3}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Short description"
        />
        {errors.shortDescription?.type === 'required' && (
          <small className="d-block form-text text-danger mt-2">
            Short description is required
          </small>
        )}
        {errors.shortDescription?.type === 'minLength' && (
          <small className="d-block form-text text-danger mt-2">
            Short description is too short (min is 20)
          </small>
        )}
      </Form.Group>

      {/* CONTENT */}
      <Form.Group className="mb-3">
        <Form.Label>Main content</Form.Label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        {contentError && (
          <small className="d-block form-text text-danger mt-2">
            Content can't be empty
          </small>
        )}
      </Form.Group>

      <Button type="submit" variant="primary">
        {actionText}
      </Button>
    </Form>
  );
};

// === PropTypes: poprawka — publishedDate to teraz obiekt Date (lub null)
PostForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.instanceOf(Date), // <-- zmiana!
  shortDescription: PropTypes.string,
  content: PropTypes.string,
};

export default PostForm;