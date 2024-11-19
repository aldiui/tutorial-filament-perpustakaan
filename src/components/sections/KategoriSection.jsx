import CodeSnippet from "../CodeSnippet";

const KategoriSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Pengaturan CRUD Kategori</h2>

                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Membuat Model Kategori</h3>
                    <p className="text-lg">Buat model kategori dan migrasi kategori menggunakan perintah berikut:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:model Kategori -m`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Perintah di atas akan membuat model <strong>Kategori</strong> dan file migrasi terkait.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Mengubah Migrasi Kategori</h3>
                    <p className="text-lg">
                        Buka file migrasi yang baru saja dibuat di database/migrations/ dan ubah struktur tabel kategori sebagai berikut:
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
            Schema::create('kategoris', function (Blueprint $table) {
                $table->id();
                $table->string('nama');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('kategoris');
        }
    };
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 3: Menjalankan Migrasi</h3>
                    <p className="text-lg">
                        Setelah mengubah migrasi, jalankan perintah berikut untuk membuat tabel <strong>kategoris</strong> di database:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan migrate`}</code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 4: Mengubah Model Kategori</h3>
                    <p className="text-lg">
                        Setelah migrasi selesai, ubah model Kategori pada folder app/Models dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use Illuminate\\Database\\Eloquent\\Model;

    class Kategori extends Model
    {
        protected $fillable = [
            'nama',
        ];
    }
                                `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 5: Buat CRUD Kategori</h3>
                    <p className="text-lg">Untuk membuat tampilan CRUD untuk kategori, jalankan perintah berikut di terminal:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:filament-resource Kategori --generate`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Setelah menjalankan perintah tersebut, buka file app/Filament/Resources/KategoriResource.php. Di dalam file ini, Anda akan menemukan tampilan CRUD untuk kategori. Sesuaikan kode di dalam file tersebut
                        sesuai dengan kode yang diberikan di bawah ini.
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Filament\\Resources;

    use App\\Filament\\Resources\\KategoriResource\\Pages;
    use App\\Models\\Kategori;
    use Filament\\Forms;
    use Filament\\Forms\\Form;
    use Filament\\Resources\\Resource;
    use Filament\\Tables;
    use Filament\\Tables\\Table;

    class KategoriResource extends Resource
    {
        protected static ?string $model = Kategori::class;

        protected static ?string $navigationIcon = 'heroicon-o-table-cells';

        protected static ?string $recordTitleAttribute = 'nama';

        protected static ?string $navigationLabel = 'Kategori';

        protected static ?string $navigationGroup = 'Data Master';

        protected static ?string $slug = 'kategori';

        protected static ?int $navigationSort = 2;

        public static function form(Form $form): Form
        {
            return $form
                ->schema([
                    Forms\\Components\\TextInput::make('nama')
                        ->unique(ignoreRecord: true)
                        ->required(),
                ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\\Columns\\TextColumn::make('nama')
                        ->searchable(),
                ])
                ->filters([
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
                'index' => Pages\\ListKategoris::route('/'),
            ];
        }
    }

                                `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Penutup</h3>
                    <p className="text-lg text-justify">
                        Dengan mengikuti langkah-langkah di atas, Anda telah berhasil mengkonfigurasi tampilan CRUD untuk kategori dalam aplikasi admin menggunakan Filament. Pastikan untuk menguji setiap fungsi untuk memastikan semuanya
                        berjalan dengan baik. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KategoriSection;
