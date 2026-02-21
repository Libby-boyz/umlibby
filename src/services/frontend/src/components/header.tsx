export default function Header({locname}: {locname?: string}) {
    return (
        <header className="py-8 px-4 text-center bg-navy">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-white md:text-5xl font-bold tracking-tight text-slate-900">
                    Study Space Seeker
                </h1>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-gray-200">
                    {locname}
                </p>
            </div>
        </header>
    );
}