import CodeSnippet from "../CodeSnippet";

const LaporanSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Membuat Laporan Peminjaman Buku</h2>

                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Instalasi Package Excel Export</h3>
                    <p className="text-lg">
                        Untuk dokumentasi lengkap tentang package Excel Export Filament, silakan kunjungi{" "}
                        <a href="https://filamentphp.com/plugins/pxlrbt-excel" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Dokumentasi Resmi Filament Excel
                        </a>
                    </p>

                    <CodeSnippet language="bash">{` composer require pxlrbt/filament-excel`}</CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Konfigurasi Export di Resource</h3>
                    <p className="text-lg">
                        Buka file <code>app/Filament/Resources/PeminjamanResource.php</code> dan tambahkan kode berikut di bagian <code>bulkActions()</code>:
                    </p>

                    <CodeSnippet language="php">
                        {`
    // Import namespace di bagian atas file
    use pxlrbt\FilamentExcel\Actions\Tables\ExportBulkAction;

    // Di dalam method table()
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Kolom existing Anda
            ])
            ->bulkActions([
                // Bulk actions lainnya
                ExportBulkAction::make(), // Tambahkan ini
            ]);
    }`}
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Opsi Hosting Gratis untuk Proyek Laravel</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <h4 className="font-bold">1. Railway.app</h4>
                            <ul className="list-disc ml-5">
                                <li>Hosting gratis untuk project web</li>
                                <li>Dukungan langsung untuk container Docker</li>
                                <li>Integrasi GitHub mudah</li>
                                <li>Bonus: $5 kredit per bulan</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold">2. Koyeb.com</h4>
                            <ul className="list-disc ml-5">
                                <li>Hosting serverless gratis</li>
                                <li>Mendukung deployment Laravel</li>
                                <li>Integrasi GitHub otomatis</li>
                                <li>Batas bandwidth dan jam server gratis</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold">Tips Tambahan</h4>
                            <p>
                                Pastikan Anda mengonfigurasi environment variables dengan benar dan menggunakan <code>.env.example</code> untuk template konfigurasi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanSection;
