import Link from "next/link";

const AppleIcon = ({ size = 22, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PlayIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="pg-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00C9FF" />
        <stop offset="100%" stopColor="#005FCE" />
      </linearGradient>
      <linearGradient id="pg-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE000" />
        <stop offset="100%" stopColor="#FFBD00" />
      </linearGradient>
      <linearGradient id="pg-c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="pg-d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00F176" />
        <stop offset="100%" stopColor="#00A661" />
      </linearGradient>
    </defs>
    <path fill="url(#pg-a)" d="M3.5 2.6C3.2 2.9 3 3.4 3 4v16c0 .6.2 1.1.5 1.4l9.4-9.4z" />
    <path fill="url(#pg-b)" d="M16.8 9.2l-4 2.3 4 2.3 3.2-1.8c.8-.5.8-1.3 0-1.8z" />
    <path fill="url(#pg-c)" d="M3.5 21.4c.5.5 1.3.5 2.2.1l11.1-6.3-4-2.3z" />
    <path fill="url(#pg-d)" d="M3.5 2.6l9.4 9.3 4-2.3L5.7 2.5C5.3 2.3 4.8 2.2 4.4 2.2c-.4 0-.7.1-.9.4z" />
  </svg>
);

type Size = "sm" | "md" | "lg";
type Theme = "dark" | "light";

const sizes = {
  sm: { padding: "8px 14px", iconSize: 20, sub: 9, main: 14, gap: 8, radius: 12 },
  md: { padding: "14px 22px", iconSize: 26, sub: 11, main: 16, gap: 12, radius: 14 },
  lg: { padding: "18px 28px", iconSize: 32, sub: 12, main: 18, gap: 14, radius: 16 },
};

export function AppStoreBtn({ size = "md", theme = "dark" }: { size?: Size; theme?: Theme }) {
  const s = sizes[size];
  const isDark = theme === "dark";
  return (
    <Link
      href="#"
      className="inline-flex items-center transition-transform hover:-translate-y-0.5 active:scale-95"
      style={{
        background: isDark ? "#1B0E2B" : "#fff",
        color: isDark ? "#fff" : "#1B0E2B",
        padding: s.padding,
        borderRadius: s.radius,
        gap: s.gap,
        border: isDark ? "none" : "1px solid rgba(67,36,103,0.12)",
        boxShadow: "0 8px 20px -10px rgba(27,14,43,0.3)",
      }}
    >
      <AppleIcon size={s.iconSize} color={isDark ? "#fff" : "#1B0E2B"} />
      <span className="text-right leading-tight">
        <div style={{ fontSize: s.sub, opacity: isDark ? 0.7 : 0.6, fontWeight: 500 }}>حمّل من</div>
        <div style={{ fontSize: s.main, fontWeight: 800 }}>آب ستور</div>
      </span>
    </Link>
  );
}

export function GooglePlayBtn({ size = "md", theme = "light" }: { size?: Size; theme?: Theme }) {
  const s = sizes[size];
  const isDark = theme === "dark";
  return (
    <Link
      href="#"
      className="inline-flex items-center transition-transform hover:-translate-y-0.5 active:scale-95"
      style={{
        background: isDark ? "#1B0E2B" : "#fff",
        color: isDark ? "#fff" : "#1B0E2B",
        padding: s.padding,
        borderRadius: s.radius,
        gap: s.gap,
        border: isDark ? "none" : "1px solid rgba(67,36,103,0.12)",
        boxShadow: "0 8px 20px -10px rgba(27,14,43,0.3)",
      }}
    >
      <PlayIcon size={s.iconSize} />
      <span className="text-right leading-tight">
        <div style={{ fontSize: s.sub, opacity: isDark ? 0.7 : 0.6, fontWeight: 500 }}>متاح على</div>
        <div style={{ fontSize: s.main, fontWeight: 800 }}>جوجل بلاي</div>
      </span>
    </Link>
  );
}
