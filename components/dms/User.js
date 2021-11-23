import { doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedUserState } from '../../atoms/modalAtom';
import { db } from '../../firebase';

function User({ user, selectUser, user1, notifications, setShowPicker }) {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);

  const user2 = user?.uid;
  const [data, setData] = useState('');

  const filteredNotifications = notifications?.filter(
    (notification) =>
      notification.to === user1 && notification.from === selectedChat?.uid
  );

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  const clickHandler = (e) => {
    setSelectedChat(user);
    selectUser(user);
    setShowPicker(false);
  };

  useEffect(async () => {
    const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;
    if (filteredNotifications?.length !== 0 && selectedChat.uid === user2 && selectedChat !== null) {
      const docSnap = await getDoc(doc(db, 'lastMsg', id));
      if (docSnap.data() && docSnap.data().from !== user1) {
        await updateDoc(doc(db, 'lastMsg', id), {
          unread: false,
        });
      }
    }
  }, [filteredNotifications]);

  return (
    <div
      className={
        data?.unread === true && data?.from !== user1 ? 'font-semibold' : null
      }>
      <div
        onClick={clickHandler}
        className={
          selectedChat === user
            ? 'flex w-350 flex-shrink-0 flex-1 px-3 items-center py-2 bg-gray-100 cursor-pointer'
            : 'flex w-350 flex-shrink-0 flex-1 px-3  items-center py-2 hover:bg-gray-50 cursor-pointer'
        }>
        {/* image */}
        <div className=''>
          <img
            className='h-14 w-14 rounded-full border border-gray-300'
            src={user.profileImg}
            alt=''
          />
          {user.isOnline && (
            <div className='relative h-4 w-4 bg-green-400 rounded-full ring-2 ring-white left-9 bottom-5'></div>
          )}
        </div>
        {/* username */}
        <div className='pl-2'>
          <p className='text-sm'>{user.username}</p>
          {data ? (
            <p className='text-xs truncate w-40'>
              {data?.text === '' && data?.media !== ''
                ? data?.from === user1
                  ? 'You sent a photo.'
                  : 'Sent a photo.'
                : data?.text}
            </p>
          ) : (
            <p className='text-sm'>{user.isOnline ? 'Active now' : null}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
