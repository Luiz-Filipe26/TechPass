import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function InputField({ label, ...props }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                {...props}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cobalt-500 
                           focus:border-cobalt-500 transition-all disabled:bg-gray-100 
                           disabled:text-gray-500 disabled:cursor-not-allowed"
            />
        </div>
    );
}
