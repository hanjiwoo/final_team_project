"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
	signInWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	OAuthProvider,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../shared/firebase";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [displayNameError, setDisplayNameError] = useState<string>("");

	// const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user !== null) {
			setDisplayName(user.displayName || null);
		}
	}, [user]);

	// 카카오 로그인
	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get("code");
		getToken(code);
	}, []);

	const getToken = async (code: string | null) => {
		try {
			const response = await axios({
				url: `https://kauth.kakao.com/oauth/token`,
				method: "post",
				params: {
					grant_type: "authorization_code",
					client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API,
					redirect_uri: "http://localhost:3000/login", // 수정된 부분
					code: code,
				},
			});

			const access_token = response.data.access_token;
			// 토큰을 사용할 수 있습니다. 원하는 작업을 수행하세요.
			console.log(access_token);
		} catch (error) {
			// 오류 처리
			console.error("Kakao 토큰 얻기 오류:", error);
		}
	};

	const handleClickOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = event;
		if (name === "email") {
			setEmail(value);
		}
		if (name === "password") {
			setPassword(value);
		}
	};

	const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name },
		} = event;

		// 에러 메시지 초기화
		if (name === "email") {
			setEmailError("");
		} else if (name === "password") {
			setPasswordError("");
		}

		// 이메일 형식이 아닌 경우
		const emailRegEx =
			/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
		const isEmailValid = emailRegEx.test(email);

		if (!isEmailValid) {
			setEmailError("유효하지 않은 이메일 형식입니다");
			return false;
		}

		// 비밀번호 길이 조건이 안 맞는 경우
		const isPasswordValid = password.length >= 5;

		if (!isPasswordValid) {
			setPasswordError("비밀번호는 6자 이상 사용해야 합니다");

			return false;
		}
	};

	const handleClickSignIn = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(userCredential);
			console.log("로그인완료");
			alert(`${displayName}님 안녕하세요`);
			// navigate("/");
		} catch (error) {
			alert("로그인에 실패했습니다");
			console.error(error);
		}
	};
	// 구글 로그인
	const signInWithGoogle = async () => {
		const googleProvider = new GoogleAuthProvider();

		signInWithPopup(auth, googleProvider)
			.then((res) => {
				const credential: any = GoogleAuthProvider.credentialFromResult(res);
				const token = credential.accessToken;
				const userName = res.user.displayName;
				const email = res.user.email;

				// local storage에 token, username 저장해주기
				console.log(token);
				console.log(userName);

				// navigate("/");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleClickGoogle = async (event: FormEvent) => {
		event.preventDefault();
		await signInWithGoogle();
	};

	//카카오 로그인
	const signInWithKakao = () => {
		const kakaoProvider = new OAuthProvider("https://kauth.kakao.com");

		signInWithPopup(auth, kakaoProvider)
			.then((res) => {
				const credential: any = OAuthProvider.credentialFromResult(res);
				const token = credential.accessToken;
				const userName = res.user.displayName;
				const email = res.user.email;

				// local storage에 token, username 저장해주기
				console.log(token);
				console.log(userName);

				// navigate("/");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleClickKakao = async (event: FormEvent) => {
		event.preventDefault();
		signInWithKakao();
	};

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="w-[360px]">
				<div className="mb-[52px]">
					<h1 className="flex justify-left text-[32px] font-bold leading-42px w-full text-left">
						로그인
					</h1>
					<span>
						따뜻한 마음을 모아 당신에게 드려요 :)
						<br />
						모두의 음식점, 모음
					</span>
				</div>
				<form className="flex justify-center flex-col items-center mb-[40px] gap-[16px]">
					<div className="flex flex-col w-full">
						<label className="test-[14px] leading-20px text-[#999]">
							이메일
						</label>
						<input
							className="h-[48px] px-[16px] rounded-[8px] border-solid border border-gray-400"
							type="email"
							value={email}
							name="email"
							onChange={handleClickOnChange}
							required
							placeholder="example@zum.com"
							onBlur={handleBlur}
						></input>
					</div>
					{emailError && (
						<div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">
							{emailError}
						</div>
					)}
					<div className="flex flex-col w-full">
						<label className="test-[14px] leading-20px text-[#999]">
							비밀번호
						</label>
						<input
							className="h-[48px] px-[16px] rounded-[8px] border-solid border border-gray-400"
							type="password"
							value={password}
							name="password"
							onChange={handleClickOnChange}
							required
							placeholder="영문 + 숫자 조합으로 6자 이상 입력해주세요 :)"
							onBlur={handleBlur}
						></input>
					</div>
				</form>
				{passwordError && (
					<div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">
						{passwordError}
					</div>
				)}
				<button
					onClick={handleClickSignIn}
					className="text-green-500 flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145]"
				>
					로그인
				</button>
				<div className="flex flex-col">
					<label>소셜계정으로 로그인</label>
					<div className="flex flex-col gap-[12px]">
						<div
							className="cursor-pointer text-green-500 flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#212121] bg-[#FFF]"
							onClick={handleClickGoogle}
						>
							구글 들어갈 자리
						</div>
						{/* <div className="cursor-pointer" onClick={handleClickKakao}>
								카카오 들어갈 자리
							</div> */}
						<Link
							href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=http://localhost:3000/login`}
							className="text-green-500 flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#212121] bg-[#FEE500]"
						>
							카카오로 로그인
						</Link>
					</div>
				</div>

				<Link href="/join" className="cursor-pointer">
					회원가입으로 이동
				</Link>
			</div>
		</div>
	);
}
