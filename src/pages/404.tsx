import { useRouter } from "next/router";
import Image from "next/image";
import errorImg from "@/assests/images/404_page_cover.jpg";

const NotFoundPage = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 200);
  return (
    <div>
      <Image
        src={errorImg}
        height={500}
        width={900}
        className="block m-auto"
        alt="page not found"
      />
    </div>
  );
};

export default NotFoundPage;

//
