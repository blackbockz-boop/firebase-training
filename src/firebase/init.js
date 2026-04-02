// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, db }      from "firebase/auth";
import { collection, addDoc, getDocs} from "firebase/firestore"
import {    
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import React from "react";

function App() {
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true);

    function createpost() {
    const post= {
        title: "Land a $400k job",
        description: "Finish Frontent Simplified"
    };
    addDoc(collection(db, "posts"), post)
} 

async function getAllPosts() {
     const data = await getDocs(collection(db, "posts"));
     console.log(data);
}

React.useEffect(() => {
    onAuthStateChanged(auth, (User) => {
        setLoading(false);
        if (user) {
            setUser(user);
        }
    });
}, []);

    function login() {
        signInWithEmailAndPassword(auth, "email@example.com", "test123")
        .then(({ user })) => {
            console.log(user);
        }
        .catch((error) => {
            console.error(error);
        });
    }

    function logout() {
        signOut(auth)
        setUser({});
    }
       
    return (
    <div className= "App">
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        {loading ? "Loading..." : user.email}
        <button onClick={createpost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
    </div>
    );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
