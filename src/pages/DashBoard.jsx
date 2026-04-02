import { useMemo } from "react";
import { transactionsInitial } from "../data/transactions";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Wallet,BarChart3 } from "lucide-react";

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">
          {payload[0].name}
        </p>
        <p className="text-lg font-bold text-white">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const { currentUser } = useUser();
  const userData = useMemo(() => transactionsInitial.filter(item => item.userId === currentUser.id), [currentUser]);

  const { income, expense, balance } = useMemo(() => {
    let inc = 0, exp = 0;
    userData.forEach((item) => {
      if (item.type === "income") inc += item.amount;
      else exp += item.amount;
    });
    return { income: inc, expense: exp, balance: inc - exp };
  }, [userData]);

  const expenseData = useMemo(() => userData.filter(i => i.type === "expense").sort((a,b) => new Date(a.date) - new Date(b.date)), [userData]);
  
  const categoryData = useMemo(() => {
    const map = userData.reduce((acc, item) => {
      if (item.type === "expense") {
        if (!acc[item.category]) acc[item.category] = { name: item.category, value: 0 };
        acc[item.category].value += item.amount;
      }
      return acc;
    }, {});
    return Object.values(map);
  }, [userData]);

  const COLORS = ["#818cf8", "#34d399", "#f472b6", "#fbbf24", "#60a5fa"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 border border-emerald-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-widest">Income</p>
              <h2 className="text-3xl font-black mt-2 text-emerald-400">₹{income.toLocaleString()}</h2>
            </div>
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-[2rem] bg-gradient-to-br from-rose-500/20 to-rose-900/10 border border-rose-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-400/60 text-[10px] font-black uppercase tracking-widest">Expenses</p>
              <h2 className="text-3xl font-black mt-2 text-rose-400">₹{expense.toLocaleString()}</h2>
            </div>
            <TrendingDown className="text-rose-400" size={20} />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-indigo-900/10 border border-indigo-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-400/60 text-[10px] font-black uppercase tracking-widest">Balance</p>
              <h2 className="text-3xl font-black mt-2 text-indigo-400">₹{balance.toLocaleString()}</h2>
            </div>
            <Wallet className="text-indigo-400" size={20} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trend Line Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
          <h3 className="mb-6 font-bold text-white/90">Monthly Expense Trend</h3>
          <div className="h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={expenseData}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/><stop offset="95%" stopColor="#818cf8" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.1)" fontSize={10} tickFormatter={(d) => d.split('-')[2]} />
                <YAxis stroke="rgba(255,255,255,0.1)" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="amount" stroke="#818cf8" strokeWidth={3} fill="url(#g)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Breakdown Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
          <h3 className="mb-6 font-bold text-white/90 flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-400" />
            Spending Breakdown
          </h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  nameKey="name"
                  innerRadius={65} 
                  outerRadius={90} 
                  paddingAngle={5} 
                  stroke="none"
                >
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                {/* The Tooltip here is what handles the "show what it is about on hover" */}
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3 text-left">
            {categoryData.slice(0, 4).map((item, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                   <span className="text-white/40">{item.name}</span>
                </div>
                <span className="font-bold">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;