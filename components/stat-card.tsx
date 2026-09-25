import clsx from "clsx";

const accentText: Record<string, string> = {
  owner: "text-owner",
  legacy: "text-legacy",
  legend: "text-legend",
  empire: "text-empire",
  neutral: "text-text-primary",
};

export function StatCard({
  label,
  value,
  accent = "neutral",
  detail,
}: {
  label: string;
  value: string | number;
  accent?: keyof typeof accentText;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-panel px-5 py-4">
      <div className="text-sm text-text-muted">{label}</div>
      <div className={clsx("font-display mt-1.5 text-3xl font-semibold", accentText[accent])}>
        {value}
      </div>
      {detail && <div className="mt-1 text-xs text-text-faint">{detail}</div>}
    </div>
  );
}
