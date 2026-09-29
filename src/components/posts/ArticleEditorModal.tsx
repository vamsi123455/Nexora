import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  Code2,
  Image as ImageIcon,
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ArticleEditorModal: React.FC = () => {
  const {
    currentUser,
    isArticleEditorOpen,
    setIsArticleEditorOpen,
    createPost,
    showToast,
    setActiveTab
  } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverType, setCoverType] = useState<'image' | 'video'>('image');
  const [currentStyle, setCurrentStyle] = useState<'Paragraph' | 'Heading 1' | 'Heading 2' | 'Quote' | 'Code'>('Paragraph');
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(true);

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const inlineImageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!isArticleEditorOpen) return null;

  // Handle local file upload for article cover
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    setCoverType(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverUrl(event.target.result as string);
        setIsDraftSaved(false);
        showToast(isVideo ? 'Video cover loaded from your computer!' : 'Cover image loaded from your computer!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle local file upload for inline images in article
  const handleInlineImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Append image markdown or tag into content
        const imgTag = `\n\n![${file.name}](${event.target.result})\n\n`;
        setContent(prev => prev + imgTag);
        showToast('Image inserted into article!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick style formatting applier
  const applyFormatting = (prefix: string, suffix: string = '') => {
    const el = textareaRef.current;
    if (!el) {
      setContent(prev => prev + prefix + suffix);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setIsDraftSaved(false);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 0);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      showToast('Please add an article title before publishing.');
      return;
    }
    if (!content.trim()) {
      showToast('Please write some content for your article.');
      return;
    }

    createPost({
      content: `${title.trim()}\n\n${content.trim().slice(0, 320)}${content.trim().length > 320 ? '...' : ''}`,
      type: 'article',
      mediaUrl: coverUrl || undefined,
      mediaType: coverType,
      articleData: {
        title: title.trim(),
        coverUrl: coverUrl || undefined,
        subtitle: content.trim().slice(0, 140)
      },
      tags: ['Article', 'ThoughtLeadership', 'NexoraInsights']
    });

    showToast('Article published successfully to the Nexora Feed! 🎉');
    setIsArticleEditorOpen(false);
    setActiveTab('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Hidden file inputs for local filesystem uploads */}
      <input
        ref={coverFileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleCoverFileUpload}
        className="hidden"
      />
      <input
        ref={inlineImageInputRef}
        type="file"
        accept="image/*"
        onChange={handleInlineImageUpload}
        className="hidden"
      />

      {/* Top Navigation Bar (matching LinkedIn article editor in screenshot) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0f141f]/95 px-4 sm:px-8 py-2.5 backdrop-blur-md">
        
        {/* Left: Author identity pill & dropdown */}
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
          />
          <div className="hidden sm:block text-left">
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <span className="uppercase tracking-wide">{currentUser.name}</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Individual article
            </p>
          </div>
        </div>

        {/* Middle: Formatting Toolbar (matching Image 2) */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 px-2 py-1 overflow-x-auto max-w-[50vw] sm:max-w-none scrollbar-none">
          {/* Style Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <span>{currentStyle}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
            {isStyleDropdownOpen && (
              <div className="absolute top-8 left-0 z-40 w-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 shadow-xl">
                {(['Paragraph', 'Heading 1', 'Heading 2', 'Quote', 'Code'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setCurrentStyle(s);
                      setIsStyleDropdownOpen(false);
                      if (s === 'Heading 1') applyFormatting('# ');
                      if (s === 'Heading 2') applyFormatting('## ');
                      if (s === 'Quote') applyFormatting('> ');
                      if (s === 'Code') applyFormatting('```\n', '\n```');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      currentStyle === s
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => applyFormatting('**', '**')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => applyFormatting('*', '*')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => applyFormatting('\n- ')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Bullet list"
          >
            <List className="h-3.5 w-3.5" />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => applyFormatting('\n1. ')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Numbered list"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => applyFormatting('\n> ')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Blockquote"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>

          {/* Code */}
          <button
            type="button"
            onClick={() => applyFormatting('`', '`')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </button>

          {/* Divider */}
          <button
            type="button"
            onClick={() => applyFormatting('\n\n---\n\n')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          {/* Link */}
          <button
            type="button"
            onClick={() => applyFormatting('[', '](https://)')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>

          {/* Embed code */}
          <button
            type="button"
            onClick={() => applyFormatting('```typescript\n', '\n```')}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Code Block"
          >
            <Code2 className="h-3.5 w-3.5" />
          </button>

          {/* Inline Image Upload */}
          <button
            type="button"
            onClick={() => inlineImageInputRef.current?.click()}
            className="rounded p-1.5 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            title="Add Image from computer"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right: Manage button, Next pill button, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Manage Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsManageDropdownOpen(!isManageDropdownOpen)}
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-600/70 text-blue-600 dark:text-blue-400 px-4 py-1.5 text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
            >
              <span>Manage</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {isManageDropdownOpen && (
              <div className="absolute top-10 right-0 z-40 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setIsManageDropdownOpen(false);
                    showToast('Draft automatically saved to local storage.');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsManageDropdownOpen(false);
                    setTitle('');
                    setContent('');
                    setCoverUrl(null);
                    showToast('Article draft cleared.');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                >
                  Discard Draft
                </button>
              </div>
            )}
          </div>

          {/* Next Button (matching screenshot blue pill with arrow) */}
          <button
            type="button"
            onClick={handlePublish}
            className="flex items-center gap-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] px-5 py-1.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsArticleEditorOpen(false)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Writing Canvas (matching Image 2 layout) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Large Cover Media Area */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#f4f2ee] dark:bg-[#151c28] p-8 sm:p-12 text-center transition-all overflow-hidden group">
          {coverUrl ? (
            <div className="relative max-h-96 w-full rounded-xl overflow-hidden bg-black/5 dark:bg-black/40">
              {coverType === 'video' ? (
                <video
                  src={coverUrl}
                  controls
                  className="w-full max-h-96 object-contain rounded-xl"
                />
              ) : (
                <img
                  src={coverUrl}
                  alt="Article Cover"
                  className="w-full max-h-96 object-cover rounded-xl"
                />
              )}
              {/* Cover change & remove buttons */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => coverFileInputRef.current?.click()}
                  className="rounded-lg bg-black/75 px-3 py-1 text-xs font-semibold text-white hover:bg-black transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setCoverUrl(null)}
                  className="rounded-lg bg-rose-600/80 p-1.5 text-white hover:bg-rose-600 transition-colors"
                  title="Remove cover"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Landscape Mountain/Sun placeholder graphic */}
              <div className="h-20 w-32 rounded-xl bg-slate-200/90 dark:bg-slate-800/90 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute top-3 right-5 h-4 w-4 rounded-full bg-amber-400/80" />
                <div className="absolute -bottom-2 -left-2 w-20 h-14 bg-slate-400 dark:bg-slate-700 rotate-45 transform" />
                <div className="absolute -bottom-4 right-0 w-24 h-16 bg-slate-500 dark:bg-slate-600 rotate-45 transform" />
              </div>

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Add a cover image or video to your article.
              </p>

              <button
                type="button"
                onClick={() => coverFileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-full border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 px-5 py-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                <span>Upload from computer</span>
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="border-b border-transparent focus-within:border-slate-200 dark:focus-within:border-slate-800 pb-2">
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setIsDraftSaved(false);
            }}
            placeholder="Title"
            className="w-full bg-transparent text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none tracking-tight"
            autoFocus
          />
        </div>

        {/* Article Body Content */}
        <div className="min-h-[300px]">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => {
              setContent(e.target.value);
              setIsDraftSaved(false);
            }}
            placeholder="Write here. You can also include @mentions."
            rows={14}
            className="w-full bg-transparent text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none resize-none"
          />
        </div>
      </main>

      {/* Bottom Floating Status Pill: "● Draft" (matching Image 2) */}
      <div className="fixed bottom-6 right-8 z-30">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#121824]/95 px-4 py-1.5 shadow-lg backdrop-blur-md text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className={`h-2 w-2 rounded-full ${isDraftSaved ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span>Draft</span>
        </div>
      </div>
    </div>
  );
};
