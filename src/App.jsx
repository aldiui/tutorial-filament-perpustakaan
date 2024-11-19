import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = () => {
    const menuItems = [
        { id: "/", label: "Pendahuluan", icon: "📖" },
        { id: "/install", label: "Install Laravel", icon: "💻" },
        { id: "/user", label: "User", icon: "👤" },
        { id: "/kategori", label: "Kategori", icon: "📂" },
        { id: "/buku", label: "Buku", icon: "📚" },
        { id: "/peminjaman", label: "Peminjaman Buku", icon: "📕" },
        { id: "/laporan", label: "Laporan", icon: "📊" },
    ];

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <Content menuItems={menuItems} />
            <Sidebar menuItems={menuItems} />
        </div>
    );
};

export default App;
