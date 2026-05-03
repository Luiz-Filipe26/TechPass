import type { User } from "../types/auth";

export const authService = {
    async login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const db = JSON.parse(localStorage.getItem("@TechPass:users") || "[]");
                const found = db.find((u: any) => u.email === email && u.password === password);

                if (!found) {
                    reject(new Error("E-mail ou senha incorretos."));
                    return;
                }

                resolve({ id: found.id, name: found.name, email: found.email });
            }, 600);
        });
    },

    async register(name: string, email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const db = JSON.parse(localStorage.getItem("@TechPass:users") || "[]");

                if (db.some((u: any) => u.email === email)) {
                    reject(new Error("Este e-mail já está cadastrado."));
                    return;
                }

                const newUser = { id: crypto.randomUUID(), name, email, password };
                db.push(newUser);
                localStorage.setItem("@TechPass:users", JSON.stringify(db));

                resolve({ id: newUser.id, name: newUser.name, email: newUser.email });
            }, 600);
        });
    },
};
