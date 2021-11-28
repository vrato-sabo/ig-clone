import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedUserState } from '../atoms/modalAtom';
import DetailModal from '../components/DetailModal';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { db } from '../firebase';

export default function Home({ user }) {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);
  const [notifications, setNotifications] = useState([]);
  useEffect(async () => {
    setSelectedChat(null);
    try {
      await setDoc(doc(db, 'users', user?.uid), {
        uid: user?.uid,
        name: user?.name,
        username: user?.username,
        profileImg: user?.image,
        isOnline: true,
      });
    } catch (err) {
      null;
    }
  }, [user]);

  useEffect(() => {
    const lastMsgsRef = collection(db, 'lastMsg');
    const q = query(lastMsgsRef, where('unread', '==', true));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push(doc.data());
      });
      setNotifications(notifications);
    });
    return () => unsub();
  }, []);

  return (
    <div className=' bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>IG-clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header notifications={notifications} user1={user?.uid} />
      <Feed />
      <Modal />
      <DetailModal />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        user: null,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
