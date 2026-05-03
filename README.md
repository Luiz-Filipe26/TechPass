# TechPass

Plataforma de venda de ingressos para o **Urban Innovation Summit** — uma conferência de tecnologia aplicada organizada em torno de um conceito central: cidades são sistemas vivos, e cada trilha temática representa uma camada crítica desse sistema.

> Projeto acadêmico desenvolvido para a disciplina de Interação Humano-Computador (IHC), com foco na aplicação das Heurísticas de Nielsen e em boas práticas de desenvolvimento front-end.

---

## O Evento

O Urban Innovation Summit reúne sessões distribuídas em **6 trilhas temáticas** paralelas:

| Trilha | Tema |
|---|---|
| 🏥 Saúde Digital | Tecnologia aplicada à saúde e bem-estar |
| ⚡ Energia e Sustentabilidade | Inovação em sistemas energéticos |
| 🚇 Mobilidade Urbana | O futuro do transporte nas cidades |
| 📚 EdTech | Transformação digital na educação |
| 🏭 Manufatura Inteligente | Indústria 4.0 e automação |
| 🏙️ Cidades Inteligentes | Infraestrutura urbana conectada |

Cada trilha possui um auditório próprio com lugares numerados para seus **Keynotes de Abertura e Encerramento**, e sessões menores com controle de vagas ao longo dos dias do evento.

---

## Funcionalidades

- **Autenticação** — login e registro simulados com persistência em localStorage
- **Exploração** — navegação por trilhas e sessões com filtros por formato e nível
- **Agenda personalizada** — seleção de sessões com detecção de conflitos de horário
- **Reserva de assentos** — mapa interativo para os keynotes de cada trilha
- **Checkout simulado** — seleção de categoria de ingresso e pagamento fictício
- **Perfil do usuário** — ingressos organizados cronologicamente, separados por eventos futuros e passados
- **Ingresso digital** — QR Code gerado por compra realizada

---

## Stack

- **Vite** + **React**
- **Tailwind CSS**
- **React Router**
- **Context API** + **localStorage** para estado global
- **qrcode.react** para geração de QR Codes
- Dados simulados em `mockData` — sem back-end, sem banco de dados

---

## Como rodar

```bash
npm install
npm run dev
```

---

## Contexto Acadêmico

Trabalho desenvolvido para a disciplina de **Interação Humano-Computador** — aplicação prática das **10 Heurísticas de Nielsen** em um sistema web com fluxo completo de compra de ingressos.
