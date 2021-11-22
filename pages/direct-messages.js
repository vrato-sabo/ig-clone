import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SubHeader from '../components/dms/SubHeader';
import Users from '../components/dms/Users';
import Header from '../components/Header';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from '../components/Modal';
import SelectChatModal from '../components/dms/SelectChatModal';
import FullImageModal from '../components/dms/FullImageModal';

function DirectMessages({ user }) {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const user1 = user.uid;

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', 'not-in', [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const lastMsgsRef = collection(db, 'lastMsg');
    const q = query(lastMsgsRef, where('unread', '==', true));
    console.log(q);
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
    <div className='bg-white h-screen sm:bg-gray-50'>
      <div className='hidden sm:block'>
        <Header notifications={notifications} user1={user?.uid} />
      </div>
      <section className=' md:p-4 xxl:h-83vh'>
        <SubHeader user={user} users={users} />
        <Users currentUser={user} users={users} notifications={notifications} />
      </section>
      <Modal />
      {/* <SelectChatModal users={users} /> */}
      <FullImageModal />
    </div>
  );
}

export default DirectMessages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    return null;
  }
  return {
    props: {
      user: session.user,
    },
  };
}
