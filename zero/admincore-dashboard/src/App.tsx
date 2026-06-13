import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthChange } from './lib/auth';
import type { User } from '@supabase/supabase-js';
import { I18nContext } from './lib/i18n';
import type { Lang } from './lib/i18n';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Gifts from './pages/Gifts';
import Store from './pages/Store';
import Rooms from './pages/Rooms';
import Unions from './pages/Unions';
import VIP from './pages/VIP';
import VIPGifting from './pages/VIPGifting';
import Levels from './pages/Levels';
import Badges from './pages/Badges';
import Necklaces from './pages/Necklaces';
import BadgeNecklaceGifts from './pages/BadgeNecklaceGifts';
import Agency from './pages/Agency';
import CP from './pages/CP';
import BD from './pages/BD';
import ImageCustomize from './pages/ImageCustomize';
import ColorCustomize from './pages/ColorCustomize';
import ErrorAnalysis from './pages/ErrorAnalysis';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Banners from './pages/Banners';
import GiftItems from './pages/GiftItems';
import AppAssets from './pages/AppAssets';
import ProfileCustomize from './pages/ProfileCustomize';
import t from './lib/i18n';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    const stored = localStorage.getItem('admin_lang');
    if (stored === 'ar' || stored === 'en') setLang(stored);
    const unsub = onAuthChange(u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-slate-500 text-xs">Loading...</div>
      </div>
    );
  }

  const ctx = {
    lang,
    setLang: (l: Lang) => setLang(l),
    t: (key: string) => t(key, lang),
  };

  return (
    <I18nContext.Provider value={ctx}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route element={user ? <Layout /> : <Navigate to="/login" replace />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/store" element={<Store />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/unions" element={<Unions />} />
            <Route path="/vip" element={<VIP />} />
            <Route path="/vip-gifting" element={<VIPGifting />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/necklaces" element={<Necklaces />} />
            <Route path="/badge-necklace-gifts" element={<BadgeNecklaceGifts />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/cp" element={<CP />} />
            <Route path="/bd" element={<BD />} />
            <Route path="/app-assets" element={<AppAssets />} />
            <Route path="/image-customize" element={<ImageCustomize />} />
            <Route path="/color-customize" element={<ColorCustomize />} />
            <Route path="/error-analysis" element={<ErrorAnalysis />} />
            <Route path="/gift-items" element={<GiftItems />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile-customize" element={<ProfileCustomize />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nContext.Provider>
  );
}
