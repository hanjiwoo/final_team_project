"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  OAuthProvider
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../shared/firebase";
import axios from "axios";
import { Router } from "next/router";
import Image from "next/image";
import GoogleLogo from "../assets/images/icon/google.png";
import KakaoLogo from "../assets/images/icon/kakaotalk.png";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/modules/loginSlice";
import { getProviders } from "next-auth/react";

import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=http://localhost:3000/login&response_type=code`;
  // const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [displayNameError, setDisplayNameError] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const auth = getAuth();
  const user = auth.currentUser;
  const supabaseClient = useSupabaseClient();
  // 화면 이동을 위한 useRouter()
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      setDisplayName(user.displayName || null);
    }
  }, [user]);

  // 카카오 로그인 부분 토스티파이
  // const notify = () =>
  //   toast.error("카카오 로그인은 추후 지원 예정입니다", {
  //     transition: Slide,
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored"
  //   });

  // 카카오 로그인
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    getToken(code);
  }, []);

  const getToken = async (code: string | null) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 성공적으로 로그인했을 때 사용자 정보 저장
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      );
      setLoginStatus(true); // 로그인 상태를 true 값으로 저장

      console.log("로그인완료");
      console.log(loginStatus);
      alert(`${user.displayName}님 안녕하세요`);
      window.location.href = "/";

      const response = await axios({
        url: `https://kauth.kakao.com/oauth/token`,
        method: "post",
        params: {
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API,
          redirect_uri: "http://localhost:3000/login",
          code: code
        }
      });

      const access_token = response.data.access_token;
      // 토큰을 사용할 수 있습니다. 원하는 작업을 수행하세요.
      console.log(access_token);
    } catch (error) {
      // 오류 처리
      //   console.error("Kakao 토큰 얻기 오류:", error);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // 엔터 키를 눌렀을 때 로그인 동작 수행
      handleClickSignIn(event);
    }
  };

  const handleClickOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
      handleBlur(event);
    }
    if (name === "password") {
      setPassword(value);
      handleBlur(event);
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name }
    } = event;

    // 에러 메시지 초기화
    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }

    // 이메일 형식이 아닌 경우
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegEx.test(email);

    if (!isEmailValid) {
      setEmailError("유효하지 않은 이메일 형식입니다.");
      return false;
    }

    // 비밀번호 길이 조건이 안 맞는 경우
    const isPasswordValid = password.length >= 5;

    if (!isPasswordValid) {
      setPasswordError("비밀번호는 6자 이상 사용해야 합니다.");

      return false;
    }
  };

  const handleClickSignIn = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //  console.log(userCredential.user)
      // 성공적으로 로그인했을 때 사용자 정보 저장
      const user = userCredential.user;
      //
      //   console.log(user, "유저를 찍어보아요");
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      );
      setLoginStatus(true); // 로그인 상태를 true 값으로 저장
      const { uid, displayName, email: email1, photoURL } = user;
      dispatch(login({ uid, displayName, email1, photoURL }));
      console.log("로그인완료");
      console.log(loginStatus);
      // alert(`${user.displayName}님 안녕하세요`);
      // 로그인 성공 토스티파이
      toast.success(`${user.displayName}님 안녕하세요`, {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      router.replace("/");
    } catch (error) {
      toast.error("로그인에 실패했습니다", {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      console.error(error);
    }
  };

  // 구글 로그인
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, googleProvider);

      // Google 로그인 성공 시
      const credential: any = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const userName = res.user.displayName;
      //   const email = res.user.email;
      const { uid, email, displayName, photoURL } = res.user;
      // local storage에 token, username 저장
      setLoginStatus(true); // 로그인 상태를 true 값으로 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: userName,
          email: email,
          accessToken: token
        })
      );
      dispatch(login({ uid, email, displayName, photoURL }));
      //   console.log(res, "요거 확인해봅시다.");
      //   console.log("Google 로그인 성공");
      // alert(`${displayName}님 안녕하세요`);
      // 로그인 성공 토스티파이
      toast.success(`${displayName}님 안녕하세요`, {
        transition: Slide,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });

      router.replace("/");
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  const handleClickGoogle = async (event: FormEvent) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  //카카오 로그인
  // const signInWithKakao = () => {
  // 	const kakaoProvider = new OAuthProvider("https://kauth.kakao.com");

  // 	signInWithPopup(auth, kakaoProvider)
  // 		.then((res) => {
  // 			const credential: any = OAuthProvider.credentialFromResult(res);
  // 			const token = credential.accessToken;
  // 			const userName = res.user.displayName;
  // 			const email = res.user.email;

  // 			// local storage에 token, username 저장해주기
  // 			console.log(token);
  // 			console.log(userName);

  // 			// navigate("/");
  // 		})
  // 		.catch((error) => {
  // 			console.error(error);
  // 		});
  // };

  // const handleClickKakao = async (event: FormEvent) => {
  // 	event.preventDefault();
  // 	signInWithKakao();
  // };

  // 추가된 부분
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      // console.log(res);
      setProviders(res);
    })();
  }, []);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    // console.log(emailRef.current);
    // console.log(passwordRef.current);
    const result = await signIn("credentials", {
      username: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/"
    });
    console.log(result);
  };

  // 추가된 부분
  const handleKakao = async () => {
    const result = await signIn("kakao", {
      redirect: true,
      callbackUrl: "/"
    });
    // console.log(result, "로그인 결과");
  };
  // 추가된 부분
  const logoutHandle = async () => {
    const res = await signOut();
    console.log(res, "결과");
  };
  return (
    <div className="flex justify-center items-center w-full my-[60px] bg-[#fff]">
      <div className="w-[360px]">
        <div className="mb-[52px] flex gap-[16px] flex-col">
          <h1 className="flex justify-left text-[32px] font-bold leading-42px w-full text-left text-[#212121]">
            로그인
          </h1>
          <span className="text-[#5C5C5C] text-[18px] leading-[26px] font-semibold">
            따뜻한 마음을 모아 당신에게 드려요 :)
            <br />
            모두의 음식점, 모음
          </span>
        </div>
        <form className="flex justify-center flex-col items-center mb-[40px] gap-[16px]" onKeyDown={handleKeyDown}>
          <div className="flex flex-col w-full">
            <label className="test-[14px] leading-20px text-[#999]">이메일</label>
            <input
              className="h-[48px] px-[16px] rounded-[8px] border-solid border border-gray-400"
              type="email"
              value={email}
              name="email"
              onChange={handleClickOnChange}
              required
              placeholder="example@moeum.com"
              onBlur={handleBlur}
            ></input>
          </div>
          {emailError && <div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">{emailError}</div>}
          <div className="flex flex-col w-full">
            <label className="test-[14px] leading-20px text-[#999]">비밀번호</label>
            <input
              className="h-[48px] px-[16px] rounded-[8px] border-solid border border-gray-400"
              type="password"
              value={password}
              name="password"
              onChange={handleClickOnChange}
              required
              placeholder="비밀번호를 입력해주세요"
              onBlur={handleBlur}
            ></input>
          </div>
        </form>
        {passwordError && (
          <div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">{passwordError}</div>
        )}
        <button
          onClick={handleClickSignIn}
          className=" flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145] mb-[24px]"
        >
          로그인
        </button>
        <div className="flex flex-col">
          <div>
            <div className="flex justify-center text-[14px] font-[500] gap-[8px] text-[#999]">
              아직 모음의 회원이 아니신가요?
              <Link href="/join" className="text-[#FF8145] font-[600]">
                회원가입
              </Link>
            </div>
          </div>

          <div className="w-full gap-[16px] flex flex-justify items-center mb-[24px] mt-[36px]">
            <div className="border-[1px] border-[#D6D6D6] w-full my-[1%]" />
            <span className="font-[500] text-[#999] w-[70%] text-center">간편 로그인</span>
            <div className="border-[1px] border-[#D6D6D6] w-full my-[1%]" />
          </div>

          <div className="flex flex-col gap-[12px]">
            <div
              className="cursor-pointer  flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#212121] bg-[#FFF] gap-[12px] border-solid border border-gray-300"
              onClick={handleClickGoogle}
            >
              <Image width={100} height={100} src={GoogleLogo} alt="googleLogo" className="w-[20px] h-[20px]" />
              구글로 시작하기
            </div>
            {/* <div className="cursor-pointer" onClick={handleClickKakao}>
								카카오 들어갈 자리
							</div> */}
            {/* <Link
							href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=http://localhost:3000/login`}
							className=" flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#212121] bg-[#FEE500]"
						>
							카카오로 로그인
						</Link> */}
            <div
              // onClick={() => {
              //   notify();
              // }}
              onClick={handleKakao}
              className="cursor-pointer flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#212121] bg-[#FEE500] gap-[12px]"
            >
              <Image width={100} height={100} src={KakaoLogo} alt="KakaoLogo" className="w-[20px] h-[20px]" />
              카카오로 로그인
            </div>
            {/* <button className="bg-red-500" onClick={logoutHandle}>
              로그아웃{" "}
            </button> */}
            {/* <div className="h-full flex justify-center items-center">
              <Auth
                supabaseClient={supabaseClient}
                appearance={{
                  theme: ThemeSupa,
                  style: { container: { width: "300px" } }
                }}
                providers={["kakao"]}
                localization={{}}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
