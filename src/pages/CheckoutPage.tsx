import { useState, useEffect, type SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, ShieldCheck, Ticket as TicketIcon, Loader2 } from "lucide-react";
import { useTickets } from "@/contexts/TicketContext";
import { InputField } from "@/components/InputField";

export function CheckoutPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addTicket } = useTickets();
    const [isProcessing, setIsProcessing] = useState(false);

    // Redireciona se tentar acessar o checkout sem dados da sessão
    useEffect(() => {
        if (!state) navigate("/", { replace: true });
    }, [state, navigate]);

    if (!state) return null;

    const { trackId, trackTitle, sessionId, sessionTitle, seatId, category, eventDate } = state;

    // Lógica de preços baseada na categoria
    const prices = {
        vip: 499.0,
        standard: 299.0,
        general: 0.0,
    };
    const price = prices[category as keyof typeof prices];

    const isFree = price === 0;

    const [form, setForm] = useState({ card: "", name: "", expiry: "", cvv: "" });

    // Se for de graça, o formulário já é válido por padrão
    const isFormValid = isFree ? true : form.card && form.name && form.expiry && form.cvv;

    const handlePayment = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simula processamento de 1.2s
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const newTicket = {
            id: crypto.randomUUID(),
            trackId,
            trackTitle,
            sessionId,
            sessionTitle: sessionTitle || "Keynote de Abertura",
            seatId,
            category: category as any,
            purchaseDate: new Date().toISOString(),
            eventDate,
        };

        addTicket(newTicket);
        navigate("/profile", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lado Esquerdo: Resumo */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Confirme seu Ingresso</h2>

                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-cobalt-600 p-3 rounded-2xl">
                                <TicketIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                                    Trilha Selecionada
                                </p>
                                <h3 className="text-xl font-bold text-gray-900">{trackTitle}</h3>
                            </div>
                        </div>

                        <div className="space-y-4 border-t border-gray-50 pt-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tipo de Ingresso</span>
                                <span
                                    className={`font-bold ${category === "vip" ? "text-amber-600" : "text-gray-900"}`}
                                >
                                    {category.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lugar Reservado</span>
                                <span className="font-bold text-gray-900">{seatId || "Livre (Sessão Comum)"}</span>
                            </div>
                            <div className="flex justify-between text-2xl pt-4 border-t border-gray-50">
                                <span className="font-black text-gray-900">Total</span>
                                <span className="font-black text-cobalt-600">
                                    {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500 text-sm px-4">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        Ambiente de pagamento seguro e criptografado.
                    </div>
                </div>

                {/* Lado Direito: Pagamento / Confirmação */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" /> {isFree ? "Confirmação" : "Dados do Cartão"}
                    </h3>

                    <form onSubmit={handlePayment} className="space-y-4">
                        {!isFree ? (
                            <>
                                <InputField
                                    label="Número do Cartão"
                                    placeholder="0000 0000 0000 0000"
                                    value={form.card}
                                    onChange={(e) => setForm({ ...form, card: e.target.value })}
                                />
                                <InputField
                                    label="Nome Impresso no Cartão"
                                    placeholder="MARTA S SILVA"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Validade"
                                        placeholder="MM/AA"
                                        value={form.expiry}
                                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                    />
                                    <InputField
                                        label="CVV"
                                        placeholder="123"
                                        value={form.cvv}
                                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl border border-emerald-100 mb-6">
                                <p className="font-medium text-center">
                                    Esta sessão já está inclusa no seu passe da trilha. Confirme abaixo para garantir
                                    sua vaga.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!isFormValid || isProcessing}
                            className="w-full bg-cobalt-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-cobalt-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cobalt-200 mt-6 flex justify-center items-center"
                        >
                            {isProcessing ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : isFree ? (
                                "Confirmar Reserva"
                            ) : (
                                "Confirmar Pagamento"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
