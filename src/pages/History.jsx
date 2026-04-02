import { useMemo, useState } from "react";
import { useUser } from "../context/UserContext";
import { transactionsInitial } from "../data/transactions";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Check, TrendingUp, TrendingDown, X } from "lucide-react";

function History() {
  const { currentUser, isAdmin } = useUser();
  const [data, setData] = useState(transactionsInitial);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const userHistory = useMemo(() => {
    return data.filter((item) => item.userId === currentUser.id);
  }, [data, currentUser]);

  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.amount);
  };

  const handleSave = (id) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, amount: Number(editValue) } : item
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2 sm:px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {currentUser.name}'s History
        </h1>
        {isAdmin && (
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
            Admin Privileges Active
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {userHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="
                p-4 rounded-[1.5rem] shadow-md
                bg-white dark:bg-[#1a1c2e] border border-gray-200 dark:border-white/5
                flex flex-col sm:flex-row sm:justify-between sm:items-center
                gap-4 group transition-all
              "
            >
              {/* LEFT SECTION: Icon and Info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {item.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800 dark:text-white">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* RIGHT SECTION: Amount and Admin Actions */}
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-24 px-3 py-1 rounded-xl border bg-gray-100 dark:bg-white/10 dark:border-white/10 dark:text-white outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleSave(item.id)}
                        className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="font-black text-lg text-gray-800 dark:text-white">
                      ₹{item.amount.toLocaleString()}
                    </p>
                  )}
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.type}
                  </p>
                </div>

                {/* 🔥 FIXED ADMIN ACTIONS: Visible on mobile, hidden-on-hover on desktop */}
                {isAdmin && editingId !== item.id && (
                  <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-blue-500/10 text-blue-500 dark:text-indigo-400 dark:bg-indigo-500/20 rounded-xl hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 text-red-500 dark:bg-rose-500/20 dark:text-rose-400 rounded-xl hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default History;