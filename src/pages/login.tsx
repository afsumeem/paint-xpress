import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import auth from "@/firebase/firebase.auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Icon, { CopyOutlined } from "@ant-design/icons";

//

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  // user
  const [userId, setUserId] = useState("user@paintxpress.com");
  const [password, setPassword] = useState("abcd1234");
  const [userIdCopied, setUserIdCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // admin
  const [adminId, setAdminId] = useState("admin@paintxpress.com");
  const [adminPassword, setAdminPassword] = useState("abcd1234");
  const [adminIdCopied, setAdminIdCopied] = useState(false);
  const [adminPasswordCopied, setAdminPasswordCopied] = useState(false);

  // user
  const handleCopyUserId = () => {
    setUserIdCopied(true);
    setTimeout(() => setUserIdCopied(false), 1000);
  };

  const handleCopyPassword = () => {
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 1000);
  };

  // admin
  const handleCopyAdminId = () => {
    setAdminIdCopied(true);
    setTimeout(() => setAdminIdCopied(false), 1000);
  };

  const handleCopyAdminPassword = () => {
    setAdminPasswordCopied(true);
    setTimeout(() => setAdminPasswordCopied(false), 1000);
  };

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
          // height: "100vh",
        }}
      >
        <div className={styles.form}>
          <div className="block m-auto">
            <h3 className="text-center font-bold my-4 text-2xl">
              LOGIN TO CONTINUE
            </h3>
          </div>

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

          <h4 className="text-center mb-2 ">
            Back to{" "}
            <Link href="/">
              <span className="underline text-blue-800">home</span>
            </Link>
          </h4>
          <div className={styles.userCredential}>
            <h3 className=" font-semibold my-1 text-center text-md">
              User Credential
            </h3>
            <hr />
            <div className="flex justify-around py-1">
              <p>
                <span className="mr-5">{userId}</span>
                <CopyToClipboard text={userId} onCopy={handleCopyUserId}>
                  <CopyOutlined />
                </CopyToClipboard>
                {userIdCopied ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    Copied
                  </span>
                ) : null}
              </p>
              <p>
                <span className="mr-5">{password}</span>
                <CopyToClipboard text={password} onCopy={handleCopyPassword}>
                  <CopyOutlined />
                </CopyToClipboard>
                {passwordCopied ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    Copied
                  </span>
                ) : null}
              </p>
            </div>
            <hr />
            {/* admin credential */}
            <div className="flex justify-around pt-1">
              <p>
                <span className="mr-5">{adminId}</span>
                <CopyToClipboard text={adminId} onCopy={handleCopyAdminId}>
                  <CopyOutlined />
                </CopyToClipboard>
                {adminIdCopied ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    Copied
                  </span>
                ) : null}
              </p>
              <p>
                <span className="mr-5">{adminPassword}</span>
                <CopyToClipboard
                  text={adminPassword}
                  onCopy={handleCopyAdminPassword}
                >
                  <CopyOutlined />
                </CopyToClipboard>
                {adminPasswordCopied ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    Copied
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>

        {/*  */}
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
