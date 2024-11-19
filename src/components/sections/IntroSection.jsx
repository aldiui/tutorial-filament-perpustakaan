const IntroSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Selamat Datang di Tutorial Membuat Aplikasi Web Perpustakaan dengan Filament</h2>
                    <p className="text-lg text-justify">
                        Pada tutorial ini, Anda akan mempelajari cara membuat aplikasi web sederhana untuk sistem perpustakaan menggunakan <strong>Filament</strong>. Filament adalah framework modern berbasis PHP yang dirancang untuk
                        mempermudah pengembangan aplikasi, terutama dalam membangun panel admin dengan antarmuka yang elegan dan mudah digunakan. Dengan Filament, Anda dapat membuat aplikasi dengan cepat, memanfaatkan antarmuka pengguna
                        (UI) yang sederhana namun powerful.
                    </p>
                    <p className="text-lg text-justify">
                        Tutorial ini merupakan bagian dari mata kuliah <strong>Web Programming 2</strong>, yang bertujuan untuk memperkenalkan Anda pada pengembangan aplikasi web dengan menggunakan teknologi terbaru dan framework yang
                        efisien.
                    </p>
                    <p className="text-lg text-justify">
                        <strong>Filament</strong> memiliki berbagai fitur yang memudahkan pengelolaan data dan pengguna dalam aplikasi web, seperti sistem manajemen database yang terintegrasi, pembuatan formulir, serta pengaturan akses
                        pengguna dengan mudah. Anda akan belajar cara menggunakan berbagai komponen yang disediakan oleh Filament, seperti resource, page, dan widget.
                    </p>
                    <p className="text-lg text-justify">
                        Untuk mempelajari lebih lanjut tentang Filament, Anda bisa mengunjungi{" "}
                        <a href="https://filamentphp.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            situs resmi Filament
                        </a>
                        , yang menyediakan dokumentasi lengkap dan tutorial untuk memulai pengembangan aplikasi dengan Filament.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
