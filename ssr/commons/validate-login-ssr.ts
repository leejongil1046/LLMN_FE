import { fetchAlarmList } from "@/api/commons/header-api";
import { verifyAccessToken } from "@/api/login/login-api";
import { AlarmList } from "@/types/commons/header-type";
import { Nickname } from "@/types/login/login-type";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export interface ValidateLoginProps {
  NicknameSSR: Nickname | null;
  AlarmListSSR: AlarmList | null;
  unreadAlarmCount: number;
}

export async function getValidateLoginSSR(
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ValidateLoginProps>> {
  const accessToken = context.req.cookies?.accessToken || "";

  const [NicknameSSR, AlarmListSSR] = await Promise.all([
    verifyAccessToken(accessToken),
    fetchAlarmList(accessToken),
  ]);

  if (!NicknameSSR) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const unreadAlarmCount =
    AlarmListSSR?.alarms.filter((alarm) => !alarm.isRead).length || 0;

  return {
    props: {
      NicknameSSR,
      AlarmListSSR,
      unreadAlarmCount,
    },
  };
}
