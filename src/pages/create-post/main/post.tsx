import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;

  const [user] = useAuthState(auth);

  // const [likeAmount,setlikeAmount]=useState<number | null>(null) //before addin
  //interface like
  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes"); //! for referin which stuff to get

  // const likesDoc = query(likesRef, where("postId", "==", post.id));
  // //making a query , specificing which collection we talking about
  // //where postId==post id

  // const getLikes = async () => {
  //   const data = await getDocs(likesDoc); //specifing whch doc we want
  //   // console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  //   // setlikeAmount(data.docs.length) before interface like
  //   setLikes(
  //     data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
  //   );
  // };

  const addLike = async () => {
    //createformdata is the type of value
    // const onCreatePost =(data:any)=> {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for excuting in real time
  //if prev is not null then add to empty array (thr is something in array)
  //if null set likes to be single array with userid=uid

  // const removeLike = async () => {
  //   try {
  //     const likeToDeleteQuery = query(
  //       likesRef,
  //       where("postId", "==", post.id),
  //       where("userId", "==", user?.uid)
  //     );

  //     const likeToDeleteData = await getDocs(likeToDeleteQuery);

  //       const likeId=likeToDeleteData.docs[0].id

  //     const likeToDelete = doc(db, "likes", likeId)
  //       await addDoc(likesRef,{userId:user?.uid,postId:post.id})
  //      if (user) {
  //       // setLikes((prev)=> //! 48.23
  //        setLikes( (prev) => prev && prev.filter((like) => like.likeId !== likeId));
  //   }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const hasUserLiked= likes?.find((like)=>like.userId===user?.uid)

  // useEffect(()=>{
  //     getLikes()
  // },[])

  return (
    <div className="post-container ">
      <div className="title">
        <span>{post.title}</span>
      </div>
      <div className="body description">
        <p>{post.description}</p>
      </div>
      <div className="footer ">
        <p>From @{post.username}</p>
        {/* <button onClick={hasUserLiked ? addLike : removeLike }> */}
        <button onClick={addLike} className="likeButton">
          {/* {hasUserLiked ? <>👍</>: <>👎</> } */}
          <>👍</>
        </button>
        {/* {likeAmount && <p>Likes: {likeAmount}</p>} */}
        {likes && <p> Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
