import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { fullImageState, imgUrlForModalState } from '../../atoms/modalAtom';
import { XIcon } from '@heroicons/react/outline';

function FullImageModal() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(fullImageState);
  const [imgUrl, setImgUrl] = useRecoilState(imgUrlForModalState);

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
            <div className='inline-block align-middle bg-transparent overflow-hidden transform transition-all lg:m-40 xl:m-56'>
              <XIcon
                onClick={() => setShowModal(false)}
                className='h-6 cursor-pointer absolute right-2 top-12 text-white'
              />
              <div className='inline-block align-middle bg-transparent overflow-hidden shadow-xl transform transition-all rounded-xl m-10'>
                <img src={imgUrl} className='' />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default FullImageModal;
