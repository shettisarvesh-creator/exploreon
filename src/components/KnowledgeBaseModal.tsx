import React, { useState, useEffect } from 'react';
import { HistoricalKnowledgeDoc } from '../types';
import { BookOpen, X, Plus, Upload, ShieldCheck, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ isOpen, onClose }) => {
  const [docs, setDocs] = useState<HistoricalKnowledgeDoc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<HistoricalKnowledgeDoc | null>(null);
  const [showIngestForm, setShowIngestForm] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Hampi');
  const [country, setCountry] = useState('India');
  const [yearStart, setYearStart] = useState('1500');
  const [yearEnd, setYearEnd] = useState('1550');
  const [source, setSource] = useState('');
  const [sourceType, setSourceType] = useState<'Primary Source' | 'Academic' | 'Archaeological' | 'Chronicle' | 'Museum Archive'>('Academic');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/sources')
        .then(res => res.json())
        .then(data => {
          setDocs(data || []);
          if (data && data.length > 0) setSelectedDoc(data[0]);
        })
        .catch(err => console.error('Failed to load sources:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !location) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sources/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          location,
          country,
          yearStart: parseInt(yearStart, 10) || 1500,
          yearEnd: parseInt(yearEnd, 10) || 1550,
          period: 'User Ingested Era',
          topic: 'Custom Historical Record',
          source: source || 'User Archive Contribution',
          sourceType,
          content
        })
      });

      const data = await res.json();
      if (data.success && data.document) {
        setDocs(prev => [data.document, ...prev]);
        setSelectedDoc(data.document);
        setSubmitSuccess(true);
        setShowIngestForm(false);
        // Reset form
        setTitle('');
        setContent('');
        setSource('');
      }
    } catch (err) {
      console.error('Ingest error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#080809]/95 glass border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F27D26]/15 border border-[#F27D26]/30 flex items-center justify-center text-[#F27D26]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs mono uppercase tracking-[0.2em] text-[#F27D26]">
                <span>HISTORIOGRAPHICAL ARCHIVE</span>
              </div>
              <h2 className="text-2xl font-normal serif text-white mt-1">
                Historical Evidence & Document Ingestion
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowIngestForm(!showIngestForm)}
              className="flex items-center gap-2 px-3.5 py-2 rounded glass border border-white/10 text-[#E5E5E1] mono text-xs uppercase tracking-wider hover:border-[#F27D26]/50 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>{showIngestForm ? 'View Repository' : 'Ingest Document'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#A1A1A1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {showIngestForm ? (
            /* Ingestion Form */
            <form onSubmit={handleIngest} className="max-w-2xl mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-[#F27D26]/30">
                <h3 className="text-sm font-bold serif text-[#F27D26]">
                  Add Document to CHRONO RAG Pipeline
                </h3>
                <p className="text-xs text-[#A1A1A1] font-sans mt-1">
                  Text will be parsed, cleaned, chunked into dense vectors, and metadata-tagged with temporal decay weights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Archaeological Survey of Hampi Temples"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Historical Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hampi, Rome, Kyoto"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Start Year (AD / -BC)</label>
                  <input
                    type="number"
                    value={yearStart}
                    onChange={e => setYearStart(e.target.value)}
                    className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">End Year (AD / -BC)</label>
                  <input
                    type="number"
                    value={yearEnd}
                    onChange={e => setYearEnd(e.target.value)}
                    className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] focus:outline-none focus:border-[#F27D26]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Source Type</label>
                  <select
                    value={sourceType}
                    onChange={e => setSourceType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] focus:outline-none focus:border-[#F27D26] bg-[#050506]"
                  >
                    <option value="Primary Source">Primary Source</option>
                    <option value="Academic">Academic Paper</option>
                    <option value="Archaeological">Archaeological Report</option>
                    <option value="Chronicle">Historical Chronicle</option>
                    <option value="Museum Archive">Museum Archive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Citation / Author / Reference</label>
                <input
                  type="text"
                  placeholder="e.g. Archaeological Survey of India (ASI Report No. 44)"
                  value={source}
                  onChange={e => setSource(e.target.value)}
                  className="w-full px-3 py-2.5 rounded glass border border-white/10 text-xs text-[#E5E5E1] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26]"
                />
              </div>

              <div>
                <label className="block text-[10px] mono uppercase tracking-wider text-[#A1A1A1] mb-1">Document Body / Excerpt *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Paste historical excerpt, chronicle translation, excavation field notes, or journal passage..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full p-3 rounded-xl glass border border-white/10 text-xs text-[#E5E5E1] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26] serif leading-relaxed"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 rounded bg-[#F27D26] hover:bg-[#ff8e38] text-black font-bold text-xs mono uppercase tracking-widest shadow-md disabled:opacity-50 transition-transform active:scale-95 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Embedding & Indexing...' : 'Embed & Index Document'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Document Explorer */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Document List */}
              <div className="md:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                <div className="text-xs mono uppercase tracking-wider text-[#A1A1A1] pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>Indexed Texts ({docs.length})</span>
                  <span className="text-[10px]">Select to inspect</span>
                </div>
                {docs.map(d => {
                  const isSelected = selectedDoc?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDoc(d)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white/[0.08] border-[#F27D26] shadow-md ring-1 ring-[#F27D26]/30' 
                          : 'glass border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 text-[10px] mono uppercase tracking-wider text-[#F27D26] mb-1">
                        <span>{d.location}</span>
                        <span>{d.yearStart > 0 ? `${d.yearStart} AD` : `${Math.abs(d.yearStart)} BC`}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#E5E5E1] serif line-clamp-1">
                        {d.title}
                      </h4>
                      <p className="text-[11px] text-[#A1A1A1] mono truncate mt-0.5">
                        {d.sourceType} • {d.source}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Document Reader */}
              <div className="md:col-span-7 glass border border-white/10 rounded-2xl p-6 space-y-4">
                {selectedDoc ? (
                  <>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] mono uppercase tracking-wider px-2 py-0.5 rounded border border-[#F27D26]/40 text-[#F27D26]">
                          {selectedDoc.sourceType}
                        </span>
                        <span className="text-[10px] mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#E5E5E1] border border-white/10">
                          {selectedDoc.location} ({selectedDoc.yearStart > 0 ? `${selectedDoc.yearStart} AD` : `${Math.abs(selectedDoc.yearStart)} BC`})
                        </span>
                      </div>
                      <h3 className="text-xl font-normal serif text-white">
                        {selectedDoc.title}
                      </h3>
                      <p className="text-xs mono text-[#A1A1A1] mt-1">
                        Source Reference: {selectedDoc.source}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 max-h-72 overflow-y-auto">
                      <p className="serif text-xs md:text-sm text-zinc-300 leading-relaxed italic whitespace-pre-wrap">
                        "{selectedDoc.content}"
                      </p>
                    </div>

                    <div className="text-[11px] mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 pt-2">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Ready for dense vector semantic search & metadata filtering</span>
                    </div>
                  </>
                ) : (
                  <div className="text-xs mono text-[#A1A1A1] py-12 text-center">
                    Select a document to inspect its grounded text.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
