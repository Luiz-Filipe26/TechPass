import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

export function GlobalError() {
    const error = useRouteError();
    let errorMessage = "Ocorreu um erro inesperado. Nossa equipe técnica já foi notificada.";

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-8 animate-in zoom-in duration-300">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                </div>

                <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Ops! Algo deu errado</h1>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed">{errorMessage}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Tentar Novamente
                    </button>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-cobalt-600 text-white font-bold rounded-xl hover:bg-cobalt-700 transition-all shadow-lg shadow-cobalt-100"
                    >
                        <Home className="w-4 h-4" /> Voltar ao Início
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
                        TechPass • Urban Innovation 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
