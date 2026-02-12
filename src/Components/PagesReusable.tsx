import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import '../Components/_theme.scss';

interface PagesReusableProps {
  initialTitle?: string;
  initialDate?: string;
  initialContent?: string;
  onUpdate?: (data: { title: string; content: string }) => void;
}

const PagesReusable: React.FC<PagesReusableProps> = ({ 
  initialTitle = "Privacy Policy", 
  initialDate = "04, Oct 2024",
  initialContent = "",
  onUpdate 
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [isEditingHeader, setIsEditingHeader] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
      }),
      Underline, 
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 cursor-pointer underline',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] text-gray-700',
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleUpdate = () => {
    if (editor && onUpdate) {
      onUpdate({
        title: title,
        content: editor.getHTML(),
      });
    }
  };

  if (!editor) return null;

  return (
    <div className="w-full space-y-6 theme-container">
      <div className="border border-gray-200 rounded-md bg-white font-sans overflow-hidden">
        
        {/* --- Toolbar --- */}
        <div className="flex flex-wrap items-center gap-2 p-2 border-b-2 border-gray-100 bg-white text-gray-500 sticky top-0 z-10">
          <select 
            className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer font-medium px-1"
            onChange={(e) => {
              if (e.target.value === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
              else editor.chain().focus().setParagraph().run();
            }}
            value={editor.isActive('heading', { level: 2 }) ? 'h2' : 'p'}
          >
            <option value="p">Normal Text</option>
            <option value="h2">Section Heading</option>
          </select>

          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          
          <button onClick={() => editor.chain().focus().toggleBold().run()} 
            className={`p-1 px-2 rounded ${editor.isActive('bold') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <span className="font-bold">B</span>
          </button>
          
          <button onClick={() => editor.chain().focus().toggleItalic().run()} 
            className={`p-1 px-2 rounded ${editor.isActive('italic') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <span className="italic font-serif">I</span>
          </button>

          <button onClick={() => editor.chain().focus().toggleUnderline().run()} 
            className={`p-1 px-2 rounded ${editor.isActive('underline') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <span className="underline">U</span>
          </button>

          <button onClick={setLink} 
            className={`p-1 px-2 rounded ${editor.isActive('link') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            🔗
          </button>
          
          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} 
            className={`p-1 px-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            •≡
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            className={`p-1 px-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            1.≡
          </button>

          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          
          <button 
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} 
            className="p-1 px-2 rounded hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>

        {/* --- Scrollable Content Area --- */}
        <div className="max-h-[600px] overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          
          <div className="group/title mb-8">
            {isEditingHeader ? (
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setIsEditingHeader(false)}
                className="text-3xl font-bold py-1 border-b-2 border-blue-500 focus:outline-none w-full"
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800 border-b-2 border-black italic">
                  {title}
                </h1>
                <button 
                  onClick={() => setIsEditingHeader(true)}
                  className="opacity-0 group-hover/title:opacity-100 text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded transition-all"
                >
                  Edit Title
                </button>
              </div>
            )}
            <p className="text-gray-500 text-sm mt-2">Updated at {initialDate}</p>
          </div>

          <div className="pr-2">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button 
          onClick={handleUpdate}
          className="bg-brand-secondary text-white font-medium py-2.5 px-10 rounded-lg "
        >
          Save Changes
        </button>
      </div>

      <style>{`
        .ProseMirror {
          outline: none !important;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          /* Matches the "General Terms" look from your image */
          text-decoration: underline;
          font-style: italic;
          text-underline-offset: 6px;
        }
        .ProseMirror p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          font-size: 1rem;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin-bottom: 1.25rem;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin-bottom: 1.25rem;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default PagesReusable;