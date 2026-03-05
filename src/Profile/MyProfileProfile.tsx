import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../Components/_theme.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Quote, Code, List, ListOrdered,
    Superscript as SuperIcon, Subscript as SubIcon,
    Trash2, Baseline, Highlighter, ChevronDown
} from 'lucide-react';
import useApi from '../hooks/useApiPost';

interface Props {
  profileImageFile: File | null;
    setProfileImage: (url: string) => void;

}

const MenuBar = ({ editor }: { editor: any }) => {
    const [isAlignOpen, setIsAlignOpen] = useState(false);
    if (!editor) return null;


    

    const btnClass = (active: boolean) =>
        `p-1.5 rounded transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`;

    const alignments = [
        {
            value: 'left',
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
        },
        {
            value: 'center',
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="3"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
        },
        {
            value: 'right',
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
        },
        {
            value: 'justify',
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
        }
    ];

    const currentAlignment = editor.isActive({ textAlign: 'center' }) ? 'center' :
        editor.isActive({ textAlign: 'right' }) ? 'right' :
            editor.isActive({ textAlign: 'justify' }) ? 'justify' : 'left';

    return (
        <div className="border-b border-gray-300 p-2 flex flex-wrap items-center gap-1">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><Bold size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}><Italic size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))}><UnderlineIcon size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))}><Strikethrough size={16} /></button>

            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}><List size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}><ListOrdered size={16} /></button>

            <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={btnClass(editor.isActive('subscript'))}><SubIcon size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={btnClass(editor.isActive('superscript'))}><SuperIcon size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))}><Quote size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))}><Code size={16} /></button>

            <div className="relative flex items-center" title="Text Color">
                <button type="button" className={btnClass(false)}><Baseline size={16} /></button>
                <input
                    type="color"
                    onInput={e => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
            <div className="relative flex items-center" title="Highlight Color">
                <button type="button" className={btnClass(false)}><Highlighter size={16} /></button>
                <input
                    type="color"
                    onInput={e => editor.chain().focus().setHighlight({ color: (e.target as HTMLInputElement).value }).run()}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>


            <div className="relative inline-block text-left">
                <button
                    type="button"
                    onClick={() => setIsAlignOpen(!isAlignOpen)}
                    className="flex items-center justify-between rounded px-2 min-w-[54px] hover:bg-[#f1f1f1] transition-colors h-[32px]"
                >
                    <span className="text-gray-600">
                        {alignments.find(a => a.value === currentAlignment)?.icon}
                    </span>
                    <ChevronDown size={12} className={`transition-transform text-gray-400 ${isAlignOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAlignOpen && (
                    <>
                        <div className="fixed inset-0 z-50" onClick={() => setIsAlignOpen(false)}></div>
                        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded z-[60]">
                            {alignments.map((align) => (
                                <button
                                    key={align.value}
                                    type="button"
                                    onClick={() => {
                                        editor.chain().focus().setTextAlign(align.value).run();
                                        setIsAlignOpen(false);
                                    }}
                                    className={`w-full flex justify-center p-2 hover:bg-gray-100 ${currentAlignment === align.value ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                >
                                    {align.icon}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors"
                title="Clear all formatting"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};




export default function MyProfileProfile({ profileImageFile, setProfileImage }: Props) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        profileImage: null as File | null,
    });


    

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            Underline,
            Subscript,
            Superscript,
            TextStyle,
            Color,
            FontFamily,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            setFormData(prev => ({ ...prev, description: editor.getHTML() }));
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none p-3 outline-none min-h-[150px] text-sm focus:ring-0 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-4 [&_ol]:ml-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic',
            },
        },
    });

    const { put, loading } = useApi();

    const fetchProfile = async () => {
  try {
    const res = await put("/admin");

    const data = res?.data;

    setFormData((prev) => ({
      ...prev,
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      email: data.email || "",
      description: data.description || "",
      preview: data.profile_pic || "",
    }));

      if (data.profile_pic) {
      setProfileImage(data.profile_pic);   // ✅ send image to parent
    }

    
  } catch (error) {
    toast.error("Failed to load profile");
  }
};

useEffect(() => {
  fetchProfile();
}, []);


    const handleCreate = async () => {
  const { firstName, lastName, email } = formData;
  try {
    const payload = new FormData();

    payload.append("first_name", firstName);
    payload.append("last_name", lastName);
    payload.append("email", email);
    payload.append("country_code", "+1");
    payload.append("mobile_num", "");

    if (profileImageFile) {
      payload.append("pictureType", "profile_pic");
      payload.append("files", profileImageFile);
    }

    const res = await put("/admin",
                payload,
         {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
    );

    toast.success("Profile Updated Successfully!");

  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong");
  }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="pb-32 bg-white theme-container">
            <div className="max-w-[1800px] mx-auto px-4 md:px-8 mt-6 space-y-12">
                <section className="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Main Info</h3>
                        <p className="text-sm text-gray-500">Fill all Information below.</p>
                    </div>

                    <div className="md:col-span-2 bg-white space-y-6">
                    

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Steve" className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Last Name<span className="text-red-500">*</span></label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Harrington" className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Email<span className="text-red-500">*</span></label>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="steve.harrington@gmail.com" className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" />
                        </div>

                    
                    </div>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex flex-row justify-end gap-3 z-40">
                <button className="px-6 py-2.5 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-[#f1f1f1]">Cancel</button>
                <button onClick={handleCreate} className="px-6 py-2.5 text-sm font-bold text-white rounded-lg cursor-pointer bg-brand-secondary">
                    Save
                </button>
            </div>
        </div>
    );
}