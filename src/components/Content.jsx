import { Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";
import IntroSection from "./sections/IntroSection";
import InstallSection from "./sections/InstallSection";
import UserSection from "./sections/UserSection";
import KategoriSection from "./sections/KategoriSection";
import BukuSection from "./sections/BukuSection";
import PeminjamanSection from "./sections/PeminjamanSection";
import LaporanSection from "./sections/LaporanSection";

const Content = ({ menuItems }) => {
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
                    <Routes>
                        <Route path="/" element={<IntroSection />} />
                        <Route path="/install" element={<InstallSection />} />
                        <Route path="/user" element={<UserSection />} />
                        <Route path="/kategori" element={<KategoriSection />} />
                        <Route path="/buku" element={<BukuSection />} />
                        <Route path="/peminjaman" element={<PeminjamanSection />} />
                        <Route path="/laporan" element={<LaporanSection />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Content;
