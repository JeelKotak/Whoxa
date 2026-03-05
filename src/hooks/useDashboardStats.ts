import { useEffect, useState } from "react";
import useApi from "./useApiPost";

interface DashboardStats {
  totalUsers: number;
  usersLastMonth: number;

  totalGroups: number;
  groupsLastMonth: number;

  totalAudioCalls: number;
  audioLastMonth: number;

  totalVideoCalls: number;
  videoLastMonth: number;
}

const useDashboardStats = () => {
  const { get } = useApi();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, groupsRes, callsRes] = await Promise.all([
          get("/admin/users-cnt"),
          get("/admin/groups-cnt"),
          get("/admin/calls-cnt"),
        ]);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          usersLastMonth: usersRes.data.usersFromStartToOneMonthAgo,

          totalGroups: groupsRes.data.totalGroupChats,
          groupsLastMonth: groupsRes.data.groupChatsFromStartToOneMonthAgo,

          totalAudioCalls: callsRes.data.audio.totalCalls,
          audioLastMonth: callsRes.data.audio.callsFromStartToOneMonthAgo,

          totalVideoCalls: callsRes.data.video.totalCalls,
          videoLastMonth: callsRes.data.video.callsFromStartToOneMonthAgo,
        });
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, loading };
};

export default useDashboardStats;
