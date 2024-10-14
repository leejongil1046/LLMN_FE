import ButtonSmall from "@/components/commons/button-small";
import Input from "@/components/commons/input";
import Logo from "@/components/commons/logo";
import { useNicknameCheck } from "@/hooks/login/use-nickname-check";

export default function SignupStep2() {
  const {
    nickname,
    isPossibleNickname,
    nicknameMsg,
    handleNicknameChange,
    verifyNickname,
  } = useNicknameCheck();

  return (
    <div>
      <div className="flex flex-col justify-start items-center w-screen max-w-[605px] mx-auto h-[630px] gap-8 xs:gap-9 sm:gap-10 px-6 pt-[15vh] overflow-y-auto overflow-x-hidden">
        <Logo />
        <div className="flex flex-col justify-start items-center relative w-full mt-2.5 xs:mt-3 sm:mt-3.5">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
          <div className="w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5 text-gray-400">
            닉네임을 2자에서 8자 사이로 입력해주세요.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-7 xs:mt-8 sm:mt-9">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
          />
          <div className="w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5 text-gray-400">
            비밀번호가 유효하지 않습니다.
          </div>
        </div>
        <div className="flex flex-col justify-start items-center relative w-full mt-7 xs:mt-8 sm:mt-9">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
          />
          <div className="w-full max-w-[605px] absolute top-[45px] xs:top-[50px] sm:top-[55px] text-[12px] xs:text-[13px] sm:text-[14px] font-semibold px-1 mt-0.5 text-gray-400">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center gap-1 xs:gap-2 sm:gap-3 w-full max-w-[605px] mx-auto px-6">
        <button className="h-[45px] xs:h-[50px] sm:h-[55px] text-[16px] xs:text-[18px] sm:text-[20px] rounded-md bg-white text-black font-semibold px-[20px] xs:px-[22px] sm:px-[24px]">
          취소
        </button>
        <ButtonSmall label="다음" />{" "}
      </div>
    </div>
  );
}
