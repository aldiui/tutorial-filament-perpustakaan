import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = () => {
    const [activeSection, setActiveSection] = useState("Pendahuluan");

    const menuItems = [
        { id: "Pendahuluan", label: "Pendahuluan", icon: "📖" },
        { id: "Install", label: "Install Laravel", icon: "💻" },
        { id: "User", label: "User", icon: "👤" },
        { id: "Kategori", label: "Kategori", icon: "📂" },
        { id: "Buku", label: "Buku", icon: "📚" },
        { id: "Peminjaman Buku", label: "Peminjaman Buku", icon: "📕" },
        { id: "Laporan", label: "Laporan", icon: "📊" },
    ];

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <Content activeSection={activeSection} />
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} menuItems={menuItems} />
        </div>
    );
};

export default App;
