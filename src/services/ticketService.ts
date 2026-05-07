import { type TicketCategory } from "@/types/ticket";

export interface PaymentData {
    card?: string;
    name?: string;
    expiry?: string;
    cvv?: string;
}

const TICKET_PRICES = {
    vip: 499.0,
    standard: 299.0,
    general: 0.0,
};

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTicketPrices(): Promise<Record<TicketCategory, number>> {
    await delay();
    return { ...TICKET_PRICES };
}

export async function getPriceByCategory(category: TicketCategory): Promise<number> {
    await delay();
    return TICKET_PRICES[category];
}

export async function processTicketPayment(data: PaymentData, isFree: boolean): Promise<boolean> {
    await delay(1500);

    if (!isFree) {
        const isInvalid = !data.card || !data.name || !data.expiry || !data.cvv;
        if (isInvalid) {
            throw new Error("Dados de pagamento incompletos ou inválidos.");
        }
        if (data.card?.endsWith("0000")) {
            throw new Error("O pagamento foi recusado pela operadora do cartão.");
        }
    }

    return true;
}
