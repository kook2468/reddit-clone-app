import React, { FormEvent, useState } from "react";
import InputGroup from "@/components/InputGroup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "@/context/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  let router = useRouter();
  if (authenticated) router.push("/"); //인증 되있으면 메인페이지로 이동

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        {
          withCredentials: true,
        }
      );

      dispatch("LOGIN", res.data?.user);

      router.push("/");
    } catch (error: any) {
      console.error(error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              로그인
            </button>
          </form>
          <small>
            아직 아이디가 없나요?
            <Link href="/register">
              <span className="ml-1 text-blue-500 uppercase">회원가입</span>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
