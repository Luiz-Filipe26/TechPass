import { useState, useMemo, type SyntheticEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Ticket, Loader2, Check, X } from "lucide-react";
import { InputField } from "@/components/InputField";

const AuthMode = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    SUBMITTING: "SUBMITTING",
} as const;

type AuthMode = (typeof AuthMode)[keyof typeof AuthMode];

export function LoginPage() {
    const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const { login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";
    const isSubmitting = mode === AuthMode.SUBMITTING;
    const isLoginMode = mode === AuthMode.LOGIN;

    const allRequirementsMet = useMemo(() => {
        return (
            formData.password.length >= 6 &&
            /[A-Z]/.test(formData.password) &&
            /[0-9]/.test(formData.password) &&
            /[^A-Za-z0-9]/.test(formData.password)
        );
    }, [formData.password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleMode = () => {
        setError("");
        setMode(isLoginMode ? AuthMode.REGISTER : AuthMode.LOGIN);
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const previousMode = mode;
        setMode(AuthMode.SUBMITTING);

        try {
            if (previousMode === AuthMode.LOGIN) {
                await login(formData.email, formData.password);
            } else {
                if (!allRequirementsMet) {
                    throw new Error("Sua senha não atende aos requisitos de segurança.");
                }
                await register(formData.name, formData.email, formData.password);
            }
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro na autenticação.");
            setMode(previousMode);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <div className="bg-cobalt-50 p-3 rounded-full inline-block mb-4">
                        <Ticket className="w-8 h-8 text-cobalt-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {isLoginMode ? "Acesse sua conta" : "Crie sua conta"}
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitting} className="space-y-4">
                        {!isLoginMode && (
                            <InputField
                                label="Nome"
                                name="name"
                                type="text"
                                placeholder="João da Silva"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}
                        <InputField
                            label="E-mail"
                            name="email"
                            type="email"
                            placeholder="voce@exemplo.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Senha"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </fieldset>

                    {!isLoginMode && <PasswordValidation password={formData.password} />}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-100 animate-in fade-in zoom-in duration-200">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-cobalt-600 hover:bg-cobalt-700 transition-all disabled:opacity-70 shadow-md active:scale-95"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : isLoginMode ? (
                            "Entrar"
                        ) : (
                            "Cadastrar"
                        )}
                    </button>
                </form>

                <div className="text-center min-h-5">
                    {!isSubmitting && (
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-sm font-medium text-cobalt-600 hover:text-cobalt-800 transition-colors"
                        >
                            {isLoginMode ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Login"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function PasswordValidation({ password }: { password: string }) {
    const requirements = [
        { label: "Mínimo de 6 caracteres", met: password.length >= 6 },
        { label: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(password) },
        { label: "Pelo menos um número", met: /[0-9]/.test(password) },
        { label: "Pelo menos um caractere especial", met: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Sua senha deve conter:</p>
            <ul className="space-y-2">
                {requirements.map((req, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${req.met ? "text-green-600" : "text-gray-500"
                            }`}
                    >
                        {req.met ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        <span>{req.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
