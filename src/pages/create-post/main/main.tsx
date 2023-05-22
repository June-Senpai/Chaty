import { getDocs,collection } from "firebase/firestore" //for gettin multiple documents
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { Post } from "./post";

export interface Post{
    id:string;
    userId:string;
    title:string;
    description:string;
    username:string;
}

export const Main=()=> {

    const postRef =collection(db,"posts");

    const [postsList,setPostsList]=useState<Post[] | null>(null);

    const getPosts=async ()=>{
        const data =await getDocs(postRef);
        setPostsList(
        data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]); 
        //as post[] means as this format like array format
        // console.log(data.docs.map(doc)=>({...doc.data(),id:doc.id}))
        //data was kinda weird to understand
        //docs is used to gv list of documents 
    }
    // getPosts();
    //using useeffect to call it once

    useEffect(()=>
    {
        getPosts()
    },[])

    return <div className="posts-container"> Home Page 
        {postsList?.map((post=> 
        <Post post={post} /> 
        ))}</div>
};