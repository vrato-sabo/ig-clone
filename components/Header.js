import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  // console.log(session);
  return (
    <div className='sticky top-0 z-50 shadow-sm border-b bg-white'>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        {/* Left */}
        <div
          onClick={() => router.push('/')}
          className='relative hidden w-24 lg:inline-grid'>
          <Image
            src='https://links.papareact.com/ocw'
            alt='logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className=' w-10 relative lg:hidden flex-shrink-0 cursor-pointer'>
          <Image
            src='https://links.papareact.com/jjm'
            alt='logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        {/* Middle */}
        <div className='max-w-xs'>
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
          <HomeIcon onClick={() => router.push('/')} className='icon' />
          <MenuIcon className='h-6 md:hidden cursor-pointer' />
          {session ? (
            <Fragment>
              <div className='relative icon'>
                <PaperAirplaneIcon className='icon rotate-45' />
                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white'>
                  3
                </div>
              </div>
              <PlusCircleIcon onClick={() => setOpen(true)} className='icon' />
              <UserGroupIcon className='icon' />
              <HeartIcon className='icon' />
              <img
                onClick={signOut}
                src={session?.user?.image}
                alt='pic'
                className='h-10 w-10 rounded-full cursor-pointer'
              />
            </Fragment>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
          {/* <div className='relative icon'>
            <PaperAirplaneIcon className='icon rotate-45' />
            <div className='absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white'>
              3
            </div>
          </div>
          <PlusCircleIcon className='icon' />
          <UserGroupIcon className='icon' />
          <HeartIcon className='icon' />
          <img
            src={session?.user?.image}
            alt='pic'
            className='h-10 rounded-full cursor-pointer'
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
