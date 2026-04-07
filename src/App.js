import './App.css';
import React from 'react';
import { auth } from './firebase/init';
import { createPost, getAllPosts } from './firebase/post';
import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
 } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log(register);
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123' )
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then(({ user }) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleCreatePost() {
    try {
      await createPost();
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetAllPosts() {
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'Loading...' : user.email}
      <button onClick={handleCreatePost}>Create Post</button>
      <button onClick={handleGetAllPosts}>Get All Posts</button>
      {posts.map((post) => (
        <div key={post.title}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
