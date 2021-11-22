import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { selectChatModalState } from '../../atoms/modalAtom';

function NoSelectedChat() {
  const [showModal, setShowModal] = useRecoilState(selectChatModalState);
  return (
    <div className='hidden flex-1 flex-col items-center justify-center max-w-xl border-r border-b bg-white sm:flex'>
      <div className='flex-col justify-center'>
        <div className='border-[1.5px] border-black p-5 rounded-full h-24 w-24 flex items-center justify-center'>
          <PaperAirplaneIcon className='h-16 relative rotate-[55deg] left-1 bottom-1 text-gray-700' />
        </div>
      </div>
      <h1 className=' text-2xl font-light mt-2'>Your Messages</h1>
      <p className='text-gray-400 text-sm mt-2'>
        Send private photos and messages to a friend.
      </p>
      <button
        onClick={() => setShowModal(true)}
        className='px-3 py-1 mt-4 bg-blue-500 rounded-lg text-white'>
        Send Message
      </button>
    </div>
  );
}

export default NoSelectedChat;
