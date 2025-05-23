import type {
  Dashboard,
  CloudInstanceDataList,
} from "@/src/types/dashboard/dashboard-type";
import Cookies from "js-cookie";

export async function fetchDashboard(
  accessToken: string
): Promise<Dashboard | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: Dashboard | null } = await response.json();
    console.log("result : ", result);
    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function fetchCloudInstanceDataList(
  accessToken: string
): Promise<CloudInstanceDataList | null> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/cloud`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { result }: { result: CloudInstanceDataList | null } =
      await response.json();

    return result;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return null;
  }
}

export async function ChangeMonitoringCloud(
  remoteHost: string
): Promise<boolean> {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseURL}/cloud`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ remoteHost }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const { success }: { success: boolean } = await response.json();
    return success;
  } catch (error) {
    console.error("Failed to fetch pets data with auth:", error);
    return false;
  }
}
