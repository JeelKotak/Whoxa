import Modal from "../Components/Modal";
import { CalendarDays, IdCard, ClipboardType, ScrollText } from "lucide-react";

interface GroupReportTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  GroupData: {
    orderId: string;
    type: string;
    reportCount: number;
    createdDate: string;
    status: boolean;
    reportedName: string;
    reportedAvatar: string;
    reporterName: string;
    reporterID: string;
    reporterAvatar: string;
    reportType: string;
    reportText: string;
  } | null;
}

const GroupReportTypeModal = ({ isOpen, onClose, GroupData }: GroupReportTypeModalProps) => {
  if (!isOpen || !GroupData) return null;


  return (
    <Modal isOpen={true} onClose={onClose} title="Report Details">

      {/* Content */}
      <div >

        {/* Reported Group Section */}
        <div className="p-6 border border-[#e3e3e3] rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reported Group</h3>
          <div className="flex items-center gap-10">
            <img
              src={GroupData.reportedAvatar}
              className="w-18 h-18 rounded-full bg-orange-100"
              alt="avatar"
            />
            <div className="flex flex-col space-y-2">
              <span className="text-[17px] font-semibold text-gray-900">{GroupData.reportedName}</span>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                  <div className="text-sm text-gray-500 font-medium">Group ID: {GroupData.orderId.replace('#', '')}</div>
                </div>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                  <span className="text-sm text-gray-500 font-medium">Type: {GroupData.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Reports Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-[#374151] mb-5">Reported By</h3>

          {/* Reporter Info (Static based on screenshot) */}
          <div className="flex items-center gap-10 mb-8">
            <img
              src={GroupData.reporterAvatar}
              className="w-18 h-18 rounded-full bg-blue-100"
              alt="reporter"
            />
            <div className="flex flex-col space-y-2">
              <span className="text-[17px] font-semibold text-gray-900">{GroupData.reporterName}</span>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5" />
                  <div className="text-sm text-gray-500 font-medium">Group ID: {GroupData.orderId.replace('#', '')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Data */}
          <div className="grid grid-cols-2 gap-y-8">
            <div>
              <div className="flex items-center gap-2">
                <IdCard size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report ID</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{GroupData.orderId}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ClipboardType size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report Type</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{GroupData.reportType}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ScrollText size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Report Text</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{GroupData.reportText}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-brand-primary" />
                <p className="text-[15px] font-bold text-[#374151]">Created Date</p>
              </div>
              <p className="text-[#6B7280] font-medium pl-6.5">{GroupData.createdDate}</p>
            </div>
          </div>
        </div>
      </div></Modal>
  );
};

export default GroupReportTypeModal;