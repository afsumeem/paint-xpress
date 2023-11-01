import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import auth from "@/firebase/firebase.auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Spin } from "antd";
import Link from "next/link";
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

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);

      router.push("/profile");
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
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
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(40,155,255,1) 0%, rgba(29,79,144,1) 63%, rgba(0,109,193,1) 99%)",
          padding: "40px",
          height: "100vh",
        }}
      >
        <div className={styles.form}>
          <h3 className="text-center font-bold my-4 text-2xl">
            LOGIN TO CONTINUE
          </h3>

          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className="text-lg">
              Email
            </label>
            <br />
            <input
              type="email"
              className="text-black mb-4 w-full mt-2"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />

            <label htmlFor="" className="text-lg">
              Password
            </label>
            <br />
            <input
              className="text-black w-full mt-2 mb-2"
              placeholder="Password"
              type="password"
              required
              {...register("password", { required: true })}
            />

            <button
              type="submit"
              className=" text-white block mx-auto p-2 rounded w-full"
              style={{ backgroundColor: "var(--blue)" }}
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

          <h4 className="text-center  ">
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
    </div>
  );
};

export default LoginPage;
