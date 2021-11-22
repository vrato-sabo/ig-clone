import { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { fullImageState, imgUrlForModalState } from '../../atoms/modalAtom';

function Message({ msg, user1 }) {
  const scrollRef = useRef();
  const [showModal, setShowModal] = useRecoilState(fullImageState);
  const [imgUrl, setImgUrl] = useRecoilState(imgUrlForModalState);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  const clickHandler = () => {
    setImgUrl(msg.media);
    setShowModal(true);
  };

  return (
    <div
      ref={scrollRef}
      className={
        msg.from === user1
          ? 'flex flex-col items-end p-3'
          : 'flex flex-col items-start p-3 '
      }>
      {msg.media !== '' ? (
        <div onClick={clickHandler} className='cursor-pointer'>
          {msg.media && (
            <img src={msg.media} alt='alttext' className='resize rounded-3xl' />
          )}
        </div>
      ) : null}
      {msg.text === '' ? null : (
        <div
          className={
            msg.from === user1
              ? 'bg-gray-200 max-w-xxs rounded-3xl py-3 px-4 break-words text-sm smd:max-w-xs'
              : 'bg-white border max-w-xxs border-gray-200 rounded-3xl py-3 px-4 break-words text-sm'
          }>
          {msg.text}
        </div>
      )}
    </div>
  );
}

export default Message;
