import Head from 'next/head';
import DetailModal from '../components/DetailModal';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className=' bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>IG-clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Feed />
      <Modal />
      <DetailModal />
    </div>
  );
}
