export default function Header({locname}: {locname?: string}) {
    return (
        <header className="py-8 px-4 flex text-center justify-center items-center bg-navy">
            <div className="max-w-3xl mx-auto justify-center">
                <img src="../../logo.svg" className="h-[70px]"/>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-gray-200">
                    {locname}
                </p>
            </div>
        </header>
    );
}