import { useState, useEffect, useCallback, useMemo } from "react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import GroupListMembers from "./GroupListMembers";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

/* ============================================================
   TYPES
============================================================ */

interface ApiUser {
  user_id: number;
  user_name: string;
  full_name: string;
  profile_pic: string;
}

interface ApiParticipant {
  is_admin: boolean;
  User: ApiUser;
}

interface ApiChat {
  chat_id: number;
  group_name: string;
  group_description: string;
  group_icon: string;
  createdAt: string;
  participants: ApiParticipant[];
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  total_pages: number;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function GroupList() {
  const { post, loading } = useApi();

  /* ================= STATE ================= */

  const [groups, setGroups] = useState<ApiChat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  /* ============================================================
     FETCH GROUPS (SERVER PAGINATION)
  ============================================================ */

  const fetchGroups = useCallback(async () => {
    try {
      const res = await post("/admin/group-chats", {
        page: pagination.page,
        pageSize: pagination.pageSize,
      });

      if (res?.status && res?.data) {
        setGroups(res.data.chats ?? []);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  /* ============================================================
     CLIENT SIDE SEARCH (MEMOIZED)
  ============================================================ */

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return groups;

    return groups.filter((group) =>
      `${group.group_name} ${group.group_description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [groups, searchTerm]);

  /* ============================================================
     PAGINATION HANDLERS
  ============================================================ */

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > pagination.total_pages) return;

    setPagination((prev) => ({
      ...prev,
      page,
    }));
  }, [pagination.total_pages]);

  const handlePageSizeChange = useCallback((size: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      page: 1,
    }));
  }, []);

  /* ============================================================
     SMART PAGE GENERATOR
  ============================================================ */

  const generatePages = useMemo(() => {
    const pages: number[] = [];

    for (let i = 1; i <= pagination.total_pages; i++) {
      if (
        i === 1 ||
        i === pagination.total_pages ||
        (i >= pagination.page - 2 && i <= pagination.page + 2)
      ) {
        pages.push(i);
      }
    }

    return pages;
  }, [pagination.page, pagination.total_pages]);

  /* ============================================================
     VIEW MEMBERS
  ============================================================ */

  const handleViewMembers = useCallback((group: ApiChat) => {
    const formattedMembers =
      group.participants?.map((participant) => ({
        name: participant.User?.full_name,
        handle: participant.User?.user_name,
        avatar: participant.User?.profile_pic,
        role: participant.is_admin ? "Admin" : "Member",
      })) ?? [];

    setSelectedGroup({
      ...group,
      members: formattedMembers,
    });
  }, []);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-2 pt-4 pb-12">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h1 className="text-3xl font-bold">Group List</h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search groups..."
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Group</th>
                  <th className="px-6 py-4">Participants</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        <p className="text-sm text-gray-500">Loading Group List...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <tr
                      key={group.chat_id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5 font-medium">
                        #{group.chat_id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={group.group_icon}
                            alt={group.group_name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold">
                              {group.group_name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {group.group_description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {group.participants?.length ?? 0}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleViewMembers(group)}
                          className="bg-brand-secondary text-white font-medium py-2 px-5 rounded-lg text-xs hover:opacity-90 transition"
                        >
                          View Members
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center">
                      No groups found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= PAGINATION ================= */}
         {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <RowsPerPage
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(newSize) => setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }))}
        />
        <Pagination
          page={pagination.page}
          totalPages={pagination.total_pages}
          onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        />
      </div>
      </div>

      {/* ================= MEMBERS MODAL ================= */}
      <GroupListMembers
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />
    </div>
  );
}
