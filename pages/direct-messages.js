import { getSession, signOut, useSession } from 'next-auth/react';
<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 6085a30ab12daa770ed9d55ac44932e8d4eb2c22
import SubHeader from '../components/dms/SubHeader';
import Users from '../components/dms/Users';
import Header from '../components/Header';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from '../components/Modal';
import FullImageModal from '../components/dms/FullImageModal';

function DirectMessages({ user }) {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [lastToMsgs, setLastToMsgs] = useState([]);
  const [lastFromMsgs, setLastFromMsgs] = useState([]);
  const [lastMsgs, setLastMsgs] = useState([]);

  const user1 = user.uid;
  const dates = lastMsgs.map((lastMsg) => lastMsg);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', 'not-in', [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        users.forEach(
          (user) =>
            (user['lastMsg'] = dates.filter(
              (date) => date?.from === user.uid || date?.to === user.uid
            ))
        );
        users?.sort(
          (a, b) => b.lastMsg[0]?.createdAt - a.lastMsg[0]?.createdAt
        );
      });
      setUsers(users);
    });
    return () => unsub();
  }, [lastMsgs]);

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

  useEffect(() => {
    const q = query(collection(db, 'lastMsg'), where('from', '==', user1));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let lastFromMsgs = [];
      querySnapshot.forEach((doc) => {
        lastFromMsgs.push(doc.data());
      });
      setLastFromMsgs(lastFromMsgs);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'lastMsg'), where('to', '==', user1));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let lastToMsgs = [];
      querySnapshot.forEach((doc) => {
        lastToMsgs.push(doc.data());
      });
      setLastToMsgs(lastToMsgs);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setLastMsgs(lastFromMsgs.concat(lastToMsgs));
  }, [lastFromMsgs, lastToMsgs]);

  return (
    <div className='bg-white h-screen sm:bg-gray-50'>
      <div className='hidden sm:block'>
        <Header notifications={notifications} user1={user?.uid} />
      </div>
      <section className=' md:p-4 xxl:h-83vh'>
        <SubHeader user={user} users={users} />
        <Users
          setUsers={setUsers}
          currentUser={user}
          users={users}
          notifications={notifications}
        />
      </section>
      <Modal />
      <FullImageModal />
    </div>
  );
}

export default DirectMessages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
<<<<<<< HEAD
=======
    // context.res.writeHead(302, { Location: '/' });
    // context.res.end();

    // return null;
>>>>>>> 6085a30ab12daa770ed9d55ac44932e8d4eb2c22
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
