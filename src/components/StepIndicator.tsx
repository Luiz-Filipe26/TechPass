interface Step {
    label: string;
    active: boolean;
    done: boolean;
}

export function StepIndicator({ currentStep }: { currentStep: "seat" | "payment" }) {
    const steps: Step[] = [
        { label: "Assento", active: currentStep === "seat", done: currentStep === "payment" },
        { label: "Pagamento", active: currentStep === "payment", done: false },
    ];

    return (
        <div className="flex items-center gap-2 mb-6">
            {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                    {i > 0 && (
                        <div className={`h-px w-8 ${step.done || step.active ? "bg-cobalt-600" : "bg-gray-300"}`} />
                    )}

                    <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${step.active
                                ? "bg-cobalt-600 text-white"
                                : step.done
                                    ? "bg-cobalt-100 text-cobalt-700"
                                    : "text-gray-400"
                            }`}
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
