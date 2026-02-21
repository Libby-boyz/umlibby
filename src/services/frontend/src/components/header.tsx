export default function Header({locname}: {locname?: string}) {
    return (
        <header className="py-12 px-6 text-center bg-blue-200">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Study Space Seeker
                </h1>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-blue-600">
                    {locname}
                </p>
            </div>
        </header>
    );
}