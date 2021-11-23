import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import {
  HomeIcon as SolidHomeIcon,
  PaperAirplaneIcon as SolidPaperAirPlaneIcon,
} from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState, selectedUserState } from '../atoms/modalAtom';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';
import textLogo from '../public/img/ig-logo-text.png';
import logo from '../public/img/ig-logo.png';

function Header({ notifications, user1 }) {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);
  const router = useRouter();

  const test = notifications?.filter(
    (notification) => notification.to === user1
  );

  const filteredNotification = notifications?.filter(
    (notification) => notification.to === user1
  ).length;

  const signOutHandler = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'users', session.user.uid), {
      isOnline: false,
    });
    signOut();
  };

  return (
    <div className='sticky top-0 z-50 shadow-sm border-b bg-white'>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        {/* Left */}
        <div
          onClick={() => router.push('/')}
          className='relative hidden w-24 ml-4 lg:inline-grid cursor-pointer'>
          <Image src={textLogo} alt='logo' layout='fill' objectFit='contain' />
        </div>
        <div
          onClick={() => router.push('/')}
          className=' w-10 relative lg:hidden flex-shrink-0 cursor-pointer'>
          <Image src={logo} alt='logo' layout='fill' objectFit='contain' />
        </div>
        {/* Middle */}
        <div className='max-w-xs hidden xs:block '>
          <div className=' mt-1 relative p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              className=' bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border focus:ring-black focus:border-black'
              type='text'
              placeholder='Search'
            />
          </div>
        </div>
        {/* Right */}
        <div className='flex items-center justify-end space-x-4'>
          {router.pathname === '/' ? (
            <SolidHomeIcon onClick={() => router.push('/')} className='icon' />
          ) : (
            <HomeIcon onClick={() => router.push('/')} className='icon' />
          )}
          {session ? (
            <Fragment>
              <div
                onClick={() => router.push('/direct-messages')}
                className='relative'>
                {router.pathname === '/direct-messages' ? (
                  <SolidPaperAirPlaneIcon className='h-6 cursor-pointer rotate-[55deg] hover:scale-125 transition-all duration-150 ease-out' />
                ) : (
                  <PaperAirplaneIcon className='h-6 cursor-pointer rotate-[55deg] hover:scale-125 transition-all duration-150 ease-out' />
                )}
                {filteredNotification !== 0 &&
                test[0]?.to !== selectedChat?.uid &&
                test[0]?.from !== selectedChat?.uid ? (
                  <div className='absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white'>
                    {filteredNotification}
                  </div>
                ) : null}
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className='h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out'
              />
              <UserGroupIcon className='icon' />
              <HeartIcon className='icon' />
              <img
                onClick={signOutHandler}
                src={session?.user?.image}
                alt='pic'
                className='h-10 w-10 rounded-full cursor-pointer'
              />
            </Fragment>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
