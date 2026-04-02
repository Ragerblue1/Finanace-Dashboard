import { useMemo, useState } from "react";
import { transactionsInitial } from "../data/transactions";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

function Transactions() {
  const { currentUser } = useUser();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const userData = useMemo(() => transactionsInitial.filter(item => item.userId === currentUser.id), [currentUser]);

  const filteredData = useMemo(() => {
    let data = [...userData];
    if (search) data = data.filter(i => i.category.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "all") data = data.filter(i => i.type === typeFilter);
    return data.sort((a,b) => new Date(b.date) - new Date(a.date));
  }, [search, typeFilter, userData]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight">Transactions</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500/50 text-sm"
            />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none text-white">
            <option value="all" className="bg-slate-900">All Types</option>
            <option value="income" className="bg-slate-900">Income</option>
            <option value="expense" className="bg-slate-900">Expense</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {filteredData.map((item) => (
          <motion.div key={item.id} whileHover={{ x: 5 }} className="flex justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {item.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              </div>
              <div><p className="font-bold text-sm text-left">{item.category}</p><p className="text-[10px] text-white/30 uppercase font-black text-left">{item.date}</p></div>
            </div>
            <div className="text-right">
              <p className={`font-black text-lg ${item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>₹{item.amount.toLocaleString()}</p>
              <p className="text-[10px] text-white/30 uppercase font-black">{item.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default Transactions;