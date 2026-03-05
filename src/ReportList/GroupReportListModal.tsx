import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import { CalendarDays, IdCard, ClipboardType, ScrollText } from "lucide-react";
import useApi from "../hooks/useApiPost";

interface GroupReportTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: number; // pass group ID to fetch details
}

interface ReportData {
  report_id: number;
  report_type: string | null;
  report_text: string | null;
  createdAt: string;
  reporter: {
    user_name: string;
    profile_pic: string;
    user_id: number;
  } | null;
  reported_group: {
    group_icon: string;
    chat_id: number;
    group_name: string;
    is_group_blocked: boolean;
  } | null;
}

const GroupReportTypeModal = ({ isOpen, onClose, reportId }: GroupReportTypeModalProps) => {
  const { post } = useApi();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    if (!isOpen || !reportId) return;

    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await post("/report/report-details", { id: reportId });
        if (response.status && response.data.length > 0) {
          setReport(response.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch report details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [isOpen, reportId]);

  if (!isOpen) return null;

  // Safely extract values using optional chaining and fallback
  const group = report?.reported_group;
  const reporter = report?.reporter;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report Details">
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Reported Group Section */}
          <div className="p-6 border border-[#e3e3e3] rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reported Group</h3>
            <div className="flex items-center gap-10">
              <img
                src={group?.group_icon || "https://api.whoxachat.com//uploads/not-found-images/group-image.png"}
                className="w-18 h-18 rounded-full bg-orange-100"
                alt="avatar"
              />
              <div className="flex flex-col space-y-2">
                <span className="text-[17px] font-semibold text-gray-900">{group?.group_name || "Unknown Group"}</span>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                    <div className="text-sm text-gray-500 font-medium">Group ID: {group?.chat_id || "N/A"}</div>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                    <span className="text-sm text-gray-500 font-medium">Blocked: {group?.is_group_blocked ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reporter Section */}
          {reporter && (
            <div className="p-6 border border-[#e3e3e3] rounded-xl">
              <h3 className="text-lg font-semibold text-[#374151] mb-5">Reported By</h3>
              <div className="flex items-center gap-10">
                <img
                  src={reporter.profile_pic}
                  className="w-18 h-18 rounded-full bg-blue-100"
                  alt="reporter"
                />
                <div className="flex flex-col space-y-2">
                  <span className="text-[17px] font-semibold text-gray-900">{reporter.user_name}</span>
                  <div className="flex gap-6">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                      <div className="text-sm text-gray-500 font-medium">User ID: {reporter.user_id}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Report Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-y-8">
              <div>
                <div className="flex items-center gap-2">
                  <IdCard size={18} className="text-brand-primary" />
                  <p className="text-[15px] font-bold text-[#374151]">Report ID</p>
                </div>
                <p className="text-[#6B7280] font-medium pl-6.5">{report?.report_id || "N/A"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <ClipboardType size={18} className="text-brand-primary" />
                  <p className="text-[15px] font-bold text-[#374151]">Report Type</p>
                </div>
                <p className="text-[#6B7280] font-medium pl-6.5">{report?.report_type || report?.Report_type?.report_text || "N/A"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <ScrollText size={18} className="text-brand-primary" />
                  <p className="text-[15px] font-bold text-[#374151]">Report Text</p>
                </div>
                <p className="text-[#6B7280] font-medium pl-6.5">{report?.report_text || report?.Report_type?.report_text || "N/A"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-brand-primary" />
                  <p className="text-[15px] font-bold text-[#374151]">Created Date</p>
                </div>
                <p className="text-[#6B7280] font-medium pl-6.5">{report?.createdAt ? new Date(report.createdAt).toLocaleString() : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GroupReportTypeModal;
