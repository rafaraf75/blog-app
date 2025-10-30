import { useParams, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostById, removePost } from '../../redux/postsRedux';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import dateToStr from '../../utils/dateToStr';

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => getPostById(state, id));

  // modal potwierdzenia
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const confirmRemove = () => {
    dispatch(removePost(id)); // usuwamy z magazynu
    closeModal();
    // po usunięciu selector zwróci undefined -> poniższy warunek przekieruje na "/"
  };

  // jeśli brak posta (zły URL lub po usunięciu) — wróć na Home
  if (!post) return <Navigate to="/" />;

  return (
    <>
      <div className="d-flex align-items-start justify-content-between mb-3">
        <h1 className="mb-0">{post.title}</h1>
        <div className="d-flex gap-2">
          <Button as={Link} to={`/post/edit/${post.id}`} variant="outline-info" size="sm">
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={openModal}>
            Delete
          </Button>
        </div>
      </div>

      <p className="mb-1"><strong>Author:</strong> {post.author}</p>
      <p className="mb-4">
        <strong>Published:</strong> {dateToStr(post.publishedDate)}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Modal potwierdzenia */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this post from the app.
          Are you sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="danger" onClick={confirmRemove}>Remove</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;