import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { message } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

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
        <h3 className="text-center font-bold my-4 text-xl">
          Create Your Account
        </h3>

        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="" className="text-left">
            Your Email
          </label>
          <input
            type="email"
            className="text-black mb-4"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <label htmlFor="" className="text-left">
            Your Password
          </label>
          <input
            className="text-black mb-4"
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="bg-black text-white block mx-auto p-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <Link href="/login">
          <h4 className="text-center mt-4">
            Already have an account?{" "}
            <span className="underline text-blue-800">Login</span>
          </h4>
        </Link>

        <h4 className="text-center text-xl font-mono mt-10">
          Back to{" "}
          <Link href="/">
            <span className="underline text-blue-800">home</span>
          </Link>
        </h4>
      </div>
      {error && (
        <div className="text-center">
          <p>Error: {error.message}</p>
        </div>
      )}
      {user && (
        <div>
          <p className="text-center">Registered User: {user.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
