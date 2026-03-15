import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, Download, X, Video, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const CMSDashboard = () => {
  const [data, setData] = useState(portfolioData);
  const [activeTab, setActiveTab] = useState('reels');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    // In a real production app, this would hit an API.
    // For this local dev setup, we provide the JSON for the user to copy.
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Updated JSON downloaded. Please replace src/data/portfolio.json with this file.');
  };

  const addItem = () => {
    const newItem = activeTab === 'reels' ? {
      slug: '',
      title: '',
      category: 'Commercial',
      year: new Date().getFullYear(),
      thumbnailUrl: '',
      videoUrl: '',
      description: '',
      credits: { director: '', production: '', dop: '', editor: '' },
      featured: false
    } : {
      slug: '',
      title: '',
      subtitle: '',
      year: new Date().getFullYear(),
      client: '',
      thumbnailUrl: '',
      videoUrl: '',
      description: '',
      accentColor: 'var(--saffron)'
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const editItem = (item) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const deleteItem = (slug) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedList = data[activeTab].filter(item => item.slug !== slug);
      setData({ ...data, [activeTab]: updatedList });
    }
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updatedList = [...data[activeTab]];
    const index = updatedList.findIndex(item => item.slug === editingItem.slug);

    if (index > -1) {
      updatedList[index] = editingItem;
    } else {
      // Check if slug is unique
      if (data[activeTab].some(item => item.slug === editingItem.slug)) {
        alert('Slug must be unique!');
        return;
      }
      updatedList.push(editingItem);
    }

    setData({ ...data, [activeTab]: updatedList });
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-[#06050a] text-[#f7f0e6] pt-32 pb-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#e28a3a] mb-2 block font-medium">Administration</span>
            <h1 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-light">Content Management</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-[#e28a3a] hover:bg-[#ef9c4e] text-black px-6 py-3 rounded-full transition-colors font-medium text-sm uppercase tracking-wider"
            >
              <Plus size={18} /> Add New {activeTab === 'reels' ? 'Reel' : 'Project'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 border border-[#f7f0e633] hover:bg-[#f7f0e611] px-6 py-3 rounded-full transition-colors font-medium text-sm uppercase tracking-wider"
            >
              <Download size={18} /> Export JSON
            </button>
          </div>
        </header>

        <nav className="flex gap-8 border-b border-[#f7f0e611] mb-8">
          {['reels', 'projects'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm uppercase tracking-[0.2em] transition-all relative ${
                activeTab === tab ? 'text-[#f7f0e6]' : 'text-[#f7f0e666] hover:text-[#f7f0e6]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e28a3a]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {data[activeTab].map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#121117] border border-[#f7f0e611] rounded-xl overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => editItem(item)}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteItem(item.slug)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Cormorant_Garamond'] text-xl font-light">{item.title}</h3>
                    <span className="text-[10px] tracking-widest uppercase text-[#f7f0e666]">{item.year}</span>
                  </div>
                  <p className="text-xs text-[#f7f0e699] line-clamp-2 mb-4 font-light">
                    {item.description}
                  </p>
                  <div className="flex gap-3">
                    {item.videoUrl.includes('vimeo') && <span className="text-[10px] bg-[#00adef22] text-[#00adef] px-2 py-1 rounded">Vimeo</span>}
                    {item.videoUrl.includes('youtube') && <span className="text-[10px] bg-[#ff000022] text-[#ff0000] px-2 py-1 rounded">YouTube</span>}
                    {item.videoUrl.includes('instagram') && <span className="text-[10px] bg-[#e1306c22] text-[#e1306c] px-2 py-1 rounded">Reel</span>}
                    {item.featured && <span className="text-[10px] bg-[#e28a3a22] text-[#e28a3a] px-2 py-1 rounded">Featured</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#121117] border border-[#f7f0e622] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-[#f7f0e611] flex justify-between items-center">
                <h2 className="text-2xl font-['Cormorant_Garamond'] font-light">
                  {editingItem?.slug ? 'Edit' : 'Add New'} {activeTab === 'reels' ? 'Reel' : 'Project'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#f7f0e666] hover:text-[#f7f0e6]">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={saveEdit} className="p-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Basic Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Slug (Unique Identifier)</label>
                      <input
                        required
                        type="text"
                        value={editingItem.slug}
                        onChange={e => setEditingItem({ ...editingItem, slug: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        placeholder="e.g. roshni-brand-film"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Title</label>
                      <input
                        required
                        type="text"
                        value={editingItem.title}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        placeholder="Project Title"
                      />
                    </div>
                    {activeTab === 'reels' ? (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Category</label>
                        <select
                          value={editingItem.category}
                          onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="w-full bg-[#121117] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        >
                          <option value="Commercial">Commercial</option>
                          <option value="Music Video">Music Video</option>
                          <option value="Short Film">Short Film</option>
                          <option value="Documentary">Documentary</option>
                          <option value="Creative Direction">Creative Direction</option>
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Subtitle</label>
                        <input
                          type="text"
                          value={editingItem.subtitle}
                          onChange={e => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                          placeholder="e.g. Brand Film — Sustainable Textiles"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Year</label>
                        <input
                          type="number"
                          value={editingItem.year}
                          onChange={e => setEditingItem({ ...editingItem, year: parseInt(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        />
                      </div>
                      {activeTab === 'projects' && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Client</label>
                          <input
                            type="text"
                            value={editingItem.client}
                            onChange={e => setEditingItem({ ...editingItem, client: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Media & Meta */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Thumbnail URL (Direct Image Link)</label>
                      <input
                        required
                        type="url"
                        value={editingItem.thumbnailUrl}
                        onChange={e => setEditingItem({ ...editingItem, thumbnailUrl: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Video URL (YouTube, Vimeo, Reels, Cloudinary)</label>
                      <input
                        required
                        type="url"
                        value={editingItem.videoUrl}
                        onChange={e => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors"
                        placeholder="https://vimeo.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#f7f0e666]">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={editingItem.description}
                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#e28a3a] outline-none transition-colors resize-none"
                      />
                    </div>
                    {activeTab === 'reels' && (
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={editingItem.featured}
                          onChange={e => setEditingItem({ ...editingItem, featured: e.target.checked })}
                          className="w-4 h-4 accent-[#e28a3a]"
                        />
                        <label htmlFor="featured" className="text-sm font-light">Featured on homepage</label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#e28a3a] text-black rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#ef9c4e] transition-colors flex items-center gap-2"
                  >
                    <Save size={18} /> Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CMSDashboard;
