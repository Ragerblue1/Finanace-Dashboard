import { useState } from "react";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CreditCard, History as HistoryIcon, BarChart3, Menu, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { users } from "../data/users";

function Layout({ children, activeTab, setActiveTab }) {
  const { currentUser, setCurrentUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { id: "Dashboard", icon: LayoutDashboard },
    { id: "Transactions", icon: CreditCard },
    { id: "History", icon: HistoryIcon },
    { id: "Insights", icon: BarChart3 },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0c16] text-slate-100 font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-600/15 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 flex h-full p-4 gap-4">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" />
          )}
        </AnimatePresence>

        <motion.aside animate={{ width: collapsed ? 80 : 260, x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
          className="fixed md:relative z-50 h-[calc(100vh-2rem)] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col shadow-2xl transition-all duration-500 overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg">💰</div>
              {!collapsed && <span className="font-black text-xl tracking-tighter uppercase">Vault</span>}
            </div>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-1 hover:bg-white/10 rounded-lg">{collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-8">
            {menu.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={20} />
                {!collapsed && <span className="font-bold text-sm tracking-tight">{item.id}</span>}
              </button>
            ))}
          </nav>
          <div className="p-4">
            {!collapsed && (
              <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Active User</p>
                 <p className="font-bold text-sm truncate mt-1">{currentUser.name}</p>
              </div>
            )}
          </div>
        </motion.aside>

        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <header className="h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] px-6 flex items-center justify-between shadow-xl">
             <div className="flex items-center gap-4 text-left">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-white/10 rounded-lg"><Menu size={20} /></button>
                <div>
                   <h2 className="text-lg font-bold">Welcome, {currentUser.name} ✨</h2>
                   <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Global Access</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <select value={currentUser.id} onChange={(e) => setCurrentUser(users.find(u => u.id === Number(e.target.value)))}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold outline-none text-white appearance-none cursor-pointer">
                  {users.map(u => <option key={u.id} value={u.id} className="bg-slate-900">{u.name}</option>)}
                </select>
                <div className="p-2 bg-white/5 rounded-full border border-white/10"><Bell size={18} className="text-white/40" /></div>
             </div>
          </header>
          <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default Layout;