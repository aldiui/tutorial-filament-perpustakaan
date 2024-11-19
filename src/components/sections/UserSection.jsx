import CodeSnippet from "../CodeSnippet";

const UserSection = () => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Panduan Pengaturan CRUD user</h2>
                    <h3 className="text-lg font-semibold mt-4">Langkah 1: Perbaiki URL Admin</h3>
                    <p className="text-lg">
                        Untuk mengubah URL admin menjadi URL utama, buka file
                        <code> app/Providers/Filament/AdminPanelProvider.php</code> dan ubah path-nya menjadi <code>"/"</code>.
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Providers\\Filament;

    use Filament\\Http\\Middleware\\Authenticate;
    use Filament\\Http\\Middleware\\DisableBladeIconComponents;
    use Filament\\Http\\Middleware\\DispatchServingFilamentEvent;
    use Filament\\Pages;
    use Filament\\Panel;
    use Filament\\PanelProvider;
    use Filament\\Support\\Colors\\Color;
    use Filament\\Widgets;
    use Illuminate\\Cookie\\Middleware\\AddQueuedCookiesToResponse;
    use Illuminate\\Cookie\\Middleware\\EncryptCookies;
    use Illuminate\\Foundation\\Http\\Middleware\\VerifyCsrfToken;
    use Illuminate\\Routing\\Middleware\\SubstituteBindings;
    use Illuminate\\Session\\Middleware\\AuthenticateSession;
    use Illuminate\\Session\\Middleware\\StartSession;
    use Illuminate\\View\\Middleware\\ShareErrorsFromSession;

    class AdminPanelProvider extends PanelProvider
    {
        public function panel(Panel $panel): Panel
        {
            return $panel
                ->default()
                ->id('admin')
                ->path('/')
                ->login()
                ->profile()
                ->colors([
                    'primary' => Color::Amber,
                ])
                ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\\\Filament\\\\Resources')
                ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\\\Filament\\\\Pages')
                ->pages([
                    Pages\\Dashboard::class,
                ])
                ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\\\Filament\\\\Widgets')
                ->widgets([
                    Widgets\\AccountWidget::class,
                    Widgets\\FilamentInfoWidget::class,
                ])
                ->middleware([
                    EncryptCookies::class,
                    AddQueuedCookiesToResponse::class,
                    StartSession::class,
                    AuthenticateSession::class,
                    ShareErrorsFromSession::class,
                    VerifyCsrfToken::class,
                    SubstituteBindings::class,
                    DisableBladeIconComponents::class,
                    DispatchServingFilamentEvent::class,
                ])
                ->authMiddleware([
                    Authenticate::class,
                ]);
        }
}
`}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Langkah 2: Ubah Rute Default</h3>
                    <p className="text-lg text-justify">
                        Selanjutnya, buka file <code>routes/web.php</code> dan beri komentar pada rute yang mengarah ke tampilan default. Hal ini dilakukan untuk memastikan bahwa aplikasi tidak mengarahkan ke tampilan `welcome`.
                    </p>
                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    use Illuminate\\Support\\Facades\\Route;

    // Route::get('/', function () {
    //     return view('welcome');
    // });
 `}
                            </code>
                        </pre>
                    </CodeSnippet>

                    <h3 className="text-lg font-semibold mt-4">Langkah 3: Buat CRUD user</h3>
                    <p className="text-lg text-justify">Untuk membuat tampilan CRUD untuk user, jalankan perintah berikut di terminal:</p>
                    <CodeSnippet language="bash">
                        <pre>
                            <code>{` php artisan make:filament-resource User --generate`}</code>
                        </pre>
                    </CodeSnippet>
                    <p className="text-lg text-justify mt-4">
                        Setelah menjalankan perintah tersebut, buka file <code>{` app/Filament/Resources/UserResource.php`}</code>. Di dalam file ini, Anda akan menemukan tampilan CRUD untuk user. Sesuaikan kode di dalam file tersebut
                        sesuai dengan kode yang diberikan di bawah ini.
                    </p>

                    <CodeSnippet language="php">
                        <pre>
                            <code>
                                {`
    <?php

    namespace App\\Filament\\Resources;

    use App\\Filament\\Resources\\UserResource\\Pages;
    use App\\Models\\User;
    use Filament\\Forms;
    use Filament\\Forms\\Form;
    use Filament\\Resources\\Resource;
    use Filament\\Tables;
    use Filament\\Tables\\Table;

    class UserResource extends Resource
    {
        protected static ?string $model = User::class;

        protected static ?string $navigationIcon = 'heroicon-o-users';

        protected static ?string $recordTitleAttribute = 'name';

        protected static ?string $navigationLabel = 'Users';

        protected static ?string $navigationGroup = 'Data Master';

        protected static ?string $slug = 'users';

        protected static ?int $navigationSort = 1;

        public static function form(Form $form): Form
        {
            return $form
                ->schema([
                    Forms\\Components\\TextInput::make('name')
                        ->label("Nama")
                        ->required(),
                    Forms\\Components\\TextInput::make('email')
                        ->email()
                        ->unique(ignoreRecord: true)
                        ->required(),
                    Forms\\Components\\TextInput::make('password')
                        ->password()
                        ->required(fn($record) => $record === null)
                        ->minLength(8)
                        ->maxLength(20)
                        ->revealable()
                        ->dehydrateStateUsing(function ($state, $record) {
                            if ($record === null) {
                                return bcrypt($state);
                            } else {
                                return $state ? bcrypt($state) : $record->password;
                            }
                        }),
                ]);
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    Tables\\Columns\\TextColumn::make('name')
                        ->label("Nama")
                        ->searchable(),
                    Tables\\Columns\\TextColumn::make('email')
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
                'index' => Pages\\ListUsers::route('/'),
            ];
        }
    }
 `}
                            </code>
                        </pre>
                    </CodeSnippet>
                    <h3 className="text-lg font-semibold mt-4">Penutup</h3>
                    <p className="text-lg text-justify">
                        Dengan mengikuti langkah-langkah di atas, Anda telah berhasil mengkonfigurasi tampilan CRUD untuk user dalam aplikasi admin menggunakan Filament. Pastikan untuk menguji setiap fungsi untuk memastikan semuanya
                        berjalan dengan baik. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSection;
