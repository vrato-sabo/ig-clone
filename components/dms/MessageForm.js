import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imgUrlForMessageState } from '../../atoms/modalAtom';
import EmojiPicker from './EmojiPicker';
import Message from './Message';

function MessageForm({
  handleSubmit,
  text,
  setText,
  msgs,
  user1,
  differentFunction,
  selectedChat,
  showPicker,
  setShowPicker,
}) {
  const [imgMessage, setImgMessage] = useRecoilState(imgUrlForMessageState);
  const [textAreaHeight, setTextAreaHeight] = useState('h-7');
  const [emoji, setEmoji] = useState('');

  useEffect(async () => {
    if (imgMessage === '') {
      return;
    }
    await differentFunction();
  }, [imgMessage]);

  const textAreaResize = (e) => {
    if (text === '') {
      setTextAreaHeight('h-7');
      return;
    } else {
      let scHeight = e.target.scrollHeight;
      if (scHeight === 28) {
        setTextAreaHeight('h-7');
      } else {
        setTextAreaHeight(scHeight);
      }
    }
  };

  const submitOnEnter = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.target.form.dispatchEvent(new Event(handleSubmit(e)));
      setShowPicker(false);
      setText('');
      e.preventDefault();
    }
  };

  const addToText = (emoji) => {
    setEmoji(emoji);
    setText(text + emoji);
  };

  return (
    <div
      className={
        !selectedChat
          ? `flex left-900 flex-col justify-between sm:max-w-xl border-r border-b `
          : `flex w-full left-0 flex-col sm:max-w-xl border-r border-b `
      }>
      {showPicker && (
        <EmojiPicker handler={(e) => addToText(e.currentTarget.innerHTML)} />
      )}

      <div className='flex justify-end flex-col flex-1 overflow-y-auto scrollbar-hide bg-white'>
        {(msgs.length && selectedChat.uid === msgs[0]?.to) ||
        selectedChat.uid === msgs[0]?.from ? (
          msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1} />)
        ) : (
          <div className='flex-1' />
        )}
      </div>

      <div className=' w-full bg-white sm:pb-4 max-h-20 text-center'>
        <form
          onSubmit={handleSubmit}
          action='submit'
          className='flex max-h-20  justify-between items-center border border-gray-200 rounded-3xl mx-2'>
          <EmojiHappyIcon
            onClick={() => setShowPicker(!showPicker)}
            className='h-8 relative cursor-pointer px-3'
          />
          <textarea
            onKeyPress={submitOnEnter}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={textAreaResize}
            type='text'
            placeholder='Message...'
            className={`w-full resize-none ${
              textAreaHeight ? textAreaHeight : 'h-7'
            } break-words outline-none border-none ring-0 text-sm my-3 p-1 focus:ring-0 `}
          />
          <div>
            <label htmlFor='img'>
              <PhotographIcon className='h-10 relative cursor-pointer px-3' />
            </label>
            <input
              onChange={(e) => setImgMessage(e.target.files[0])}
              type='file'
              id='img'
              accept='image/*'
              hidden
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
