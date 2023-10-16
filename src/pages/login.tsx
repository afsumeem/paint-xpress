import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import auth from "@/firebase/firebase.auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Link from "next/link";
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

    router.push("/profile");
  };

  //
  if (loading) {
    return <Spin size="large" />;
  }
  //

  return (
    <div>
      <Head>
        <title>Login to your Account</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*  */}

      <div className={styles.form}>
        <h3 className="text-center font-bold my-4 text-xl">
          LOGIN TO CONTINUE
        </h3>

        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="" className="text-left">
            Your Email
          </label>
          <input
            placeholder="Your Email"
            className="text-black mb-4 w-full"
            type="email"
            required
            {...register("email", { required: true })}
          />
          <label htmlFor="" className="text-left">
            Your Password
          </label>
          <input
            placeholder="Your Password"
            className="text-black mb-4 w-full"
            type="password"
            required
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="bg-black text-white block mx-auto p-2 rounded"
          >
            Login
          </button>
        </form>
        <Link href="/signup">
          <h4 className="text-center mt-4">
            Dont have an account?{" "}
            <span className="underline text-blue-800">SignUp</span>
          </h4>
        </Link>
        <div className={styles.icons}>
          <GithubOutlined
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000/" })
            }
          />

          <GoogleOutlined
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/" })
            }
          />
        </div>

        {/*  */}
        <h4 className="text-center text-xl font-mono">
          Back to{" "}
          <Link href="/">
            <span className="underline text-blue-800">home</span>
          </Link>
        </h4>
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
