import type { DeliveryStrip } from "@/content/types";

export function DeliveryStrip({ strip }: { strip: DeliveryStrip }) {
  return (
    <section className="delivery-strip" aria-label="Selected delivery context">
      <span>{strip.label}</span>
      <div>
        {strip.clients.map((client) => (
          <b key={client}>{client}</b>
        ))}
      </div>
    </section>
  );
}
