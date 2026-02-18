export default function SectionDivider({ variant = "default" }: { variant?: "default" | "subtle" | "red" }) {
  const gradients: Record<string, string> = {
    default: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 40%, rgba(255,255,255,0.015) 60%, transparent 100%)",
    subtle: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.008) 50%, transparent 100%)",
    red: "linear-gradient(180deg, transparent 0%, rgba(255,0,0,0.03) 40%, rgba(255,0,0,0.03) 60%, transparent 100%)",
  };

  return (
    <div
      className="relative w-full"
      style={{ height: "80px" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: gradients[variant] }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: "min(60%, 500px)",
          height: "1px",
          background: variant === "red"
            ? "linear-gradient(90deg, transparent, rgba(255,0,0,0.15), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </div>
  );
}
