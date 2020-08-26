import React, { useState, useEffect }from 'react';


import Header from './components/Header';
import Post from './components/Post';
import Footer from './components/Footer'
import './scss/all.css';
import { db } from './firebase'



function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  // useEffect runs a piece of code based on a specific condition

  useEffect( () => {
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
     
     

      { posts.map( ({id, post}) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      )    
      )}

      
      
      
      <Footer />
    </div>
  );
}

export default App;

{/* https://www.youtube.com/watch?v=f7T48W0cwXM&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=3 */}