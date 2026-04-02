import { useState } from "react";
import Layout from "./components/Layout";
import {users} from "./data/users";
import Dashboard from "./pages/DashBoard";
import Transactions from "./pages/Transactions";
import History from "./pages/History";
import Insights from "./pages/Insights";
import {UserContext} from "./context/UserContext";
import { ThemeContext } from "./context/ThemeContext";
export default function App() {
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const isAdmin = currentUser?.role === "admin";

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isAdmin }}>
      <ThemeContext.Provider value={{ dark: true, setDark: () => {} }}>
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Transactions" && <Transactions />}
          {activeTab === "History" && <History />}
          {activeTab === "Insights" && <Insights />}
        </Layout>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}