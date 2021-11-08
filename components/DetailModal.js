import { useRecoilState } from 'recoil';
import { detailModalState, idState, usernameState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../firebase';

function DetailModal() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(detailModalState);
  const [usernameForDelete, setUsernameForDelete] =
    useRecoilState(usernameState);
  const [idForDelete, setIdForDelete] = useRecoilState(idState);

  const showDeleteButton = session?.user?.username === usernameForDelete;
  console.log(showDeleteButton, 'showdeletebutton');

  console.log(usernameForDelete, 'user Name for delete');

  const deletePost = async (e) => {
    e.preventDefault();

    if (session?.user?.username === usernameForDelete) {
      await deleteDoc(doc(db, 'posts', idForDelete));
    }
    setUsernameForDelete(null);
    setShowModal(false);
  };

  if (!session) return null;

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={setShowModal}>
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
            <div className='inline-block align-bottom bg-white rounded-lg text-center shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'>
              <div className='w-full cursor-not-allowed font-semibold py-2 border-b text-red-600'>
                Report
              </div>
              <div className='w-full cursor-not-allowed font-semibold py-2 border text-red-600'>
                Unfollow
              </div>
              {showDeleteButton && (
                <div
                  onClick={session ? deletePost : null}
                  className='w-full cursor-pointer font-semibold py-2 border text-red-600'>
                  Delete Post
                </div>
              )}
              <div className='w-full cursor-not-allowed py-2 border'>
                Go to post
              </div>
              <div className='w-full cursor-not-allowed py-2 border'>
                Share to...
              </div>
              <div className='w-full cursor-not-allowed py-2 border'>
                Copy Link
              </div>
              <div className='w-full cursor-not-allowed py-2 border'>Embed</div>
              <div
                onClick={() => setShowModal(false)}
                className='py-2 cursor-pointer'>
                Cancel
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DetailModal;
