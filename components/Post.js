// http://localhost:3000/api/auth/callback/google

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
// import Moment from 'react-moment';

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const inputRef = useRef();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timeStamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts', id, 'likes')), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timeStamp: serverTimestamp(),
    });
  };
  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* Header */}
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          alt=''
          className=' h-12 w-12 object-contain border p-1 mr-3 rounded-full'
        />
        <p className='flex-1 font-semibold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>
      {/* img */}
      {session ? (
        <img
          onDoubleClick={likePost}
          src={img}
          className='object-cover w-full'
          alt=''
        />
      ) : (
        <img src={img} className='object-cover w-full' alt='' />
      )}
      {/* buttons */}
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='btn text-red-600'
              />
            ) : (
              <HeartIcon onClick={likePost} className='btn' />
            )}
            <ChatIcon
              onClick={() => inputRef.current.focus()}
              className='btn'
            />
            <PaperAirplaneIcon className='btn rotate-45' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}
      {/* caption */}
      <div className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </p>
        )}
        <span className='font-semibold mr-1'>{username}</span>
        {caption}
      </div>
      {/* comments */}
      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img
                className='h-7 rounded-full'
                src={comment.data().userImage}
                alt=''
              />
              <p className='text-sm flex-1'>
                <span className='font-bold mr-1'>
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              {/* <Moment fromNow className='text-xs pr-5'>
                {comment.data().timeStamp?.toDate()}
              </Moment> */}
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            value={comment}
            ref={inputRef}
            onChange={(e) => setComment(e.target.value)}
            className='border-none flex-1 focus:ring-0'
            placeholder='Add a comment...'
            type='text'
          />
          <button
            disabled={!comment.trim()}
            onClick={sendComment}
            type='submit'
            className='font-semibold text-blue-400'>
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
