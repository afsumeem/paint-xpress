import React, { useState } from "react";
import { InputNumber, Slider, message } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  rating: number;
};

const Feedback = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data) {
      message.success(
        "Thank you for reaching out and providing us with valuable feedback."
      );
      reset();
    }
  };
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number | null) => {
    if (newValue !== null) {
      setInputValue(newValue);
    }
  };
  return (
    <div className="bg-black" id="feedback">
      <div className="parallax">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-white p-10 mt-36">
            <h2
              className="text-center font-semibold mb-5"
              style={{ color: "var(--blue)", fontSize: "25px" }}
            >
              Feedback
            </h2>
            <div className="flex w-full gap-5">
              <div>
                <input
                  {...register("firstName")}
                  required
                  placeholder="First Name"
                  className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
                />
              </div>
              <div className="">
                <input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
                />
              </div>
            </div>

            <input
              placeholder="Email"
              type="email"
              {...register("email")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />

            <textarea
              placeholder="Message"
              {...register("message")}
              required
              className="p-2 w-full my-2 rounded border-b-2 bg-inherit border-neutral-300"
            />

            <h2 className="text-md mt-4 ">How Great is our Service? </h2>

            <Slider
              min={1}
              max={5}
              onChange={onChange}
              className="w-full"
              value={typeof inputValue === "number" ? inputValue : 0}
            />

            <InputNumber
              {...register("rating")}
              required
              min={1}
              max={20}
              style={{
                margin: "0 16px",
                border: "1px solid rgb(206, 205, 205)",
              }}
              value={inputValue}
              onChange={onChange}
            />

            <button
              type="submit"
              className="px-6 py-2 block m-auto uppercase mt-6 text-white font-bold"
              style={{ backgroundColor: "var(--blue)" }}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
