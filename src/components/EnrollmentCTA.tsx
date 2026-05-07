import { Link } from "react-router-dom";
import type { Track } from "@/types/track";

interface EnrollmentCTAProps {
    track: Track;
    isEnrolled: boolean;
    keynoteId?: string;
}

export function EnrollmentCTA({ track, isEnrolled, keynoteId }: EnrollmentCTAProps) {
    const isSoldOut = track.auditorium.reserved >= track.auditorium.capacity;

    const getTheme = () => {
        if (isEnrolled) {
            return {
                wrapper: "bg-white border-green-500",
                badge: "bg-green-100 text-green-700",
                title: "text-gray-900",
                desc: "text-gray-600",
            };
        }
        return {
            wrapper: "bg-cobalt-900 border-cobalt-800 text-white",
            badge: "bg-white/20 text-white backdrop-blur-md",
            title: "text-white",
            desc: "text-cobalt-200",
        };
    };

    const theme = getTheme();

    return (
        <div
            className={`relative overflow-hidden rounded-3xl p-8 mb-16 border-2 transition-all shadow-xl ${theme.wrapper}`}
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div
                        className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 transition-colors ${theme.badge}`}
                    >
                        {isEnrolled ? "Inscrição Concluída" : "Passo 1 • Obrigatório"}
                    </div>

                    <h2 className={`text-2xl font-bold mb-2 ${theme.title}`}>Garanta seu acesso à trilha</h2>

                    <p className={theme.desc}>
                        {isEnrolled
                            ? "Você já tem lugar reservado nos keynotes. Monte sua grade abaixo."
                            : "Para liberar a trilha, você precisa primeiro reservar sua cadeira no Keynote de abertura."}
                    </p>
                </div>

                <CTAAction isEnrolled={isEnrolled} isSoldOut={isSoldOut} trackId={track.id} keynoteId={keynoteId} />
            </div>
        </div>
    );
}

type CTAActionProps = {
    isEnrolled: boolean;
    isSoldOut: boolean;
    trackId: string;
    keynoteId?: string;
};

function CTAAction({ isEnrolled, isSoldOut, trackId, keynoteId }: CTAActionProps) {
    const baseClass =
        "shrink-0 flex items-center justify-center min-w-55 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center";

    if (isEnrolled) {
        return <span className={`${baseClass} bg-green-100 text-green-700 cursor-default`}>Acesso Garantido ✓</span>;
    }

    if (isSoldOut) {
        return <span className={`${baseClass} bg-gray-400 text-white cursor-not-allowed`}>Esgotado</span>;
    }

    if (!keynoteId) return null;

    return (
        <Link
            to={`/tracks/${trackId}/sessions/${keynoteId}`}
            className={`${baseClass} bg-white text-cobalt-900 shadow-lg hover:bg-gray-50 hover:-translate-y-1 hover:shadow-xl`}
        >
            Escolher Assento
        </Link>
    );
}
