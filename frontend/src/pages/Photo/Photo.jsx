import './Photo.css';
import { uploads } from '../../utils/config';

// Components
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';
// Hooks
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// Redux
import { getPhoto, like, comment } from '../../slices/photoSlice';

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const [commnetText, setCommentText] = useState('');

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Like a photo
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };
  // Coments
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commnetText,
      id: photo._id,
    };
    dispatch(comment(commentData));

    setCommentText('');

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id='photo'>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className='message-container'>
        {error && <Message msg={error} type='error' />}
        {message && <Message msg={message} type='success' />}
      </div>
      <div className='comments'>
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type='text'
                placeholder='Insira seu comentário...'
                onChange={(e) => setCommentText(e.target.value)}
                value={commnetText || ''}
              />
              <input type='submit' value='Enviar' />
            </form>
            {photo.comments.length === 0 && <p>Não há comentário!</p>}
            {photo.comments.map((comment) => (
              <div className='comment' key={comment.comment}>
                <div className='author'>
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
