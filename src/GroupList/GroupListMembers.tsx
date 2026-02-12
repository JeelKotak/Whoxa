import Modal from '../Components/Modal';
import '../Components/_theme.scss';

interface Member {
  name: string;
  handle: string;
  avatar: string;
  role: "Admin" | "Member";
}

interface Group {
  orderId: string;
  name: string;
  description: string;
  avatar: string;
  createdDate: string;
  members: Member[];
}

interface GroupListMembersProps {
  group: Group | null;
  onClose: () => void;
}

export default function GroupListMembers({ group, onClose }: GroupListMembersProps) {
  const isOpen = Boolean(group);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={group ? `${group.name}` : ""}
    >
      <div className="space-y-3">
        {group?.members.map((member, index) => (
          <div key={index} className="flex items-center gap-3 py-1 rounded-lg">
            <img src={member.avatar} className="w-10 h-10 rounded-full" alt="" />
            <div className="flex-1">
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-500">@{member.handle}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold 
            ${member.role === 'Admin' ? 'bg-brand-secondary text-white': 'bg-[var(--brand-secondary)]/60 text-white'}`}>
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}