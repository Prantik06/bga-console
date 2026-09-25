import clsx from "clsx";

const tones: Record<string, string> = {
  active: "bg-[#173328] text-[#4ADE80] border-[#22492F]",
  inactive: "bg-[#2A2A1F] text-[#D4C25C] border-[#403C22]",
  banned: "bg-[#3A1A22] text-[#F0508C] border-[#4E2130]",
  owner: "bg-owner/10 text-owner border-owner/30",
  leader: "bg-legend/10 text-legend border-legend/30",
  admin: "bg-legacy/10 text-legacy border-legacy/30",
  vice_admin: "bg-text-muted/10 text-text-muted border-border",
};

export function Badge({
  tone = "active",
  children,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
