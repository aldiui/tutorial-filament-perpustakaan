import CodeSnippet from "../CodeSnippet";

const PeminjamanSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Pengaturan CRUD Peminjaman</h2>

                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Membuat Model Peminjaman</h3>
                    <p className="text-lg">Buat model peminjaman dan migrasi peminjaman menggunakan perintah berikut:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:model Peminjaman -m`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Perintah di atas akan membuat model <strong>Peminjaman</strong> dan file migrasi terkait.
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Mengubah Migrasi Peminjaman</h3>
                    <p className="text-lg">
                        Buka file migrasi yang baru saja dibuat di <code>database/migrations/</code> dan ubah struktur tabel kategori sebagai berikut:
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
            Schema::create('peminjamen', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users');
                $table->foreignId('buku_id')->constrained('bukus');
                $table->string('kode_peminjaman');
                $table->string('nama_peminjam');
                $table->date('tanggal_pinjam');
                $table->date('tanggal_pengembalian')->nullable();
                $table->enum('status', ['Pending', 'Dipinjam', 'Dikembalikan', 'Terlambat'])->default('Pending');
                $table->text("catatan")->nullable();
                $table->integer('denda')->nullable();
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('peminjamen');
        }
    };
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 3: Menjalankan Migrasi</h3>
                    <p className="text-lg">
                        Setelah mengubah migrasi, jalankan perintah berikut untuk membuat tabel <strong>peminjamen</strong> di database:
                    </p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan migrate`}</code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 4: Mengubah Model Peminjaman</h3>
                    <p className="text-lg">
                        Setelah migrasi selesai, ubah model Peminjaman pada folder <code>app/Models</code> dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use App\\Models\\Buku;
    use App\\Models\\User;
    use Illuminate\\Database\\Eloquent\\Model;

    class Peminjaman extends Model
    {
        protected $fillable = [
            'user_id',
            'buku_id',
            'kode_peminjaman',
            'tanggal_pinjam',
            'tanggal_kembali',
            'status',
            'catatan',
            'denda',
        ];

        // relasi one to one dengan user
        public function admin()
        {
            return $this->belongsTo(User::class, 'user_id');
        }

        // relasi one to one dengan buku
        public function buku()
        {
            return $this->belongsTo(Buku::class);
        }
    }

                                `}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Langkah 5: Mengubah Model User</h3>
                    <p className="text-lg">
                        Ubah model User pada folder <code>app/Models</code> dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use App\\Models\\Peminjaman;
    use Filament\\Models\\Contracts\\FilamentUser;
    use Filament\\Panel;
    use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
    use Illuminate\\Foundation\\Auth\\User as Authenticatable;
    use Illuminate\\Notifications\\Notifiable;

    class User extends Authenticatable implements FilamentUser
    {
        use HasFactory, Notifiable;

        protected $fillable = [
            'name',
            'email',
            'password',
        ];

        protected $hidden = [
            'password',
            'remember_token',
        ];

        protected function casts(): array
        {
            return [
                'email_verified_at' => 'datetime',
                'password' => 'hashed',
            ];
        }

        // untuk mengatur hak akses panel filament
        public function canAccessPanel(Panel $panel): bool
        {
            return true;
        }

        // relasi one to many dengan peminjaman
        public function peminjaman()
        {
            return $this->hasMany(Peminjaman::class);
        }
    }
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Langkah 6: Mengubah Model Buku</h3>
                    <p className="text-lg">
                        Ubah model Buku pada folder <code>app/Models</code> dengan kode berikut:
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Models;

    use App\\Models\\Kategori;
    use App\\Models\\Peminjaman;
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

        public function kategori()
        {
            return $this->belongsTo(Kategori::class);
        }

        public function peminjaman()
        {
            return $this->hasMany(Peminjaman::class);
        }
    }
                                    `}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Langkah 7: Buat CRUD Peminjaman</h3>
                    <p className="text-lg">Untuk membuat tampilan CRUD untuk peminjaman, jalankan perintah berikut di terminal:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{`php artisan make:filament-resource Peminjaman --generate`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg mt-4">
                        Setelah menjalankan perintah tersebut, buka file <code>app/Filament/Resources/PeminjamanResource.php</code>. Di dalam file ini, Anda akan menemukan tampilan CRUD untuk kategori. Sesuaikan kode di dalam file tersebut
                        sesuai dengan kode yang diberikan di bawah ini.
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
   <?php

    namespace App\\Filament\\Resources;

    use App\\Filament\\Resources\\PeminjamanResource\\Pages;
    use App\\Models\\Peminjaman;
    use Filament\\Forms;
    use Filament\\Forms\\Form;
    use Filament\\Resources\\Resource;
    use Filament\\Tables;
    use Filament\\Tables\\Table;
    use Illuminate\\Support\\Str;

    class PeminjamanResource extends Resource
    {
        protected static ?string $model = Peminjaman::class;

        protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

        protected static ?string $recordTitleAttribute = 'nama_peminjaman';

        protected static ?string $navigationLabel = 'Peminjaman';

        protected static ?string $navigationGroup = 'Data Master';

        protected static ?string $slug = 'peminjaman';

        protected static ?int $navigationSort = 4;

        public static function form(Form $form): Form
        {
            return $form->schema([
                Forms\\Components\\Section::make('Data Peminjaman')
                    ->schema([
                        Forms\\Components\\Hidden::make('user_id')
                            ->default(auth()->user()->id),
                        Forms\\Components\\Select::make('buku_id')
                            ->label('Buku')
                            ->relationship('buku', 'judul')
                            ->required()
                            ->searchable(),
                        Forms\\Components\\TextInput::make('kode_peminjaman')
                            ->label('Kode Peminjaman')
                            ->default(fn() => 'PJM-' . strtoupper(Str::random(6)))
                            ->unique(ignoreRecord: true)
                            ->required()
                            ->readonly()
                            ->maxLength(255),
                        Forms\\Components\\TextInput::make('nama_peminjam')
                            ->label('Nama Peminjam')
                            ->required()
                            ->maxLength(255),
                        Forms\\Components\\DatePicker::make('tanggal_pinjam')
                            ->label('Tanggal Pinjam')
                            ->default(now())
                            ->required(),
                        Forms\\Components\\DatePicker::make('tanggal_pengembalian')
                            ->label('Tanggal Pengembalian')
                            ->reactive()
                            ->required(fn($get) => in_array($get('status'), ['Dikembalikan', 'Terlambat'])),
                        Forms\\Components\\Select::make('status')
                            ->options([
                                'Pending' => 'Pending',
                                'Dipinjam' => 'Dipinjam',
                                'Dikembalikan' => 'Dikembalikan',
                                'Terlambat' => 'Terlambat',
                            ])
                            ->reactive()
                            ->afterStateUpdated(function ($get, $set) {
                                $status = $get('status');

                                match ($status) {
                                    'Pending', 'Dipinjam' => $set('tanggal_pengembalian', null),
                                    default => $set('tanggal_pengembalian', date('Y-m-d')),
                                };

                                $set('denda', $status === 'Terlambat' ? $get('denda') : 0);
                            })
                            ->default('Pending')
                            ->required(),
                        Forms\\Components\\Textarea::make('catatan')
                            ->label('Catatan')
                            ->visible(fn($record) => $record !== null)
                            ->required(fn($get) => $get('status') === 'Terlambat'),
                        Forms\\Components\\TextInput::make('denda')
                            ->label('Denda')
                            ->numeric()
                            ->reactive()
                            ->afterStateUpdated(function ($get, $set) {
                                $set('denda', $get('status') === 'Terlambat' ? $get('denda') : 0);
                            })
                            ->prefix('Rp.')
                            ->required(fn($get) => $get('status') === 'Terlambat')
                            ->default(0),
                    ])->columns(2),
            ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\\Columns\\TextColumn::make('buku.judul')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('kode_peminjaman')
                        ->label('Kode Peminjaman')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('nama_peminjam')
                        ->label('Nama Peminjam')
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('tanggal_pinjam')
                        ->label('Tanggal Pinjam')
                        ->date()
                        ->sortable(),
                    Tables\\Columns\\TextColumn::make('tanggal_pengembalian')
                        ->label('Tanggal Pengembalian')
                        ->date()
                        ->sortable(),
                    Tables\\Columns\\BadgeColumn::make('status')
                        ->label('Status')
                        ->colors([
                            'info' => 'Pending',
                            'primary' => 'Dipinjam',
                            'success' => 'Dikembalikan',
                            'danger' => 'Terlambat',
                        ])
                        ->icon(function ($state) {
                            return match ($state) {
                                'Pending' => 'heroicon-o-clock',
                                'Dipinjam' => 'heroicon-o-bookmark',
                                'Dikembalikan' => 'heroicon-o-check-circle',
                                'Terlambat' => 'heroicon-o-exclamation-circle',
                                default => 'heroicon-o-question-mark',
                            };
                        }),
                    Tables\\Columns\\TextColumn::make('denda')
                        ->numeric()
                        ->sortable(),
                    Tables\\Columns\\TextColumn::make('admin.name')
                        ->searchable(),
                ])
                ->filters([
                    Tables\\Filters\\SelectFilter::make('status')
                        ->options([
                            'Pending' => 'Pending',
                            'Dipinjam' => 'Dipinjam',
                            'Dikembalikan' => 'Dikembalikan',
                            'Terlambat' => 'Terlambat',
                        ]),
                    Tables\\Filters\\SelectFilter::make('buku')
                        ->relationship('buku', 'judul'),
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
                'index' => Pages\\ListPeminjamen::route('/'),
                'create' => Pages\\CreatePeminjaman::route('/create'),
                'edit' => Pages\\EditPeminjaman::route('/{record}/edit'),
            ];
        }
    }

                                `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Penutup</h3>
                    <p className="text-lg text-justify">
                        Dengan mengikuti langkah-langkah di atas, Anda telah berhasil mengkonfigurasi tampilan CRUD untuk peminjaman dalam aplikasi admin menggunakan Filament. Pastikan untuk menguji setiap fungsi untuk memastikan semuanya
                        berjalan dengan baik. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PeminjamanSection;
