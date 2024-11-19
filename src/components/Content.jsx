import IntroSection from "./sections/IntroSection";
import InstallSection from "./sections/InstallSection";
import { Menu } from "lucide-react";
import UserSection from "./sections/UserSection";
import KategoriSection from "./sections/KategoriSection";
import BukuSection from "./sections/BukuSection";
import LaporanSection from "./sections/LaporanSection";
import PeminjamanSection from "./sections/PeminjamanSection";

const Content = ({ activeSection }) => {
    return (
        <div className="drawer-content flex flex-col">
            <div className="w-full navbar bg-base-300 lg:hidden">
                <label htmlFor="drawer" className="btn btn-square btn-ghost">
                    <Menu className="w-6 h-6" />
                </label>
                <div className="flex-1 px-2 mx-2 text-xl font-bold">Filament Perpustakaan</div>
            </div>

            <main className="flex-1 overflow-y-auto bg-base-200 p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                    {activeSection === "Pendahuluan" && <IntroSection />}
                    {activeSection === "Install" && <InstallSection />}
                    {activeSection === "User" && <UserSection />}
                    {activeSection === "Kategori" && <KategoriSection />}
                    {activeSection === "Buku" && <BukuSection />}
                    {activeSection === "Peminjaman" && <PeminjamanSection />}
                    {activeSection === "Laporan" && <LaporanSection />}
                </div>
            </main>
        </div>
    );
};

export default Content;
