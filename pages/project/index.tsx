import { refreshProjectList } from "@/src/api/project/project-api";
import Layout from "@/src/components/commons/layout";
import ProjectTable from "@/src/components/project/project-table";
import {
  ProjectPageProps,
  getProjectListSSR,
} from "@/src/ssr/project/project-ssr";
import { Nickname } from "@/src/types/login/login-type";
import { ProjectList } from "@/src/types/project/project-type";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";

export const getServerSideProps: GetServerSideProps<ProjectPageProps> =
  getProjectListSSR;

export default function Project({
  NicknameSSR,
  ProjectListSSR,
  AlarmListSSR,
  unreadAlarmCount,
}: ProjectPageProps) {
  const nicknameRef = useRef<Nickname | null>(NicknameSSR);
  const projectListRef = useRef<ProjectList | null>(ProjectListSSR);
  const [refreshedProjectList, setRefreshedProjectList] =
    useState<ProjectList | null>(null);

  const handleRefreshButton = async () => {
    const result = await refreshProjectList();
    if (result) {
      setRefreshedProjectList(result);
    }
  };

  return (
    <>
      <Head>
        <title>LLMN - Project</title>
      </Head>
      <Layout
        nickname={nicknameRef.current?.nickName || null}
        AlarmListSSR={AlarmListSSR}
        unreadAlarmCount={unreadAlarmCount}
      >
        <div className="px-5 xs:px-7 sm:px-10 max-w-[1200px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center">
              <span className="text-[24px] xs:text-[30px] sm:text-[36px] text-black font-bold pl-1">
                프로젝트
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-0.5 pr-1 mt-1">
              <Image
                src="/images/rotate-right.svg"
                alt="rotate-right"
                width={35}
                height={35}
                className="w-[25px] h-[25px] xs:w-[30px] xs:h-[30px] sm:w-[35px] sm:h-[35px] cursor-pointer"
                onClick={handleRefreshButton}
                priority
              />
            </div>
          </div>
          <ProjectTable
            ProjectList={
              refreshedProjectList
                ? refreshedProjectList
                : projectListRef.current
            }
          />
        </div>
      </Layout>
    </>
  );
}
