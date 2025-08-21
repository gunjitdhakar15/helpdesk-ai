export default function aiStub(text) {
    if (text.includes("refund")) {
        return { category: "billing", confidence: 0.9 };
    } else if (text.includes("error")) {
        return { category: "tech", confidence: 0.85 };
    } else if (text.includes("shipment")) {
        return { category: "shipping", confidence: 0.8 };
    } else {
        return { category: "other", confidence: 0.5 };
    }
}
