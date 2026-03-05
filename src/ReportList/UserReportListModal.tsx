import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { CalendarDays, IdCard, ClipboardType, ScrollText } from "lucide-react";
import useApi from "../hooks/useApiPost";

interface UserReportTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: number; // pass report ID to fetch details
}

interface ReportDetails {
  report_id: number;
  report_type: string | null;
  report_text: string | null;
  createdAt: string;
  reporter: {
    user_name: string;
    profile_pic: string;
    user_id: number;
  };
  reported_user: {
    user_name: string;
    profile_pic: string;
    user_id: number;
  };
  Report_type: {
    report_type_id: number;
    report_text: string;
  };
}

const UserReportTypeModal = ({ isOpen, onClose, reportId }: UserReportTypeModalProps) => {
  const { post } = useApi();
  const [report, setReport] = useState<ReportDetails | null>(null);
  const [loading, setLoading] = useState(false);

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


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report Details">
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : report ? (
        <div>
          {/* Reported User */}
          <div className="p-6 border border-[#e3e3e3] rounded-xl bg-gray-50 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reported User</h3>
            <div className="flex items-center gap-10">
              <img
                src={report.reported_user.profile_pic}
                className="w-18 h-18 rounded-full bg-orange-100"
                alt="avatar"
              />
              <div className="flex flex-col space-y-2">
                <span className="text-[17px] font-semibold text-gray-900">{report.reported_user.user_name}</span>
                <div className="text-sm text-gray-500 font-medium">User ID: {report.reported_user.user_id}</div>
              </div>
            </div>
          </div>

          {/* Reporter Info */}
          <div className="p-6 border border-[#e3e3e3] rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-[#374151] mb-4">Reported By</h3>
            <div className="flex items-center gap-10">
              <img
                src={report.reporter.profile_pic}
                className="w-18 h-18 rounded-full bg-blue-100"
                alt="reporter"
              />
              <div className="flex flex-col space-y-2">
                <span className="text-[17px] font-semibold text-gray-900">{report.reporter.user_name}</span>
                <div className="text-sm text-gray-500 font-medium">User ID: {report.reporter.user_id}</div>
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="grid grid-cols-2 gap-y-8">
            <div>
              <div className="flex items-center gap-2">
                <IdCard size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report ID</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{report.report_id}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ClipboardType size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report Type</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{report.Report_type?.report_text || "N/A"}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ScrollText size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report Text</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{report.report_text || "N/A"}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Created Date</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No report details found.</p>
      )}
    </Modal>
  );
};

export default UserReportTypeModal;
