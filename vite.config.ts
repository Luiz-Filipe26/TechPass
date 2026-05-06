import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repositoryName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : "/";

export default defineConfig({
    base: repositoryName,
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [react(), tailwindcss()],
});
