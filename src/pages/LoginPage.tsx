import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Ticket, Loader2, Check, X } from "lucide-react";
import { InputField } from "../components/InputField";

const AuthMode = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    SUBMITTING: "SUBMITTING",
} as const;

type AuthMode = (typeof AuthMode)[keyof typeof AuthMode];

export function LoginPage() {
    const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const isSubmitting = mode === AuthMode.SUBMITTING;
    const isLoginMode = mode === AuthMode.LOGIN;

    const passwordRequirements = [
        { label: "Mínimo de 6 caracteres", met: formData.password.length >= 6 },
        { label: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(formData.password) },
        { label: "Pelo menos um número", met: /[0-9]/.test(formData.password) },
        { label: "Pelo menos um caractere especial", met: /[^A-Za-z0-9]/.test(formData.password) },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                const allRequirementsMet = passwordRequirements.every((req) => req.met);
                if (!allRequirementsMet) {
                    throw new Error("Por favor, atenda a todos os requisitos de senha.");
                }

                await register(formData.name, formData.email, formData.password);
            }
            navigate("/");
        } catch (err: any) {
            setError(err.message);
            setMode(previousMode);
        }
    };

    const formFields = [
        {
            label: "Nome",
            name: "name" as const,
            type: "text",
            placeholder: "João da Silva",
            show: !isLoginMode,
        },
        {
            label: "E-mail",
            name: "email" as const,
            type: "email",
            placeholder: "voce@exemplo.com",
            show: true,
        },
        {
            label: "Senha",
            name: "password" as const,
            type: "password",
            placeholder: "••••••••",
            show: true,
        },
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-cobalt-50 p-3 rounded-full">
                            <Ticket className="w-8 h-8 text-cobalt-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {isLoginMode ? "Acesse sua conta" : "Crie sua conta"}
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitting} className="space-y-4">
                        {formFields
                            .filter((field) => field.show)
                            .map((field) => (
                                <InputField
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    required
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                            ))}
                    </fieldset>

                    {!isLoginMode && (
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-3">Sua senha deve conter:</p>
                            <ul className="space-y-2">
                                {passwordRequirements.map((req, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${req.met ? "text-green-600" : "text-gray-500"
                                            }`}
                                    >
                                        {req.met ? (
                                            <Check className="w-4 h-4 stroke-3" />
                                        ) : (
                                            <X className="w-4 h-4 stroke-2" />
                                        )}
                                        <span>{req.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-cobalt-600 hover:bg-cobalt-700 transition-all disabled:opacity-70 shadow-md"
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

                <div className="text-center">
                    {!isSubmitting && (
                        <button
                            type="button"
                            onClick={() => {
                                setMode(isLoginMode ? AuthMode.REGISTER : AuthMode.LOGIN);
                                setError("");
                            }}
                            className="text-sm font-medium text-cobalt-600 hover:text-cobalt-800 cursor-pointer"
                        >
                            {isLoginMode ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Login"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
