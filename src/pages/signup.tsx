import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { Alert, Spin, message } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { usePostUsersMutation } from "@/redux/features/users/usersApi";
// import { useRouter } from "next/navigation";

//
interface IFormInput {
  email: string;
  password: string;
  terms: boolean;
}

const SignUpPage = () => {
  //
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [postUsers, options] = usePostUsersMutation();

  //

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  console.log(user);
  //

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  //form submit handler

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // Create user using Firebase
      await createUserWithEmailAndPassword(data.email, data.password);

      const options = {
        email: data.email,
      };
      await postUsers(options);

      router.push("/profile");
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  if (loading) {
    return (
      <p>
        <Spin size="large" />
      </p>
    );
  }

  //
  return (
    <div>
      <Head>
        <title>Create a New Account</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isSuccess && (
        <Alert
          message="Create Account Successfully"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        />
      )}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(40,155,255,1) 0%, rgba(29,79,144,1) 63%, rgba(0,109,193,1) 99%)",
          padding: "40px",
          // minHeight:""
        }}
      >
        {/*  */}

        {/*  */}
        <div className={styles.form}>
          {error && (
            <div className="text-center">
              <p>Error Occurred!!</p>
              <p>{error.message}</p>
            </div>
          )}
          <h3 className="text-center font-bold my-4 text-2xl uppercase">
            Create Your Account
          </h3>

          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className="text-lg">
              Email
            </label>
            <br />
            <input
              type="email"
              className="text-black mb-8 w-full mt-2"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />

            <label htmlFor="" className="text-lg">
              Password
            </label>
            <br />
            <input
              className="text-black mb-8 w-full mt-2"
              placeholder="Password"
              type="password"
              required
              {...register("password", { required: true })}
            />

            {/*  */}
            <div className="flex flex-col md:flex-row  justify-between">
              <div>
                <input
                  className="text-black w-7"
                  type="checkbox"
                  id="terms"
                  required
                  {...register("terms", { required: true })}
                  value="Accept"
                />
                <label htmlFor="terms">Terms and Conditions</label>
              </div>
              <span className="underline text-blue-800 ml-4">
                <Link href="/policy">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white block mx-auto p-2 rounded w-full"
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

          <h4 className="text-center mt-4">
            Back to{" "}
            <Link href="/">
              <span className="underline text-blue-800">home</span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
