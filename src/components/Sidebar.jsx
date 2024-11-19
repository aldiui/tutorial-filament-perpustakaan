import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const Sidebar = ({ menuItems }) => {
    const location = useLocation();
    const activeSection = location.pathname;

    return (
        <div className="drawer-side">
            <label htmlFor="drawer" className="drawer-overlay"></label>
            <aside className="bg-base-200 w-80 min-h-screen border-r border-base-300">
                <div className="hidden lg:block p-4 text-xl font-bold">Filament Perpustakaan</div>
                <ul className="menu p-4 text-base-content">
                    {menuItems.map((item) => (
                        <MenuItem key={item.id} item={item} activeSection={activeSection} />
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
