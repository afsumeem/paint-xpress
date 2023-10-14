import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import auth from "@/firebase/firebase.auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

//

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  //
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    signInWithEmailAndPassword(data.email, data.password);

    router.push("/");
  };

  //
  if (loading) {
    return <p>Loading...</p>;
  }
  //

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/" })
            }
          />

          <GithubOutlined
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000/" })
            }
          />
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Your Email</label>
          <input
            placeholder="Your Email"
            className="text-black"
            type="email"
            {...register("email", { required: true })}
          />
          <label htmlFor="">Your Password</label>
          <input
            placeholder="Your Password"
            className="text-black"
            type="password"
            {...register("password", { required: true })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      {error && (
        <div>
          <p>Error: {error?.message}</p>
        </div>
      )}
      {user && (
        <div>
          <p>Signed In User: {user.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
