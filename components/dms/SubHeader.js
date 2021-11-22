import {
  ArrowLeftIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { selectChatModalState, selectedUserState } from '../../atoms/modalAtom';

function SubHeader({ user, users }) {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);
  const [showModal, setShowModal] = useRecoilState(selectChatModalState);

  const selectedUserImg = users.filter((one) => selectedChat?.uid === one?.uid);

  return (
    <div className='flex justify-center'>
      {/* left owner username */}
      <div
        className={
          !selectedChat
            ? 'flex w-full h-60 justify-between bg-white items-center border-r border-b border-l border-gray-200 md:border-t cursor-pointer sm:w-350'
            : 'hidden sm:flex sm:w-350 sm:h-60 sm:justify-between sm:bg-white sm: items-center sm:border-r sm:border-b sm:border-l sm:border-gray-200 md:border-t sm:cursor-pointer'
        }>
        <ArrowLeftIcon
          onClick={() => router.push('/')}
          className='h-6 pl-2 sm:hidden'
        />
        <div className='flex flex-1 flex-shrink-0 w-350 justify-center font-semibold'>
          {user.username}
          <ChevronDownIcon className='h-6 pl-2' />
        </div>
        <div className='cursor-pointer'>
          <PencilAltIcon
            onClick={() => setShowModal(true)}
            className='h-8 text-gray-600 pr-2'
          />
        </div>
      </div>
      {/* right conversation with another user */}
      {selectedChat ? (
        <div className='flex w-full h-60 justify-between items-center px-4 sm:flex-1 sm:max-w-xl bg-white border-r border-b md:border-t'>
          <div className='flex flex-1 justify-between font-semibold sm:flex-grow-0'>
            <ArrowLeftIcon
              className='h-6 cursor-pointer sm:hidden'
              onClick={() => setSelectedChat(null)}
            />
            <div className='flex flex-1 justify-center'>
              <img
                className='h-6 w-6 mx-2 rounded-full cursor-pointer'
                src={selectedUserImg[0]?.profileImg}
                alt=''
              />
              <span className='cursor-pointer'>
                {selectedChat ? selectedChat.username : null}
              </span>
            </div>
          </div>
          <div>
            <InformationCircleIcon className='h-8 cursor-pointer hidden sm:inline-flex' />
          </div>
        </div>
      ) : (
        <div className='hidden flex-1 justify-between items-center px-4 max-w-xl bg-white border-r sm:flex  md:border-t' />
      )}
    </div>
  );
}

export default SubHeader;
