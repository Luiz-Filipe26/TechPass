import { Link } from "react-router-dom";
import type { Track } from "@/types/track";

interface EnrollmentCTAProps {
    track: Track;
    isEnrolled: boolean;
    keynoteId?: string;
}

export function EnrollmentCTA({ track, isEnrolled, keynoteId }: EnrollmentCTAProps) {
    const isSoldOut = track.auditorium.reserved >= track.auditorium.capacity;

    return (
        <div
            className={`relative overflow-hidden rounded-3xl p-8 mb-16 border-2 transition-all shadow-xl ${isEnrolled ? "bg-white border-green-500" : "bg-cobalt-900 border-cobalt-800 text-white"
                }`}
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div
                        className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 transition-colors ${isEnrolled ? "bg-green-100 text-green-700" : "bg-white/20 text-white backdrop-blur-md"
                            }`}
                    >
                        {isEnrolled ? "Inscrição Concluída" : "Passo 1 • Obrigatório"}
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isEnrolled ? "text-gray-900" : "text-white"}`}>
                        Garanta seu acesso à trilha
                    </h2>
                    <p className={isEnrolled ? "text-gray-600" : "text-cobalt-200"}>
                        {isEnrolled
                            ? "Você já tem lugar reservado nos keynotes. Monte sua grade abaixo."
                            : "Para liberar a trilha, você precisa primeiro reservar sua cadeira no Keynote de abertura."}
                    </p>
                </div>

                {/* O botão virou um Link para o Keynote */}
                <Link
                    to={isEnrolled || isSoldOut || !keynoteId ? "#" : `/tracks/${track.id}/sessions/${keynoteId}`}
                    className={`shrink-0 flex items-center justify-center min-w-55 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${isEnrolled
                            ? "bg-green-100 text-green-700 cursor-default shadow-none pointer-events-none"
                            : isSoldOut
                                ? "bg-gray-400 text-white cursor-not-allowed pointer-events-none"
                                : "bg-white text-cobalt-900 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-xl"
                        }`}
                >
                    {isEnrolled ? "Acesso Garantido ✓" : isSoldOut ? "Esgotado" : "Escolher Assento"}
                </Link>
            </div>
        </div>
    );
}
