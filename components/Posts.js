import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';

// const posts = [
//   {
//     id: '123',
//     username: 'ssssangha',
//     userImg: 'https://links.papareact.com/3ke',
//     img: 'https://links.papareact.com/3ke',
//     caption:
//       'This is dope but I need the caption to be longer to show css property truncate',
//   },
//   {
//     id: '1234',
//     username: 'ssssangha',
//     userImg: 'https://links.papareact.com/3ke',
//     img: 'https://links.papareact.com/3ke',
//     caption:
//       'This is dope but I need the caption to be longer to show css property truncate',
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
