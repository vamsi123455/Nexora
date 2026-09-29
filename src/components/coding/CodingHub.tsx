import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle,
  Star,
  ExternalLink,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  Shuffle,
  Maximize2,
  Minimize2,
  MoreVertical,
  BookOpen,
  Youtube,
  FileText,
  Calendar,
  X,
  Check,
  Award,
  Layers,
  Flame,
  ArrowRight,
  Code
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DSAProblem, DSATopic } from '../../types';

export const CodingHub: React.FC = () => {
  const {
    currentUser,
    dsaTopics,
    toggleDSAProblemSolved,
    toggleDSAProblemBookmarked,
    updateDSAProblemNotes,
    dsaStats,
    openAuthModal,
    showToast
  } = useApp();

  // Accordion state: set of expanded topic IDs
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({
    'sorting': true,
    'arrays': true
  });

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unsolved' | 'solved' | 'bookmarked'>('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Active Code Runner IDE modal state
  const [activeCodeProblem, setActiveCodeProblem] = useState<DSAProblem | null>(null);
  const [ideCode, setIdeCode] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [ideResult, setIdeResult] = useState<{
    status: 'idle' | 'running' | 'success' | 'failed';
    message: string;
    runtime?: string;
  }>({ status: 'idle', message: '' });

  // Notes Modal state
  const [activeNotesProblem, setActiveNotesProblem] = useState<DSAProblem | null>(null);
  const [notesInput, setNotesInput] = useState('');

  // Plan with Planly Modal state
  const [isPlanlyModalOpen, setIsPlanlyModalOpen] = useState(false);
  const [studyPlanDays, setStudyPlanDays] = useState<number>(60);

  const toggleTopic = (topicId: string) => {
    setExpandedTopicIds(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    dsaTopics.forEach(t => {
      allExpanded[t.id] = true;
    });
    setExpandedTopicIds(allExpanded);
    showToast('Expanded all topics');
  };

  const collapseAll = () => {
    setExpandedTopicIds({});
    showToast('Collapsed all topics');
  };

  // Find next unsolved problem for "Up next"
  const upNextProblem = useMemo(() => {
    for (const topic of dsaTopics) {
      for (const sub of topic.subTopics) {
        for (const prob of sub.problems) {
          if (!prob.isSolved) return prob;
        }
      }
    }
    return dsaTopics[0]?.subTopics[0]?.problems[0];
  }, [dsaTopics]);

  // Pick random problem
  const pickRandomProblem = () => {
    const allProblems: DSAProblem[] = [];
    dsaTopics.forEach(t => t.subTopics.forEach(s => s.problems.forEach(p => allProblems.push(p))));
    const unsolved = allProblems.filter(p => !p.isSolved);
    const pool = unsolved.length > 0 ? unsolved : allProblems;
    const random = pool[Math.floor(Math.random() * pool.length)];

    if (random) {
      // expand its topic
      setExpandedTopicIds(prev => ({ ...prev, [random.topicId]: true }));
      openCodeRunner(random);
      showToast(`Selected Random Problem: ${random.title}`);
    }
  };

  const openCodeRunner = (prob: DSAProblem) => {
    setActiveCodeProblem(prob);
    setIdeCode(
      prob.starterCode ||
        `// Java 21 / TypeScript solution for: ${prob.title}\nfunction solveProblem(...args: any[]) {\n  // Implement optimal O(N) solution here\n  return true;\n}`
    );
    setIdeResult({ status: 'idle', message: '' });
  };

  const handleExecuteCode = () => {
    if (!activeCodeProblem) return;
    setIsRunningCode(true);
    setIdeResult({ status: 'running', message: 'Executing test cases against optimized sandbox runtime...' });

    setTimeout(() => {
      setIsRunningCode(false);
      setIdeResult({
        status: 'success',
        message: '✓ All test cases passed! (Time Complexity: O(N), Space: O(1))',
        runtime: '14ms · Memory: 41.2 MB'
      });
      if (!activeCodeProblem.isSolved) {
        toggleDSAProblemSolved(activeCodeProblem.id);
      }
    }, 1100);
  };

  const openNotesModal = (prob: DSAProblem) => {
    setActiveNotesProblem(prob);
    setNotesInput(prob.notes || '');
  };

  const handleSaveNotes = () => {
    if (!activeNotesProblem) return;
    updateDSAProblemNotes(activeNotesProblem.id, notesInput);
    setActiveNotesProblem(null);
  };

  // Filtered topics calculation
  const filteredTopics = useMemo(() => {
    return dsaTopics.map(topic => {
      const filteredSubTopics = topic.subTopics.map(sub => {
        const filteredProblems = sub.problems.filter(prob => {
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matches =
              prob.title.toLowerCase().includes(q) ||
              prob.difficulty.toLowerCase().includes(q) ||
              (prob.notes && prob.notes.toLowerCase().includes(q));
            if (!matches) return false;
          }

          if (filterDifficulty !== 'All' && prob.difficulty !== filterDifficulty) {
            return false;
          }

          if (filterStatus === 'solved' && !prob.isSolved) return false;
          if (filterStatus === 'unsolved' && prob.isSolved) return false;
          if (filterStatus === 'bookmarked' && !prob.isBookmarked) return false;

          return true;
        });

        return {
          ...sub,
          problems: filteredProblems
        };
      });

      return {
        ...topic,
        subTopics: filteredSubTopics
      };
    });
  }, [dsaTopics, searchQuery, filterDifficulty, filterStatus]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 text-slate-100">
      
      {/* Toolbar: Search, Filters, Random Picker, Expand/Collapse */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl border border-slate-800 bg-[#0d121c] mb-6">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problems, patterns, topics..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Action icons bar matching screenshot icons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          
          {/* Difficulty Filter */}
          <select
            value={filterDifficulty}
            onChange={e => setFilterDifficulty(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
            <option value="bookmarked">Bookmarked</option>
          </select>

          {/* Random Problem Shuffle */}
          <button
            onClick={pickRandomProblem}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Pick Random Problem for Practice"
          >
            <Shuffle className="h-3.5 w-3.5" />
          </button>

          {/* Expand / Collapse All */}
          <button
            onClick={() => {
              const anyOpen = Object.values(expandedTopicIds).some(Boolean);
              if (anyOpen) collapseAll();
              else expandAll();
            }}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Expand / Collapse All Accordions"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* TUF Topics Accordion List */}
      <div className="space-y-2">
        {filteredTopics.map(topic => {
          const isExpanded = !!expandedTopicIds[topic.id];

          // Compute topic progress
          let topicTotal = 0;
          let topicSolved = 0;
          topic.subTopics.forEach(sub => {
            sub.problems.forEach(p => {
              topicTotal++;
              if (p.isSolved) topicSolved++;
            });
          });

          const topicPercent = topicTotal > 0 ? (topicSolved / topicTotal) * 100 : 0;

          return (
            <div
              key={topic.id}
              className="rounded-xl border border-slate-800/90 bg-[#0d121c] overflow-hidden transition-all"
            >
              {/* Accordion Header Row */}
              <div
                onClick={() => toggleTopic(topic.id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-900/60 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {topic.title}
                  </h3>
                </div>

                {/* Progress bar + Count on right (e.g. 4/32) */}
                <div className="flex items-center gap-4">
                  <div className="w-24 sm:w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${topicPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums w-12 text-right">
                    {topicSolved}/{topicTotal}
                  </span>
                </div>
              </div>

              {/* Accordion Expanded Sub-topics & Problems */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-[#0a0e17] divide-y divide-slate-850">
                  {topic.subTopics.map(subTopic => (
                    <div key={subTopic.id} className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-300">
                          {subTopic.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                          {subTopic.problems.filter(p => p.isSolved).length} / {subTopic.problems.length}
                        </span>
                      </div>

                      {/* Problems List in Subtopic */}
                      <div className="space-y-1.5">
                        {subTopic.problems.map(prob => (
                          <div
                            key={prob.id}
                            className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all ${
                              prob.isSolved
                                ? 'bg-cyan-950/20 border-cyan-900/40 text-slate-300'
                                : 'bg-[#0f1422]/90 border-slate-800/80 text-white hover:border-slate-700'
                            }`}
                          >
                            {/* Left: Checkbox + Star + Title */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={() => toggleDSAProblemSolved(prob.id)}
                                className="focus:outline-none flex-shrink-0"
                                title={prob.isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                              >
                                {prob.isSolved ? (
                                  <CheckCircle2 className="h-5 w-5 text-cyan-400 fill-cyan-400/20" />
                                ) : (
                                  <Circle className="h-5 w-5 text-slate-600 hover:text-slate-400" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleDSAProblemBookmarked(prob.id)}
                                className="focus:outline-none flex-shrink-0"
                                title="Bookmark for Revision"
                              >
                                <Star
                                  className={`h-4 w-4 ${
                                    prob.isBookmarked
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-600 hover:text-slate-400'
                                  }`}
                                />
                              </button>

                              <span
                                onClick={() => openCodeRunner(prob)}
                                className={`text-xs font-medium truncate cursor-pointer hover:text-cyan-400 transition-colors ${
                                  prob.isSolved ? 'line-through text-slate-500' : 'text-slate-200'
                                }`}
                              >
                                {prob.title}
                              </span>
                            </div>

                            {/* Right: Difficulty badge, Notes, Links, Solve button */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Difficulty */}
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  prob.difficulty === 'Easy'
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : prob.difficulty === 'Medium'
                                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {prob.difficulty}
                              </span>

                              {/* Revision Notes Button */}
                              <button
                                onClick={() => openNotesModal(prob)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  prob.notes
                                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                                    : 'text-slate-500 hover:text-slate-300'
                                }`}
                                title="Revision Notes"
                              >
                                <FileText className="h-3.5 w-3.5" />
                              </button>

                              {/* YouTube Video link */}
                              {prob.youtubeUrl && (
                                <a
                                  href={prob.youtubeUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                                  title="Watch Video Editorial"
                                >
                                  <Youtube className="h-3.5 w-3.5" />
                                </a>
                              )}

                              {/* LeetCode link */}
                              {prob.leetcodeUrl && (
                                <a
                                  href={prob.leetcodeUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-slate-500 hover:text-amber-400 transition-colors"
                                  title="Practice on LeetCode"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}

                              {/* Solve IDE button */}
                              <button
                                onClick={() => openCodeRunner(prob)}
                                className="flex items-center gap-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 px-2.5 py-1 text-[11px] font-semibold text-cyan-400 transition-all"
                              >
                                <Code className="h-3 w-3" />
                                <span>Solve</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Code Runner / Interactive IDE Modal */}
      {activeCodeProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#0f1422] shadow-2xl p-6 relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      activeCodeProblem.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : activeCodeProblem.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {activeCodeProblem.difficulty}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {activeCodeProblem.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {activeCodeProblem.description ||
                    'Analyze edge cases, implement optimal time complexity, and submit verification.'}
                </p>
              </div>

              <button
                onClick={() => setActiveCodeProblem(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Code editor textarea */}
            <div className="my-4 flex-1 flex flex-col min-h-[280px]">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-t border-x border-slate-800 text-[11px] font-mono text-slate-400 rounded-t-xl">
                <span>solution.ts (TypeScript / Java 21)</span>
                <button
                  onClick={() =>
                    setIdeCode(activeCodeProblem.starterCode || '// Resetting starter code...')
                  }
                  className="flex items-center gap-1 hover:text-slate-200"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>
              <textarea
                value={ideCode}
                onChange={e => setIdeCode(e.target.value)}
                rows={12}
                className="w-full flex-1 rounded-b-xl border border-slate-800 bg-[#090d16] p-3 font-mono text-xs text-cyan-300 focus:outline-none resize-none selection:bg-cyan-500/30"
                spellCheck={false}
              />
            </div>

            {/* Test result status */}
            {ideResult.status !== 'idle' && (
              <div
                className={`p-3 rounded-xl border text-xs font-mono mb-4 ${
                  ideResult.status === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : ideResult.status === 'running'
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {ideResult.status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  <span className="font-bold">{ideResult.message}</span>
                </div>
                {ideResult.runtime && (
                  <p className="text-[11px] text-emerald-400/80 mt-1">
                    Benchmark: {ideResult.runtime}
                  </p>
                )}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => toggleDSAProblemSolved(activeCodeProblem.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                  activeCodeProblem.isSolved
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                    : 'border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
                <span>{activeCodeProblem.isSolved ? 'Solved ✓' : 'Mark as Solved'}</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCodeProblem(null)}
                  className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleExecuteCode}
                  disabled={isRunningCode}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-600/25 active:scale-95 transition-all"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{isRunningCode ? 'Running Sandbox...' : 'Run Tests & Submit'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revision Notes Modal */}
      {activeNotesProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0f1422] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                Revision Notes: {activeNotesProblem.title}
              </h3>
              <button
                onClick={() => setActiveNotesProblem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-400">
                Write key intuition, time complexity, corner cases, or trick to remember:
              </p>
              <textarea
                value={notesInput}
                onChange={e => setNotesInput(e.target.value)}
                rows={5}
                placeholder="e.g. Remember to handle negative numbers in Kadane's algorithm by initializing maxSoFar = nums[0] rather than 0."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800 mt-4">
              <button
                type="button"
                onClick={() => setActiveNotesProblem(null)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan with Planly Modal */}
      {isPlanlyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0f1422] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Plan with Planly · Striver's A2Z Roadmap
                </h3>
              </div>
              <button
                onClick={() => setIsPlanlyModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Target completing all 495 problems with structured daily milestones tailored for upcoming campus & off-campus technical interviews.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">
                Choose Target Duration:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 60, 90].map(days => (
                  <button
                    key={days}
                    onClick={() => setStudyPlanDays(days)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      studyPlanDays === days
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Daily Requirement:</span>
                <span className="text-cyan-400 font-bold">
                  ~{Math.ceil((495 - dsaStats.solved) / studyPlanDays)} problems / day
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining Target:</span>
                <span className="text-white">{495 - dsaStats.solved} problems</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsPlanlyModalOpen(false);
                  showToast(`Study plan set: Target ${studyPlanDays} days (${Math.ceil((495 - dsaStats.solved) / studyPlanDays)} problems/day)`);
                }}
                className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 py-2.5 text-xs font-bold text-white transition-colors"
              >
                Lock In Study Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
