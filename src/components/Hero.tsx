export function Hero() {
    return (
        <section className="relative bg-cobalt-900 text-white overflow-hidden py-10 lg:py-12">
            <HeroBackgroundEffect />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <HeroContent />
                    <HeroVisuals />
                </div>
            </div>
        </section>
    );
}

function HeroContent() {
    return (
        <div className="flex-1 text-center lg:text-left">
            <EventBadge text="São Paulo • 12 a 14 Maio 2026" />

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">
                Urban Innovation{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-cobalt-100 to-blue-400">
                    Summit
                </span>
            </h1>

            <p className="text-lg lg:text-xl text-cobalt-100/90 mb-10 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A convergência definitiva entre tecnologia, inovação urbana e o futuro da sociedade.
            </p>

            <div className="flex justify-center lg:justify-start">
                <a
                    href="#tracks"
                    className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full bg-white text-cobalt-900 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                    Explorar Trilhas
                </a>
            </div>
        </div>
    );
}

function HeroVisuals() {
    return (
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-cobalt-300 rounded-3xl transform rotate-3 scale-105 opacity-40 blur-lg transition-transform duration-700 hover:rotate-6" />

            <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80"
                alt="Palestrante em um palco iluminado com grande público"
                className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl border border-white/10"
            />

            <SocialProofCard />
        </div>
    );
}

function HeroBackgroundEffect() {
    return (
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    );
}

function EventBadge({ text }: { text: string }) {
    return (
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-blue-200">
            {text}
        </div>
    );
}

function SocialProofCard() {
    const avatars = ["1", "2", "4"];

    return (
        <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex -space-x-3">
                {avatars.map((id) => (
                    <img
                        key={id}
                        className="w-10 h-10 rounded-full border-2 border-white relative z-10 hover:z-20 transition-transform hover:scale-110"
                        src={`https://i.pravatar.cc/100?img=${id}`}
                        alt="Foto de participante"
                    />
                ))}
            </div>
            <div className="text-left">
                <p className="text-sm font-bold text-gray-900">5.000+ Inscritos</p>
                <p className="text-xs text-gray-500">Garanta seu lugar</p>
            </div>
        </div>
    );
}
