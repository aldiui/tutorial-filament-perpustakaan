import CodeSnippet from "../CodeSnippet";

const InstallSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Instalasi Laravel dan Filament</h2>

                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Instalasi Laravel</h3>
                    <p className="text-lg">Pastikan Anda telah menginstal PHP 8.3 ke atas, Composer, Node.js, dan NPM di sistem Anda. Jalankan perintah berikut untuk menginstal Laravel:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`composer create-project --prefer-dist laravel/laravel filament-perpustakaan`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Perintah di atas akan membuat folder proyek baru bernama <strong>filament-perpustakaan</strong> dan menginstal Laravel beserta semua dependensinya.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Pengaturan Database</h3>
                    <p className="text-lg">Sebelum menginstal Filament, Anda perlu mengonfigurasi database yang akan digunakan oleh aplikasi Laravel. Ikuti langkah-langkah berikut:</p>
                    <p className="text-lg">
                        Buka file <code>.env</code> yang terletak di direktori root proyek Anda, dan ubah pengaturan database seperti berikut:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_filament_perpustakaan
    DB_USERNAME=root
    DB_PASSWORD=
    `}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Pastikan Anda sudah memiliki MySQL atau Phpmyadmin yang berjalan di sistem Anda dan database <strong>db_filament_perpustakaan</strong> sudah ada. Jika belum, Anda bisa membuatnya dengan perintah berikut di MySQL:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`CREATE DATABASE db_filament_perpustakaan;`}</code>
                        </pre>
                    </CodeSnippet>

                    <p className="text-lg mt-4">Setelah pengaturan database selesai, jalankan perintah migrasi untuk membuat tabel-tabel yang diperlukan oleh Laravel:</p>
                    <CodeSnippet>
                        <pre>
                            <code>{`php artisan migrate`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">Sekarang database Anda siap digunakan dengan Laravel!</p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 3: Instalasi Filament Panel Builder</h3>
                    <p className="text-lg">
                        Setelah Laravel terinstal, masuk ke direktori proyek <strong>filament-perpustakaan</strong> dan jalankan perintah berikut untuk menginstal Filament:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`composer require filament/filament`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">Setelah itu, jalankan perintah berikut untuk menginstal panel:</p>
                    <CodeSnippet>
                        <pre>
                            <code>{`php artisan filament:install --panels`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Ini akan membuat dan mendaftarkan provider baru di <code>app/Providers/Filament/AdminPanelProvider.php</code>. Pastikan provider ini telah terdaftar dengan benar.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 4: Membuat Akun Pengguna</h3>
                    <p className="text-lg">Untuk membuat akun pengguna Filament dengan memasukkan data Name, Email, dan Password, jalankan perintah berikut:</p>
                    <CodeSnippet>
                        <pre>
                            <code>{`php artisan make:filament-user`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Setelah akun dibuat, buka <code>/admin</code> di browser Anda, login, dan mulai membangun aplikasi Anda.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 5: Optimasi untuk Produksi</h3>
                    <p className="text-lg">Untuk mengoptimalkan Filament di lingkungan produksi, jalankan perintah berikut:</p>
                    <CodeSnippet>
                        <pre>
                            <code>{`php artisan filament:optimize`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">Perintah ini akan meningkatkan performa panel dengan mencache komponen Filament dan ikon Blade.</p>
                </div>
            </div>
        </div>
    );
};

export default InstallSection;
