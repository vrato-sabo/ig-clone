import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  imgUrlForMessageState,
  selectedUserState,
} from '../../atoms/modalAtom';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MessageForm from './MessageForm';
import NoSelectedChat from './NoSelectedChat';
import User from './User';
import SelectChatModal from './SelectChatModal';

function Users({ users, currentUser, notifications }) {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedUserState);
  const [imgMessage, setImgMessage] = useRecoilState(imgUrlForMessageState);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const user1 = currentUser.uid;

  const selectUser = async (selectedChat) => {
    setChat(selectedChat);

    const user2 = selectedChat.uid;
    const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => msgs.push(doc.data()));
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id), {
        unread: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = selectedChat?.uid;
    const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

    let url;
    if (imgMessage) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()}-${imgMessage.name}`
      );
      const snap = await uploadBytes(imgRef, imgMessage);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    if (text === '') {
      return;
    } else {
      await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        from: user1,
        to: user2,
        createdAt: serverTimestamp(),
        media: '',
      });

      await setDoc(doc(db, 'lastMsg', id), {
        text,
        from: user1,
        to: user2,
        createdAt: serverTimestamp(),
        media: url || '',
        unread: true,
      });
      setText('');
      setImg('');
      console.log('handlesubmit');
    }
  };
  const differentFunction = async () => {
    console.log(imgMessage?.type, 'type of imgmessaage');

    if (!imgMessage?.type?.includes('image')) {
      return;
    } else {
      const user2 = selectedChat?.uid;
      const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

      let url;
      if (imgMessage) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()}-${imgMessage.name}`
        );
        const snap = await uploadBytes(imgRef, imgMessage);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        from: user1,
        to: user2,
        createdAt: serverTimestamp(),
        media: url || '',
      });

      await setDoc(doc(db, 'lastMsg', id), {
        text,
        from: user1,
        to: user2,
        createdAt: serverTimestamp(),
        media: url || '',
        unread: true,
      });

      setImgMessage('');
    }
  };

  return (
    <div className='flex justify-center h-90vh sm:h-83vh md:h-78vh xxl:h-83vh'>
      <div
        className={
          !selectedChat
            ? 'flex-col w-full  bg-white overflow-y-scroll scrollbar-hide border-r sm:border-b md:border-l pt-2 sm:w-350'
            : 'hidden sm:flex-shrink-0 sm:flex-col sm:flex sm:w-350 sm:bg-white sm:overflow-y-auto sm:scrollbar-hide sm:border-r sm:border-b md:border-l'
        }>
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
            notifications={notifications}
            setShowPicker={setShowPicker}
          />
        ))}
      </div>
      {selectedChat ? (
        <MessageForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          msgs={msgs}
          user1={currentUser.uid}
          selectedChat={selectedChat}
          differentFunction={differentFunction}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      ) : (
        <NoSelectedChat />
      )}
      <SelectChatModal users={users} selectUser={selectUser} />
    </div>
  );
}

export default Users;
