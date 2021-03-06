import { getProviders, signIn } from 'next-auth/react';
import Header from '../../components/Header';

// Browser...
function signin({ providers }) {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-40 px-14 text-center'>
        <img className='w-80' src='https://links.papareact.com/ocw' alt='ig' />
        <p className='font-extralight italic'>
          This is not a REAL app, it is bulit for educational purposes only
        </p>
        <div className='mt-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='p-3 bg-blue-500 rounded-lg text-white'
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: `${process.env.NEXTAUTH_URL}`,
                  })
                }>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default signin;

// Server...
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
