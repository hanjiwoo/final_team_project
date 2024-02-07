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

import Image from "next/image";
import rightIcon from "../../app/assets/images/icon/right.png";
import JoinModal from "@/components/join/JoinModal";
import { useRouter } from "next/navigation";

export default function Join() {
  // 화면 이동을 위한 useRouter()
  const router = useRouter();

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
    event.target.checked ? setCheckList(["age", "terms", "collect", "choice"]) : setCheckList([]);
  };
  const check = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setCheckList([...checkList, event.target.name])
      : setCheckList(checkList.filter((choice) => choice !== event.target.name));
  };
  // 약관 동의 부분 토스티파이
  const notify = () =>
    toast.error("약관을 동의 해주세요.", {
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

  // 약관 모달창 오픈
  // 만 14세 이상입니다
  const [openModal, setOpenModal] = useState<number | null>(null);

  const handleClickOpenModal = (id: number | null) => {
    setOpenModal(id);
  };

  useEffect(() => {
    if (checkList.includes("age") && checkList.includes("terms") && checkList.includes("collect")) {
      setButtonColor(true);
    } else {
      setButtonColor(false);
    }
  }, [checkList]);

  const handleClickOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
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
    handleBlur(event);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name }
    } = event;

    // input 밑에 에러 메시지 초기화
    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    } else if (name === "displayName") {
      setDisplayNameError("");
    }

    // 이메일 형식이 아닌 경우
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
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
    // console.log("test");
    const nowDate = dayjs().format("YYYY년 MM월 DD일 HH:mm:ss");

    // 이메일 중복 확인
    const emailQuery = query(collection(db, "users"), where("email", "==", email));
    // console.log("emailQuery", emailQuery);

    const emailSnapshot = await getDocs(emailQuery);
    // console.log("emailSnapshot", emailSnapshot.docs);
    // console.log("이거이거", emailSnapshot.empty);

    if (!emailSnapshot.empty) {
      toast.error("이미 사용 중인 이메일입니다", {
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

      // window.location.reload();
      return false;
    }

    // 닉네임 중복 확인
    const displayNameQuery = query(collection(db, "users"), where("displayName", "==", displayName));

    const displayNameSnapshot = await getDocs(displayNameQuery);

    if (!displayNameSnapshot.empty) {
      toast.error("이미 사용 중인 닉네임입니다", {
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
      // window.location.reload();
      return false;
    }

    if (buttonColor === false) {
      event.preventDefault();
      notify();
      return false;
    }

    try {
      // 회원가입 후 Firestore 데이터베이스에 사용자 정보 추가
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore 데이터베이스에 사용자 정보 추가
      await addDoc(collection(db, "users"), {
        userUid: user.uid,
        email,
        displayName,
        createAt: nowDate
      });

      // Firebase 프로필 업데이트
      await updateProfile(user, {
        displayName: displayName,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/final-team-project-7f44d.appspot.com/o/Favicon_32_32.png?alt=media&token=ad812272-8f64-44d2-b230-89badd14baa5"
      });

      console.log("회원가입 완료");
      // alert(`${displayName}님 환영합니다`);
      // 회원가입 성공 토스티파이
      router.push("/login"); // router.replace & router.push 로 수정 필요!
      toast.success(`${displayName}님 환영합니다`, {
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
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full my-[60px]">
      <div className="w-[360px]">
        <div className="mb-[52px] flex flex-col gap-[16px]">
          <h1 className="flex justify-left text-[32px] font-bold leading-42px w-full text-left text-[#212121]">
            회원가입
          </h1>
          <span className="text-[#5C5C5C] text-[18px] leading-[26px] font-semibold">
            따뜻한 마음을 모아 당신에게 드려요 :)
            <br />
            모두의 음식점, 모음
          </span>
        </div>
        <section className="flex justify-center flex-col items-center mb-[40px] gap-[16px]">
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
              placeholder="영문 + 숫자 조합으로 6자 이상 입력해주세요 :)"
              onBlur={handleBlur}
            ></input>
          </div>
          {passwordError && (
            <div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">{passwordError}</div>
          )}
          <div className="flex flex-col w-full">
            <label className="test-[14px] leading-20px text-[#999]">닉네임</label>
            <input
              className="h-[48px] px-[16px] rounded-[8px] border-solid border border-gray-400"
              type="text"
              value={displayName}
              name="displayName"
              onChange={handleClickOnChange}
              required
              placeholder="2자 이상 10자 이하로 설정해주세요 :)"
              onBlur={handleBlur}
            ></input>
          </div>
          {displayNameError && (
            <div className="text-[#FF8145] mt-[-18px] mb-[-19px] text-[14px] w-full">{displayNameError}</div>
          )}
        </section>
        {/* 약관 동의 부분 */}
        <div className="flex flex-col w-full gap-[16px] mb-[32px]">
          <label className="test-[16px] text-[#212121] font-[600]">약관 동의</label>
          <div className="flex items-center">
            <input
              className="mr-[12px] accent-[#FF8145] text-[#fff] w-[20px] h-[20px] "
              type="checkbox"
              name="all"
              onChange={checkAll}
              checked={checkList.length === 4 ? true : false}
            />
            <div className="text-[#5C5C5C]">전체동의</div>
          </div>
          <div className="border border-gray-300"></div>
          <div className="flex items-center">
            <input
              className="mr-[12px] accent-[#FF8145] text-[#fff] w-[20px] h-[20px] inclu"
              type="checkbox"
              name="age"
              onChange={check}
              checked={checkList.includes("age") ? true : false}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#5C5C5C]">(필수) 만 14세 이상입니다</span>
              <Image
                width={100}
                height={100}
                src={rightIcon}
                alt="nextPage"
                className="w-[18px] h-[18px] cursor-pointer"
                id="1"
                onClick={() => handleClickOpenModal(1)}
              />
              {openModal && <JoinModal setOpenModal={setOpenModal} id={openModal} />}
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="mr-[12px] accent-[#FF8145] text-[#fff] w-[20px] h-[20px]"
              type="checkbox"
              name="terms"
              onChange={check}
              checked={checkList.includes("terms") ? true : false}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#5C5C5C]">(필수) 이용약관 동의 </span>
              <Image
                width={100}
                height={100}
                src={rightIcon}
                alt="nextPage"
                className="w-[18px] h-[18px] cursor-pointer"
                id="2"
                onClick={() => handleClickOpenModal(2)}
              />
              {openModal && <JoinModal setOpenModal={setOpenModal} id={openModal} />}
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="mr-[12px] accent-[#FF8145] text-[#fff] w-[20px] h-[20px]"
              type="checkbox"
              name="collect"
              onChange={check}
              checked={checkList.includes("collect") ? true : false}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#5C5C5C]">(필수) 개인정보 수집 및 이용 동의 </span>
              <Image
                width={100}
                height={100}
                src={rightIcon}
                alt="nextPage"
                className="w-[18px] h-[18px] cursor-pointer"
                id="3"
                onClick={() => handleClickOpenModal(3)}
              />
              {openModal && <JoinModal setOpenModal={setOpenModal} id={openModal} />}
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="mr-[12px] accent-[#FF8145] text-[#fff] w-[20px] h-[20px]"
              type="checkbox"
              name="choice"
              onChange={check}
              checked={checkList.includes("choice") ? true : false}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#5C5C5C]">(선택) 마케팅 개인정보 제3자 제공 동의 </span>
              <Image
                width={100}
                height={100}
                src={rightIcon}
                alt="nextPage"
                className="w-[18px] h-[18px] cursor-pointer"
                id="4"
                onClick={() => handleClickOpenModal(4)}
              />
              {openModal && <JoinModal setOpenModal={setOpenModal} id={openModal} />}
            </div>
          </div>
        </div>
        <button
          onClick={handleClickSignUp}
          className={
            buttonColor
              ? "flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145]"
              : "flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#999] bg-[#d6d6d6]"
          }
        >
          회원가입
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
