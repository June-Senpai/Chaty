import { useForm } from "react-hook-form";
import * as yup from "yup"; //! yup is used for validation
import { yupResolver } from "@hookform/resolvers/yup"; //! for connectin reg. n yup
import { addDoc, collection } from "firebase/firestore"; //!addDoc is entry of new data
//! n collection is whch data we want to enter like whch one we referin to

import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("u must add a title"),
    description: yup.string().required("write something"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts"); //! for referin which stuff to get

  const onCreatePost = async (data: CreateFormData) => {
    //createformdata is the type of value
    // const onCreatePost =(data:any)=> {
    await addDoc(postRef, {
      ...data, //! instead of usin title n description use this
      //* title:data.title,
      //* description:data.description,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <div className="headingPost">Create a new post</div>
        <div className="titlePost">Title</div>
        <input placeholder="Title.." {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <div className="titlePost">Description</div>
        <textarea placeholder="Description.." {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" className="submitForm" />
      </form>
    </div>
  );
};
