import { cls } from "@/libs/utils";
import Image from "next/image";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <div
      className={cls(
        "flex flex-col justify-start items-start fixed left-0 gap-1 w-[290px] h-[calc(100%-69px)] mt-[69px] pt-[30px] px-3 border border-r-[#E5E7EB]",
        `lg:translate-x-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`
      )}
    >
      <div className="flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-100">
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image src="/images/add_icon.svg" alt="menu" width={15} height={15} />
        </div>
        <span className="text-[20px] font-semibold">새로운 아이템</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-100">
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image src="/images/log_icon.svg" alt="menu" width={25} height={28} />
        </div>
        <span className="text-[20px] font-semibold">로그 기록</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-100">
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/insight_icon.svg"
            alt="menu"
            width={31}
            height={30}
          />
        </div>
        <span className="text-[20px] font-semibold">인사이트</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-3 w-[250px] h-[41px] px-4 rounded-full hover:bg-gray-100">
        <div className="flex flex-row justify-center items-center w-[30px] h-[30px]">
          <Image
            src="/images/setting_icon.svg"
            alt="menu"
            width={27}
            height={27}
          />
        </div>
        <span className="text-[20px] font-semibold">설정</span>
      </div>
    </div>
  );
}
