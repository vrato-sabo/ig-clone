import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  filteredUsersState,
  selectChatModalState,
  selectedUserState,
} from '../../atoms/modalAtom';
import { XIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon as SolidCheckCircleIcon } from '@heroicons/react/solid';

function SelectChatModal({ users, selectUser }) {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(selectChatModalState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedUserInSearch, setSelectedUserInSearch] = useState(false);
  const [filtered, setFiltered] = useRecoilState(filteredUsersState);

  const inputRef = useRef();

  const onChangeHandler = () => {
    let searchString = inputRef.current.value;
    const filteredUsers = users.filter((user) => {
      if (searchString === '') {
        setFiltered(null);
        return;
      } else {
        return (
          user.name.includes(searchString) ||
          user.username.includes(searchString)
        );
      }
    });
    setFiltered(filteredUsers);
  };

  const closeHandler = () => {
    setFiltered('');
    setShowModal(false);
    setSelectedUser(null);
  };

  const clickNextHandler = () => {
    if (selectedUser) {
      selectUser(selectedUser);
      setSelectedChat(selectedUser);
    } else {
      selectUser(selectedUserInSearch);
      setSelectedChat(selectedUserInSearch);
    }
    setFiltered('');
    setSelectedUser(null);
    setSelectedUserInSearch(false);
    setShowModal(false);
  };

  const suggestedSelectUserHandler = (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const searchSelectUserHandler = (user) => {
    if (selectedUserInSearch === user) {
      setSelectedUserInSearch(null);
    } else {
      setSelectedUserInSearch(user);
    }
  };

  if (!session) return null;

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={closeHandler}>
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div className='inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full xs:w-full xxs:w-full'>
              <div className='flex justify-between items-center py-2 border border-gray-200 border-b'>
                <XIcon
                  onClick={closeHandler}
                  className='h-6 pl-2 cursor-pointer'
                />
                <p className='font-medium'>New Message</p>
                <button
                  disabled={!selectedUserInSearch && !selectedUser}
                  onClick={clickNextHandler}
                  className={
                    selectedUser || selectedUserInSearch
                      ? 'text-blue-500 pr-3 cursor-pointer'
                      : 'text-blue-500 opacity-40 pr-3 cursor-default'
                  }>
                  Next
                </button>
              </div>
              <div className='flex items-center py-2 border border-gray-200 border-b'>
                <span className='p-2 font-medium'>To:</span>
                <div>
                  <input
                    ref={inputRef}
                    onChange={onChangeHandler}
                    type='text'
                    placeholder='Search...'
                    className='outline-none focus:ring-0 border-none'
                  />
                </div>
              </div>
              {filtered?.length === 0 ? (
                <div>
                  <h1 className='text-left ml-2 py-2 font-medium text-sm'>
                    Suggested
                  </h1>
                  {users.map((user) => (
                    <>
                      <div
                        onClick={
                          !selectedUser
                            ? () => setSelectedUser(user)
                            : () => suggestedSelectUserHandler(user)
                        }
                        key={user.uid}
                        className={
                          selectedUser === user
                            ? ' cursor-pointer py-2 flex justify-between items-center w-full bg-gray-200'
                            : ' cursor-pointer py-2 flex justify-between items-center w-full hover:bg-gray-100'
                        }>
                        <img
                          className='rounded-full h-10 w-10 ml-2'
                          src={user.profileImg}
                          alt=''
                        />
                        <div className='flex flex-col justify-start items-start w-full'>
                          <p className='font-medium  pl-2'>{user.username}</p>
                          <p className='text-xs pl-2'>{user.name}</p>
                        </div>
                        <div className='mx-4'>
                          {selectedUser === user ? (
                            <SolidCheckCircleIcon className='h-10 w-10 text-blue-500 rounded-full' />
                          ) : (
                            <div className='h-8 w-8 rounded-full border border-black mr-1' />
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <div>
                  {filtered?.map((user) => (
                    <>
                      <div
                        onClick={
                          !selectedUserInSearch
                            ? () => setSelectedUserInSearch(user)
                            : () => searchSelectUserHandler(user)
                        }
                        key={user.uid}
                        className={
                          selectedUserInSearch === user
                            ? 'py-2 flex justify-between items-center w-full bg-gray-200'
                            : 'py-2 flex justify-between items-center w-full hover:bg-gray-100'
                        }>
                        <img
                          className='rounded-full h-10 w-10 ml-2'
                          src={user.profileImg}
                          alt=''
                        />
                        <div className='flex flex-col justify-start items-start w-full'>
                          <p className='font-medium  pl-2'>{user.username}</p>
                          <p className='text-xs pl-2'>{user.name}</p>
                        </div>
                        <div className='mx-4'>
                          {selectedUserInSearch === user ? (
                            <SolidCheckCircleIcon className='h-10 w-10 text-blue-500 rounded-full' />
                          ) : (
                            <div className='h-8 w-8 rounded-full border border-black mr-1' />
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SelectChatModal;
