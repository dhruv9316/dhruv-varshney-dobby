import React from "react";

const AuthForm = ({handleOnSubmit, handleOnChange, formData, btnTxt}) => {
  const { email, password } = formData;

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="flex w-full flex-col mx-auto gap-y-4"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]">Email</p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter your email"
            className="w-full rounded-[0.5rem] p-[12px] "
          />
        </label>

        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">Password</p>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="w-full rounded-[0.5rem] p-[12px] pr-12 "
          />
        </label>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          {btnTxt}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
