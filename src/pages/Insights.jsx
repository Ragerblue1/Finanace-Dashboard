import { useMemo } from "react";
import { transactionsInitial } from "../data/transactions";
import { useUser } from "../context/UserContext";
import { Sparkles, TrendingDown, AlertCircle } from "lucide-react";

function Insights() {
  const { currentUser } = useUser();
  const userData = useMemo(() => transactionsInitial.filter(i => i.userId === currentUser.id), [currentUser]);

  const totalExpense = userData.filter(i => i.type === "expense").reduce((sum, i) => sum + i.amount, 0);
  const totalIncome = userData.filter(i => i.type === "income").reduce((sum, i) => sum + i.amount, 0);
  const categoryMap = {};
  userData.forEach(item => { if (item.type === "expense") categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount; });
  const highestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
  const avgSpend = totalExpense / (userData.filter(i => i.type === "expense").length || 1);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-black tracking-tight text-left">Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group text-left">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
          <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Top Spend</p>
          <h2 className="text-xl font-bold">{highestCategory?.[0] || 'N/A'}</h2>
          <p className="text-2xl font-black text-indigo-400 mt-2">₹{(highestCategory?.[1] || 0).toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group text-left">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
           <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Average Expense</p>
           <h2 className="text-xl font-bold text-white">₹{avgSpend.toFixed(0).toLocaleString()}</h2>
           <p className="text-xs font-bold text-white/20 mt-1">Per transaction</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group md:col-span-2 lg:col-span-1 text-left">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
           <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Financial Health</p>
           <h2 className="text-xl font-bold">{totalIncome > totalExpense ? "Saving Mode 💎" : "Overspending ⚠️"}</h2>
           <p className={`text-xs font-bold mt-2 ${totalIncome > totalExpense ? 'text-emerald-400' : 'text-rose-400'}`}>Managing well</p>
        </div>
      </div>
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 text-left">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Sparkles size={18} className="text-indigo-400" /> Financial Observation</h3>
        <p className="text-white/60 leading-relaxed max-w-2xl text-sm">
          {totalExpense > totalIncome ? "Your current expenditure exceeds your income inflow. Review category limits." : "Excellent management. You are maintaining a healthy surplus."}
        </p>
      </div>
    </div>
  );
}

export default Insights;