import { useEffect, useState } from 'react';
import { VIPConfig, VIPBenefitItem, VIPAdditionalFile } from '../types';
import { getVIPConfig, updateVIPConfig } from '../lib/db';
import { uploadStoreItem } from '../lib/storage';
import { Crown, Plus, Save, X, Trash2, FolderOpen } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const emptyItem = (): VIPBenefitItem => ({ name: '', img: '', peculiarityId: 0, title: '' });
const emptyFile = (): VIPAdditionalFile => ({ name: '', url: '', type: '' });

export default function VIPPage() {
  const [configs, setConfigs] = useState<VIPConfig[]>([]);
  const [editing, setEditing] = useState<VIPConfig | null>(null);
  const [form, setForm] = useState({
    name: '', minSpend: 0, price: 0, color: '#DE880F',
    image_url: '', bg_url: '', logo_url: '',
    medal_url: '', medal_img_url: '',
    headwear_url: '', headwear_img_url: '',
    entrance_url: '', entrance_img_url: '',
    bubble_url: '', bubble_img_url: '',
    necklace_url: '', necklace_img_url: '',
  });
  const [items, setItems] = useState<VIPBenefitItem[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<VIPAdditionalFile[]>([]);

  useEffect(() => { getVIPConfig().then(setConfigs); }, []);

  const handleEdit = (v: VIPConfig) => {
    setEditing(v);
    setForm({
      name: v.name, minSpend: v.minSpend, price: v.price || 0,
      color: v.color || '#DE880F',
      image_url: v.image_url || '', bg_url: v.bg_url || '',
      logo_url: v.logo_url || '',
      medal_url: v.medal_url || '', medal_img_url: v.medal_img_url || '',
      headwear_url: v.headwear_url || '', headwear_img_url: v.headwear_img_url || '',
      entrance_url: v.entrance_url || '', entrance_img_url: v.entrance_img_url || '',
      bubble_url: v.bubble_url || '', bubble_img_url: v.bubble_img_url || '',
      necklace_url: v.necklace_url || '', necklace_img_url: v.necklace_img_url || '',
    });
    setItems(v.items?.length ? v.items : v.benefits.map(b => ({ name: b, img: '', peculiarityId: 0, title: '' })));
    setAdditionalFiles(v.additional_files || []);
  };

  const handleSave = async () => {
    if (!editing) return;
    const benefits = items.map(i => i.name).filter(Boolean);
    await updateVIPConfig(editing.tier, { ...form, benefits, items, additional_files: additionalFiles });
    setEditing(null);
    setConfigs(await getVIPConfig());
  };

  const handleAdd = async () => {
    const lastTier = configs.length > 0 ? Math.max(...configs.map(c => c.tier)) : 0;
    const newTier = lastTier + 1;
    await updateVIPConfig(newTier, {
      tier: newTier, name: `VIP ${newTier}`, minSpend: newTier * 1000, color: '#DE880F',
      benefits: [`Access to VIP ${newTier} features`],
    });
    setConfigs(await getVIPConfig());
  };

  const updateItem = (idx: number, field: keyof VIPBenefitItem, value: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const addFile = () => setAdditionalFiles(prev => [...prev, emptyFile()]);
  const removeFile = (idx: number) => setAdditionalFiles(prev => prev.filter((_, i) => i !== idx));
  const updateFile = (idx: number, field: keyof VIPAdditionalFile, value: string) => {
    setAdditionalFiles(prev => prev.map((f, i) => i === idx ? { ...f, [field]: value } : f));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-semibold">VIP Configuration</h2>
          <p className="text-slate-500 text-xs mt-0.5">{configs.length} VIP tiers</p>
        </div>
        <button onClick={handleAdd} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs text-white font-semibold rounded-lg flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Tier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map(v => (
          <div key={v.tier} className="bg-[#141417] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleEdit(v)}>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5" style={{ color: v.color || '#DE880F' }} />
              <h3 className="text-white font-semibold text-sm">VIP {v.tier}</h3>
            </div>
            {v.image_url && (
              <img src={v.image_url} alt={v.name} className="w-full h-28 object-contain rounded-lg mb-2 bg-black/30" />
            )}
            <div className="text-lg font-bold font-mono" style={{ color: v.color || '#DE880F' }}>{v.name}</div>
            <div className="text-[10px] text-slate-500 mt-1">Min spend: ${v.minSpend.toLocaleString()}</div>
            <ul className="mt-2 space-y-1">
              {v.benefits?.map((b, i) => <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1"><span className="text-emerald-400 mt-0.5">•</span>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {editing && (
        <div className="bg-[#141417] rounded-2xl border border-indigo-500/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Edit VIP {editing.tier}</h3>
            <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Name</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#161618] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Min Spend ($)</label>
              <input type="number" value={form.minSpend} onChange={e => setForm(p => ({ ...p, minSpend: Number(e.target.value) }))} className="w-full bg-[#161618] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white" />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/10" />
                <input type="text" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="flex-1 bg-[#161618] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Price ($)</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))} className="w-full bg-[#161618] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ImageUpload
              currentUrl={form.image_url}
              onUpload={(file) => uploadStoreItem(file, `vip_img_${editing.tier}`)}
              onUrlChange={(url) => setForm(p => ({ ...p, image_url: url }))}
              label="VIP Image (صورة)"
              accept="image/*,.svga,.zip"
            />
            <ImageUpload
              currentUrl={form.bg_url}
              onUpload={(file) => uploadStoreItem(file, `vip_bg_${editing.tier}`)}
              onUrlChange={(url) => setForm(p => ({ ...p, bg_url: url }))}
              label="Background (الغلاف)"
              accept="image/*,.svga,.zip"
            />
            <ImageUpload
              currentUrl={form.logo_url}
              onUpload={(file) => uploadStoreItem(file, `vip_logo_${editing.tier}`)}
              onUrlChange={(url) => setForm(p => ({ ...p, logo_url: url }))}
              label="Logo"
              accept="image/*,.svga,.zip"
            />
          </div>

          <div className="border-t border-white/5 pt-4">
            <h4 className="text-[10px] uppercase text-slate-400 font-bold mb-3">VIP Items — Image + Model (صورة + موديل)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <ImageUpload
                  currentUrl={form.headwear_img_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_headwear_img_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, headwear_img_url: url }))}
                  label="Frame Image (صورة الإطار)"
                  accept="image/*"
                />
                <ImageUpload
                  currentUrl={form.headwear_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_headwear_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, headwear_url: url }))}
                  label="Frame SVGA (موديل الإطار)"
                  accept=".svga,.zip"
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <ImageUpload
                  currentUrl={form.entrance_img_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_entrance_img_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, entrance_img_url: url }))}
                  label="Entrance Image (صورة الدخولية)"
                  accept="image/*"
                />
                <ImageUpload
                  currentUrl={form.entrance_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_entrance_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, entrance_url: url }))}
                  label="Entrance SVGA (موديل الدخولية)"
                  accept=".svga,.zip"
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <ImageUpload
                  currentUrl={form.medal_img_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_medal_img_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, medal_img_url: url }))}
                  label="Medal Image (صورة الوسام)"
                  accept="image/*"
                />
                <ImageUpload
                  currentUrl={form.medal_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_medal_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, medal_url: url }))}
                  label="Medal SVGA (موديل الوسام)"
                  accept=".svga,.zip"
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <ImageUpload
                  currentUrl={form.bubble_img_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_bubble_img_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, bubble_img_url: url }))}
                  label="Bubble Image (صورة الفقعه)"
                  accept="image/*"
                />
                <ImageUpload
                  currentUrl={form.bubble_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_bubble_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, bubble_url: url }))}
                  label="Bubble SVGA (موديل الفقعه)"
                  accept=".svga,.zip"
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 gap-2">
                <ImageUpload
                  currentUrl={form.necklace_img_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_necklace_img_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, necklace_img_url: url }))}
                  label="Necklace Image (صورة القلاده)"
                  accept="image/*"
                />
                <ImageUpload
                  currentUrl={form.necklace_url}
                  onUpload={(file) => uploadStoreItem(file, `vip_necklace_${editing.tier}`)}
                  onUrlChange={(url) => setForm(p => ({ ...p, necklace_url: url }))}
                  label="Necklace SVGA (موديل القلاده)"
                  accept=".svga,.zip"
                />
              </div>
            </div>
            </div>
          </div>

          {/* Benefit Items with Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] uppercase text-slate-400 font-bold">Benefits / Features (المميزات)</label>
              <button onClick={addItem} className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-[10px] text-white font-semibold rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="bg-[#161618] rounded-xl border border-white/5 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] text-slate-500 font-semibold">Item #{idx + 1}</span>
                    <button onClick={() => removeItem(idx)} className="text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Benefit Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={e => updateItem(idx, 'name', e.target.value)}
                        className="w-full bg-[#141417] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white"
                        placeholder="e.g. Exclusive VIP Badge"
                      />
                    </div>
                    <ImageUpload
                      currentUrl={item.img}
                      onUpload={(file) => uploadStoreItem(file, `vip_benefit_${editing.tier}_${idx}`)}
                      onUrlChange={(url) => updateItem(idx, 'img', url)}
                      label={`Benefit Image ${idx + 1}`}
                      accept="image/*"
                    />
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-[10px] text-slate-600 text-center py-4">No benefits added yet. Click "Add" to add one.</p>
              )}
            </div>
          </div>

          {/* Additional Files */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1"><FolderOpen className="w-3 h-3" /> Additional Files (ملفات إضافية)</label>
              <button onClick={addFile} className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-[10px] text-white font-semibold rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {additionalFiles.map((file, idx) => (
                <div key={idx} className="bg-[#161618] rounded-xl border border-white/5 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] text-slate-500 font-semibold">File #{idx + 1}</span>
                    <button onClick={() => removeFile(idx)} className="text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={file.name}
                        onChange={e => updateFile(idx, 'name', e.target.value)}
                        className="w-full bg-[#141417] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white"
                        placeholder="e.g. Wings, Halo"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Type (نوع الملف)</label>
                      <input
                        type="text"
                        value={file.type}
                        onChange={e => updateFile(idx, 'type', e.target.value)}
                        className="w-full bg-[#141417] border border-white/10 rounded-lg py-1.5 px-2 text-xs text-white"
                        placeholder="svga / image / zip"
                      />
                    </div>
                    <ImageUpload
                      currentUrl={file.url}
                      onUpload={(f) => uploadStoreItem(f, `vip_extra_${editing.tier}_${idx}`)}
                      onUrlChange={(url) => updateFile(idx, 'url', url)}
                      label={`File ${idx + 1}`}
                      accept="image/*,.svga,.zip"
                    />
                  </div>
                </div>
              ))}
              {additionalFiles.length === 0 && (
                <p className="text-[10px] text-slate-600 text-center py-4">No additional files added yet.</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs text-white font-semibold rounded-lg flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-1.5 border border-white/10 text-xs text-slate-400 rounded-lg">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
