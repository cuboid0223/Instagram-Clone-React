import React, { useState, useEffect }from 'react';


import Header from './components/Header';
import Post from './components/Post';
import SignUpModal from './components/SignUpModal';
import ImageUpload from './components/ImageUpload';
import './scss/all.css';
import { db } from './firebase'



function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  // useEffect runs a piece of code based on a specific condition

  useEffect( () => {
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => (
          {
            id: doc.id,//the post id with a random number
            post: doc.data()//take the post data in the random id
          }
        )))
      })
  }, [])

  return (
    <div className="App">
      <Header />
      <SignUpModal />
     

      { posts.map( ({id, post}) => (
        <Post
          key={id}
          userName={post.userName}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      )    
      )}

      
      
      {user.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
          <h1>Oops! you need to login!</h1>
      )}
    </div>
  );
}

export default App;

{/* https://www.youtube.com/watch?v=f7T48W0cwXM&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=3 */}