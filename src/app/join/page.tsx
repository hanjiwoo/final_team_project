"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../shared/firebase";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// 토스티 import
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Join() {
	// const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [displayNameError, setDisplayNameError] = useState<string>("");
	// 체크리스트 부분 useState
	const [checkList, setCheckList] = useState<string[]>([]);
	const [buttonColor, setButtonColor] = useState<boolean>(false);
	// 체크리스트 전체 동의에 필요한 변수
	const checkAll = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.checked
			? setCheckList(["age", "terms", "collect"])
			: setCheckList([]);
	};
	const check = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.checked
			? setCheckList([...checkList, event.target.name])
			: setCheckList(
					checkList.filter((choice) => choice !== event.target.name)
			  );
	};

	// 약관 동의 부분 토스티파이
	const notify = () =>
		toast.error("약관을 동의 하세여 동의 어 보감~!", {
			transition: Slide,
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});

	useEffect(() => {
		if (
			checkList.includes("age") &&
			checkList.includes("terms") &&
			checkList.includes("collect")
		) {
			setButtonColor(true);
			console.log("여기는 진실");
		} else {
			setButtonColor(false);
			console.log("여기는 거짓");
		}
	}, [checkList]);

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
		if (name === "displayName") {
			setDisplayName(value);
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
		} else if (name === "displayName") {
			setDisplayNameError("");
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

		// 닉네임 글씨 제한
		const isNicknameValid = displayName.length > 1 && displayName.length <= 10;

		if (!isNicknameValid) {
			setDisplayNameError("닉네임은 2자 이상 10자 이하로 설정해야 합니다");
			return false;
		}
	};

	const handleClickSignUp = async (event: FormEvent) => {
		event.preventDefault();
		console.log("test");
		const nowDate = dayjs().format("YYYY년 MM월 DD일 HH:mm:ss");

		// 이메일 중복 확인
		const emailQuery = query(
			collection(db, "users"),
			where("email", "==", email)
		);
		console.log("emailQuery", emailQuery);

		const emailSnapshot = await getDocs(emailQuery);
		console.log("emailSnapshot", emailSnapshot.docs);
		console.log("이거이거", emailSnapshot.empty);

		if (!emailSnapshot.empty) {
			alert("이미 사용 중인 이메일입니다");
			console.log("사용중임");
			window.location.reload();
			return false;
		}

		// 닉네임 중복 확인
		const displayNameQuery = query(
			collection(db, "users"),
			where("displayName", "==", displayName)
		);

		const displayNameSnapshot = await getDocs(displayNameQuery);

		if (!displayNameSnapshot.empty) {
			alert("이미 사용 중인 닉네임입니다");
			window.location.reload();
			return false;
		}

		if (buttonColor === false) {
			event.preventDefault();
			notify();
			return false;
		}

		try {
			// 회원가입 후 Firestore 데이터베이스에 사용자 정보 추가
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Firestore 데이터베이스에 사용자 정보 추가
			await addDoc(collection(db, "users"), {
				userUid: user.uid,
				email,
				displayName,
				createAt: nowDate,
			});

			// Firebase 프로필 업데이트
			await updateProfile(user, {
				displayName: displayName,
			});

			console.log("회원가입 완료");
			alert(`${displayName}님 환영합니다`);
			// navigate("/login");
		} catch (error) {
			console.error("회원가입 실패", error);
		}
	};

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="bg-red-400">
				<h2 className="flex justify-center">회원가입</h2>
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
					<div>
						<label>닉네임</label>
						<input
							type="text"
							value={displayName}
							name="displayName"
							onChange={handleClickOnChange}
							required
							placeholder="2자 이상 10자 이하로 설정해주세요 :)"
							onBlur={handleBlur}
						></input>
					</div>
					{/* 약관 동의 부분 */}
					<div>
						<label>약관 동의</label>
						<div>
							<input
								type="checkbox"
								name="all"
								onChange={checkAll}
								checked={checkList.length === 3 ? true : false}
							/>
							<div>전체동의</div>
						</div>
						<div>
							<input
								type="checkbox"
								name="age"
								onChange={check}
								checked={checkList.includes("age") ? true : false}
							/>
							<div>
								<span>(필수)</span> 만 14세 이상입니다
							</div>
						</div>
						<div>
							<input
								type="checkbox"
								name="terms"
								onChange={check}
								checked={checkList.includes("terms") ? true : false}
							/>
							<div>
								<span>(필수)</span> 이용약관 동의
							</div>
						</div>
						<div>
							<input
								type="checkbox"
								name="collect"
								onChange={check}
								checked={checkList.includes("collect") ? true : false}
							/>
							<div>
								<span>(필수)</span> 개인정보 수집 및 이용 동의
							</div>
						</div>
					</div>
					{displayNameError && <div>{displayNameError}</div>}
					<button
						onClick={handleClickSignUp}
						className={buttonColor ? "text-green-500" : "text-slate-200"}
					>
						회원가입
					</button>
					<ToastContainer />
					<Link href="/login" className="cursor-pointer">
						로그인하기
					</Link>
				</form>
			</div>
		</div>
	);
}
