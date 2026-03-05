"use client";

import { useEffect, useState, useCallback } from "react";
import Search from "../Components/Search";
import '../Components/_theme.scss';
import { SquarePen, Trash2 } from "lucide-react";
import AddAvatar from "./AddAvatar";
import EditAvatar from "./EditAvatar";
import CategoriesDeleteModal from "../Components/CategoriesDeleteModal";
import debounce from "lodash.debounce";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

export type AvatarData = {
  avatar_id: number;
  avatar_media: string;
  name: string;
  avatar_gender: "male" | "female";
  status: boolean;
  createdAt: string;
};

export default function Avatar() {
  const { get, post } = useApi();

  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
  const [isAddAvatarOpen, setIsAddAvatarOpen] = useState(false);
  const [avatarToDelete, setAvatarToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  // --- Fetch avatars with debounce for search ---
  const fetchAvatars = useCallback(async () => {
    try {
      setLoading(true);
      const res = await get(`/avatar/get-all-avatars`);
      const records: AvatarData[] = res.data.Records.map((av: any) => ({
        avatar_id: av.avatar_id,
        avatar_media: av.avatar_media,
        name: av.name,
        avatar_gender: av.avatar_gender,
        status: av.status,
        createdAt: av.createdAt,
      }));

      const filtered = records.filter((av) =>
        av.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const total = filtered.length;
      const total_pages = Math.max(1, Math.ceil(total / pagination.pageSize));
      const start = (pagination.page - 1) * pagination.pageSize;
      const paginated = filtered.slice(start, start + pagination.pageSize);

      setAvatars(paginated);
      setPagination((prev) => ({ ...prev, total, total_pages }));
    } catch (err) {
      console.error("Failed to fetch avatars", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, searchTerm]);

  const debouncedSearch = useCallback(debounce((val: string) => setSearchTerm(val), 500), []);

  useEffect(() => {
    fetchAvatars();
    return () => debouncedSearch.cancel();
  }, [fetchAvatars, debouncedSearch]);

  // --- Handlers ---
  const handleUpdateAvatar = (updated: AvatarData) => {
    setAvatars((prev) => prev.map((av) => (av.avatar_id === updated.avatar_id ? updated : av)));
    setSelectedAvatar(null);
  };

  const handleConfirmDelete = async () => {
    if (!avatarToDelete) return;

    try {
      setLoading(true);

      const res = await post("/avatar/delete-avatar", {
        avatar_id: avatarToDelete,
      });

      if (res?.status) {
        // Option 1 (Recommended): Refetch list from server
        await fetchAvatars();

        // Option 2 (Alternative: remove locally)
        // setAvatars(prev => prev.filter(av => av.avatar_id !== avatarToDelete));

        setAvatarToDelete(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setLoading(false);
    }
  };



  // --- Skeleton Loader ---
  const renderSkeleton = () => (
    Array.from({ length: pagination.pageSize }).map((_, idx) => (
      <tr key={idx} className="animate-pulse hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-5">
          <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </td>
        <td className="px-6 py-5">
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
          </div>
        </td>
      </tr>
    ))
  );

  return (
    <div className="relative w-full bg-white theme-container min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Avatar List</h1>
        <Search searchTerm={searchTerm} setSearchTerm={debouncedSearch} placeholder="Search Avatars..." />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Avatar Overview</h2>
          <button
            onClick={() => setIsAddAvatarOpen(true)}
            className="flex items-center gap-2 text-white px-4 py-2 cursor-pointer rounded-lg bg-brand-secondary text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Avatar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f1f1f1] border-b border-gray-200">
              <tr className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Avatar</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? renderSkeleton() : avatars.length > 0 ? avatars.map((avatar) => (
                <tr key={avatar.avatar_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-900">{avatar.avatar_id}</td>
                  <td className="px-6 py-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 bg-orange-100 flex items-center justify-center">
                      <img src={avatar.avatar_media} alt={avatar.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{avatar.name}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${avatar.avatar_gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"}`}>
                      {avatar.avatar_gender}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${avatar.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                      {avatar.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-900">{new Date(avatar.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-3">
                      <button onClick={() => setSelectedAvatar(avatar)} className="px-2 py-1 text-gray-500 cursor-pointer hover:text-brand-secondary transition-colors">
                        <SquarePen size={20} />
                      </button>
                      <button onClick={() => setAvatarToDelete(avatar.avatar_id)} className="px-2 py-1 text-gray-500 cursor-pointer hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-400 italic">No Avatars found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
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

      {/* Modals */}
      {isAddAvatarOpen && <AddAvatar onClose={() => { setIsAddAvatarOpen(false); fetchAvatars(); }} />}
      {selectedAvatar && (
        <EditAvatar
          Avatar={selectedAvatar}
          onClose={() => setSelectedAvatar(null)}
          onUpdateSuccess={fetchAvatars}
        />
      )}


      {avatarToDelete !== null && <CategoriesDeleteModal onClose={() => setAvatarToDelete(null)} onConfirm={handleConfirmDelete} />}
    </div>
  );
}
