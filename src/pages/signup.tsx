import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { message } from "antd";
import { useRouter } from "next/router";

//
interface IFormInput {
  email: string;
  password: string;
}

const SignUpPage = () => {
  //
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  // console.log(user);

  //

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
    if (user) {
      message.success("user signup successfully");
    }
    router.push("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  //
  return (
    <div>
      <Head>
        <title>SignUp</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>

        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            className="text-black"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <label htmlFor="">Your Password</label>
          <input
            className="text-black"
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
      {user && (
        <div>
          <p>Registered User: {user.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
