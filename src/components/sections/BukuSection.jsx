import CodeSnippet from "../CodeSnippet";

const BukuSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Pengaturan CRUD Buku</h2>

                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Membuat Model Buku</h3>
                    <p className="text-lg">Buat model buku dan migrasi Buku menggunakan perintah berikut:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:model Buku -m`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Perintah di atas akan membuat model <strong>Buku</strong> dan file migrasi terkait.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Mengubah Migrasi Buku</h3>
                    <p className="text-lg">
                        Buka file migrasi yang baru saja dibuat di <code>database/migrations/</code> dan ubah struktur tabel Buku sebagai berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    use Illuminate\\Database\\Migrations\\Migration;
    use Illuminate\\Database\\Schema\\Blueprint;
    use Illuminate\\Support\\Facades\\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('bukus', function (Blueprint $table) {
                $table->id();
                $table->foreignId('kategori_id')->constrained('kategoris'); // Relasi dengan tabel kategoris
                $table->string('judul');
                $table->string('isbn');
                $table->text('deskripsi');
                $table->string('pengarang');
                $table->string('penerbit');
                $table->string('tahun_terbit');
                $table->string('sampul');
                $table->integer('stok');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('bukus');
        }
    };
                                `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 3: Menjalankan Migrasi</h3>
                    <p className="text-lg">
                        Setelah mengubah migrasi, jalankan perintah berikut untuk membuat tabel <strong>bukus</strong> di database:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan migrate`}</code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 4: Mengubah Model Buku</h3>
                    <p className="text-lg">
                        Setelah migrasi selesai, ubah model Buku pada folder <code>app/Models</code> dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use App\\Models\\Kategori;
    use Illuminate\\Database\\Eloquent\\Model;

    class Buku extends Model
    {
        protected $fillable = [
            'kategori_id',
            'judul',
            'isbn',
            'deskripsi',
            'pengarang',
            'penerbit',
            'tahun_terbit',
            'sampul',
            'stok',
        ];

        // relasi one to one dengan kategori
        public function kategori()
        {
            return $this->belongsTo(Kategori::class);
        }
    }
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 5: Mengubah Model Kategori</h3>
                    <p className="text-lg">
                        Ubah model Kategori pada folder <code>app/Models</code> dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use App\\Models\\Buku;
    use Illuminate\\Database\\Eloquent\\Model;

    class Kategori extends Model
    {
        protected $fillable = [
            'nama',
        ];

        // relasi one to many dengan buku 
        public function buku()
        {
            return $this->hasMany(Buku::class); 
        }
    }
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 6: Buat CRUD Buku</h3>
                    <p className="text-lg">Untuk membuat tampilan CRUD untuk buku, jalankan perintah berikut di terminal:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:filament-resource Buku --generate`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Setelah menjalankan perintah tersebut, buka file <code>app/Filament/Resources/BukuResource.php</code>. Di dalam file ini, Anda akan menemukan tampilan CRUD untuk buku. Sesuaikan kode di dalam file tersebut sesuai
                        dengan kebutuhan Anda.
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Filament\\Resources;

    use App\\Filament\\Resources\\BukuResource\\Pages;
    use App\\Models\\Buku;
    use Filament\\Forms;
    use Filament\\Forms\\Form;
    use Filament\\Resources\\Resource;
    use Filament\\Tables;
    use Filament\\Tables\\Table;

    class BukuResource extends Resource
    {
        protected static ?string $model = Buku::class;

        protected static ?string $navigationIcon = 'heroicon-o-book-open';

        protected static ?string $recordTitleAttribute = 'judul';

        protected static ?string $navigationLabel = 'Buku';

        protected static ?string $navigationGroup = 'Data Master';

        protected static ?string $slug = 'buku';

        protected static ?int $navigationSort = 3;

        public static function form(Form $form): Form
        {
            return $form
                ->schema([
                    Forms\\Components\\Section::make('Data Buku')
                        ->schema([
                            Forms\\Components\\Select::make('kategori_id')
                                ->label('Kategori')
                                ->relationship('kategori', 'nama')
                                ->required()
                                ->searchable(),
                            Forms\\Components\\TextInput::make('judul')
                                ->required()
                                ->maxLength(255),
                            Forms\\Components\\TextInput::make('isbn')
                                ->unique(ignoreRecord: true)
                                ->required()
                                ->maxLength(255),
                            Forms\\Components\\Textarea::make('deskripsi')
                                ->required(),
                            Forms\\Components\\TextInput::make('pengarang')
                                ->required()
                                ->maxLength(255),
                            Forms\\Components\\TextInput::make('penerbit')
                                ->required()
                                ->maxLength(255),
                            Forms\\Components\\TextInput::make('tahun_terbit')
                                ->label('Tahun Terbit')
                                ->required()
                                ->minLength(4)
                                ->maxLength(4),
                            Forms\\Components\\FileUpload::make('sampul')
                                ->image()
                                ->visibility('public')
                                ->maxSize(10240)
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg'])
                                ->enableOpen()
                                ->required(fn($record) => $record === null)
                                ->imageEditor()
                                ->enableDownload(),
                            Forms\\Components\\TextInput::make('stok')
                                ->required()
                                ->numeric(),
                        ])->columns(2),
                ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\\Columns\\ImageColumn::make('sampul'),
                    Tables\\Columns\\TextColumn::make('kategori.nama')
                        ->sortable(),
                    Tables\\Columns\\TextColumn::make('judul')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('isbn')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('pengarang')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('penerbit')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('tahun_terbit')
                        ->label("Tahun Terbit")
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('stok')
                        ->numeric()
                        ->sortable(),
                ])
                ->filters([
                    Tables\\Filters\\SelectFilter::make('kategori')
                        ->relationship('kategori', 'nama'),
                ])
                ->actions([
                    Tables\\Actions\\EditAction::make(),
                    Tables\\Actions\\DeleteAction::make(),
                ])
                ->bulkActions([
                    Tables\\Actions\\BulkActionGroup::make([
                        Tables\\Actions\\DeleteBulkAction::make(),
                    ]),
                ])
                ->paginated([25, 50, 100, 'all']);
        }

        public static function getRelations(): array
        {
            return [
                //
            ];
        }

        public static function getPages(): array
        {
            return [
                'index' => Pages\\ListBukus::route('/'),
                'create' => Page\\CreateBuku::route('/create'),
                'edit' => Pages\\EditBuku::route('/{record}/edit'),
            ];
        }
    }

                                `}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Langkah 7: Menampilkan Gambar pada Sampul</h3>
                    <p className="text-lg">Untuk menampilkan gambar pada kolom sampul, Anda perlu membuat tautan simbolis ke folder penyimpanan. Jalankan perintah berikut di terminal:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan storage:link`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg">
                        Selanjutnya, buka file <code>.env</code> yang terletak di direktori root proyek Anda, dan pastikan untuk mengatur URL aplikasi sesuai dengan port yang digunakan. Contohnya:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`APP_URL=http://localhost:8000`}</code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Penutup</h3>
                    <p className="text-lg text-justify">
                        Dengan mengikuti langkah-langkah di atas, Anda telah berhasil mengkonfigurasi tampilan CRUD untuk buku dalam aplikasi admin menggunakan Filament. Pastikan untuk menguji setiap fungsi untuk memastikan semuanya
                        berjalan dengan baik. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BukuSection;
