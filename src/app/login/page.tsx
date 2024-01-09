"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
	signInWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../shared/firebase";

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

	// 깃허브 로그인
	const signInWithGithub = async () => {
		const githubProvider = new GithubAuthProvider();

		signInWithPopup(auth, githubProvider)
			.then((res) => {
				const credential: any = GithubAuthProvider.credentialFromResult(res);
				const token = credential.accessToken;
				const userName = res.user.displayName;

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
		// event.preventDefault();
		// await signInWithGithub();
	};

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="bg-red-400">
				<h2 className="flex justify-center">로그인</h2>
				<form className="flex justify-center flex-col items-center">
					<div>
						<label>이메일</label>
						<input
							type="email"
							value={email}
							name="email"
							onChange={handleClickOnChange}
							required
							placeholder="example@zum.com"
							onBlur={handleBlur}
						></input>
					</div>
					{emailError && <div>{emailError}</div>}
					<div>
						<label>비밀번호</label>
						<input
							type="password"
							value={password}
							name="password"
							onChange={handleClickOnChange}
							required
							placeholder="영문 + 숫자 조합으로 6자 이상 입력해주세요 :)"
							onBlur={handleBlur}
						></input>
					</div>
					{passwordError && <div>{passwordError}</div>}
					<button onClick={handleClickSignIn}>로그인</button>
					<div>
						<label>소셜계정으로 로그인</label>
						<div className="flex">
							<div className="cursor-pointer" onClick={handleClickGoogle}>
								구글 들어갈 자리
							</div>
							<div className="cursor-pointer" onClick={handleClickKakao}>
								카카오 들어갈 자리
							</div>
						</div>
					</div>

					<Link href="/join" className="cursor-pointer">
						회원가입으로 이동
					</Link>
				</form>
			</div>
		</div>
	);
}
