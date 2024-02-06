"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileImage from "../../assets/images/icon/profile.png";
import cameraImage from "../../assets/images/icon/camera.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { updateNickname, updatePhoto } from "@/redux/modules/loginSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/shared/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.login);
  const { displayName, email, uid, photoURL, isLogin, isKakao } = user;
  const [ImageURL, setImageURL] = useState("");
  const [imgFile, setImagFile] = useState<File>();
  const [text, setText] = useState({ nickName: "", password: "" });
  const dispatch = useDispatch();
  // console.log(photoURL, ImageURL, displayName, "이게 어떻게 찍히길래");
  const router = useRouter();
  const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0].size, "사이즈확인");
    if (e.target.files) {
      if (e.target.files[0].size > 1000000) {
        return toast.warning("파일이 너무 큽니다.");
      }
    }
    if (e.target.files) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      // console.log(fileURL, "오케");
      setImageURL(fileURL);
      setImagFile(e.target.files[0]);
    }
  };
  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setText({ ...text, [name]: value });
    // console.log(text);
  };
  const saveHandler = async () => {
    if (!text.nickName || !text.password || !imgFile)
      return toast.error("변경할 닉네임과 비밀번호 PHOTO를 정해주세요.", {
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
    if (auth.currentUser) {
      const storageRef = ref(storage, `${auth.currentUser.uid}/profile`);
      if (imgFile) {
        await uploadBytes(storageRef, imgFile);
      }
      try {
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, {
          displayName: text.nickName,
          photoURL: downloadURL
        });
        await updatePassword(auth.currentUser, text.password);

        dispatch(updateNickname(text.nickName));
        dispatch(updatePhoto(downloadURL));
        toast.success("적용완료");
      } catch (error) {
        toast.error(`${error} 변경을 위해서 재로그인이 필요합니다.`);
      }

      // console.log(downloadURL, "요거좀 궁금하다.");
      // console.log(downloadURL, "요거좀 궁금하다.");

      router.push("/mypage");
    }
  };
  useEffect(() => {
    // console.log("확인중", auth.currentUser?.getIdToken(), "토큰 있나?", auth.currentUser, " 흐음");
  }, []);
  if (!isLogin) {
    return <div>로그인을 해주세요.</div>;
  }
  if (isKakao) {
    return <div> 카카오 접속자는 이용하실수 없습니다.</div>;
  }
  return (
    <>
      {/* <Image src={ImageURL} width={100} height={100} alt="zz" /> */}
      <div className="flex justify-center items-center my-[60px] px-[20px]">
        {/* <Image src={photoURL} width={100} height={100} alt="zz" /> */}
        <div className="flex flex-col justify-center items-center w-[350px] h-[545px]">
          <div>
            <label>
              <div className="w-[100px] h-[100px] overflow-hidden rounded-full cursor-pointer">
                {isLogin ? (
                  <img src={ImageURL ? ImageURL : photoURL} className="w-full h-full rounded-full" alt="흐음" />
                ) : (
                  <Image src={profileImage} alt="more" className="w-full h-full" />
                )}
              </div>
              <Image
                src={cameraImage}
                alt="profileImageEditButton"
                className="w-[32px] h-[32px] relative top-[-30px] right-[-70px] cursor-pointer"
              />
              <input className="hidden" type="file" accept="image/*" onChange={(e) => imgChangeHandler(e)} />
            </label>
          </div>
          <div className="flex flex-col w-full mb-[40px] mt-[40px] gap-[16px]">
            <div className="flex flex-col w-full gap-[8px]">
              <label className="text-[14px] leading-20px text-[#999]">이메일</label>
              <div className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2] flex items-center bg-[#F1F1F1] text-[#C2C2C2]">
                example@moeum.com
              </div>
            </div>
            <div className="flex flex-col w-full gap-[8px]">
              <label className="text-[14px] leading-20px text-[#999]">닉네임</label>
              <input
                onChange={(e) => textChangeHandler(e)}
                className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2]"
                type="text"
                name="nickName"
                required
                placeholder="모두의 모음"
              ></input>
            </div>
            <div className="flex flex-col w-full gap-[8px]">
              <label className="text-[14px] leading-20px text-[#999]">비밀번호</label>
              <input
                onChange={(e) => textChangeHandler(e)}
                className="h-[48px] px-[16px] rounded-[8px] border-solid border border-[#C2C2C2]"
                type="password"
                name="password"
                required
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={saveHandler}
              className=" flex justify-center w-full rounded-[8px] h-[48px] items-center text-[#fff] bg-[#FF8145] mb-[36px]"
            >
              저장하기
            </button>
          </div>
          <div className="w-full">
            <Link
              href={"/mypage/edit/delete"}
              className="text-neutral-400 text-sm font-medium leading-tight underline decoration-solid cursor-pointer"
            >
              탈퇴하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
