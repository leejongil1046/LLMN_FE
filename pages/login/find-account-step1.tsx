// 외부 라이브러리
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

// 프로젝트 내부 훅과 유틸리티 함수
import useEmailCheck from "@/src/hooks/login/use-email-check";
import { cls } from "@/src/utils/class-utils";

// 프로젝트 내부 컴포넌트
import Logo from "@/src/components/commons/logo";
import Input from "@/src/components/commons/input";
import ButtonLarge from "@/src/components/commons/button-large";

export default function FindAccountStep1() {
  const router = useRouter();

  const {
    email,
    code,
    isValidEmail,
    isValidCode,
    emailMsg,
    codeMsg,
    timer,
    handleEmailChange,
    handleCodeChange,
    verifyEmail,
    resendCode,
  } = useEmailCheck("recovery");

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(isValidEmail && isValidCode ? false : true);
  }, [isValidEmail, isValidCode]);

  const handleNextButton = (): void => {
    if (disabled) return;
    sessionStorage.setItem("code", code);
    router.push("/login/find-account-step2");
  };

  return (
    <>
      <Head>
        <title>LLMN - Find Account step1</title>
      </Head>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto full-height gap-8 xs:gap-9 sm:gap-10 pt-[15vh] pb-[15vh] px-6 overflow-y-scroll overflow-x-hidden scrollbar-hide">
        <Logo />
        <div className="flex flex-col justify-start items-center relative w-full mt-8 xs:mt-9 sm:mt-10">
          <Input
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={handleEmailChange}
            readOnly={isValidEmail ? true : false}
          />
          <div className="flex flex-row justify-between items-center absolute top-[45px] xs:top-[50px] sm:top-[55px] w-full">
            <div
              className={cls(
                "text-[12px] xs:text-[13px] sm:text-[14px] font-semibold",
                isValidEmail
                  ? "visible text-blue-400"
                  : !isValidEmail && email.trim()
                  ? "visible text-red-400"
                  : "hidden"
              )}
            >
              {emailMsg}
            </div>
            <div
              className={cls(
                "text-[14px] xs:text-[15px] sm:text-[16px] font-semibold transition-colors",
                isValidEmail ? "visible" : "hidden",
                timer === 0
                  ? "text-[#717478] cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              )}
              onClick={() => resendCode()}
            >
              재전송하기
            </div>
          </div>
        </div>
        {!isValidEmail ? (
          <ButtonLarge
            label="중복확인"
            kind="check"
            onClick={() => verifyEmail()}
          />
        ) : (
          <>
            <div className="flex flex-row justify-center items-center w-full text-[13px] xs:text-[14px] sm:text-[15px] text-center py-3 xs:py-4 sm:py-5 mt-1 xs:mt-2 sm:mt-3 -mb-3 xs:-mb-4 sm:-mb-5 bg-[#F8F9FA] rounded-lg">
              해당 이메일로 인증코드를 전송하였습니다.
              <br />
              아래에 인증코드를 입력해주세요.
            </div>
            <div className="flex flex-col justify-start items-center relative w-full mt-2.5 xs:mt-3 sm:mt-3.5 mb-2 xs:mb-3 sm:mb-4">
              <Input
                type="code"
                label=""
                placeholder="인증 코드를 입력해주세요."
                value={code}
                onChange={handleCodeChange}
              />
              <div
                className={cls(
                  "flex flex-row justify-center items-center h-full absolute right-4 text-[14px] xs:text-[15px] sm:text-[16px] font-medium text-gray-600",
                  isValidEmail ? "visible" : "hidden"
                )}
              >
                <div className="w-[40px]">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <div
                className={cls(
                  "absolute top-[45px] xs:top-[50px] sm:top-[55px] w-full text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5",
                  codeMsg === ""
                    ? "hidden"
                    : isValidCode
                    ? "visible text-blue-400"
                    : "visible text-red-400"
                )}
              >
                {codeMsg}
              </div>
            </div>
            <ButtonLarge
              label="다음"
              kind="check"
              disabled={disabled}
              onClick={handleNextButton}
            />
          </>
        )}
      </div>
    </>
  );
}
