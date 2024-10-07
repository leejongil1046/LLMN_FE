import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "./confirm-modal";
import { useRouter } from "next/router";

interface DropdownMenuProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function DropdownMenu({ options, onSelect }: DropdownMenuProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleOptionClick = (option: string) => {
    optionActionsMap[option]?.action();
    setIsMenuOpen(false); // 메뉴 닫기
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false); // 모달 닫기
  };

  const optionActionsMap: {
    [key: string]: { label: string; action: () => void };
  } = {
    edit: {
      label: "수정하기",
      action: () => router.push("/log/1/edit"),
    },
    restart: {
      label: "컨테이너 재시작",
      action: () => {
        setSelectedOption("restart");
        setIsConfirmModalOpen(true);
      },
    },
    stop: {
      label: "컨테이너 종료",
      action: () => {
        setSelectedOption("stop");
        setIsConfirmModalOpen(true);
      },
    },
    delete: {
      label: "삭제하기",
      action: () => {
        setSelectedOption("delete");
        setIsConfirmModalOpen(true);
      },
    },
    license: {
      label: "오픈소스 라이센스",
      action: () => router.push("/setting/license"),
    },
    key: {
      label: "API 키 관리",
      action: () => router.push("/setting/api-key"),
    },
    withdraw: {
      label: "계정 삭제",
      action: () => console.log("Withdraw action triggered"),
    },
  };

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={toggleMenu}>
        <Image
          src="/images/ellipsis-vertical.svg"
          alt="ellipsis-vertical"
          width={44}
          height={44}
          className="w-[35px] h-[35px] xs:w-[40px] xs:h-[40px] sm:w-[44px] sm:h-[44px] mt-1.5"
        />
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-0 xs:mt-0.5 sm:mt-1 w-28 xs:w-32 sm:w-36 bg-white border border-gray-300 rounded-xl shadow-lg z-10"
        >
          {options.map((option) => (
            <div
              key={option}
              className="text-[12px] xs:text-[14px] sm:text-[16px] font-medium last:text-[#FD5252] border-b-[1px] last:border-b-0 border-[#DBDBDB] first:rounded-tl-xl first:rounded-tr-xl last:rounded-bl-xl last:rounded-br-xl px-1 xs:px-2 sm:px-3 py-1 sm:py-1.5 text-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {optionActionsMap[option].label || option}
              {/* optionLabelMap에 없는 값이 들어올 경우 기본 option을 표시 */}
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        option={selectedOption}
      />
    </div>
  );
}
