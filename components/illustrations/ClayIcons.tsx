"use client";

export function BadmintonClay({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <radialGradient id="bc1" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff3d6" />
          <stop offset="100%" stopColor="#f2b705" />
        </radialGradient>
      </defs>
      <path d="M32 38L22 14M32 38L28 12M32 38L36 12M32 38L42 14" stroke="#d98c1f" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="46" rx="8" ry="7" fill="url(#bc1)" />
    </svg>
  );
}

export function CompassClay({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <radialGradient id="cc1" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffb997" />
          <stop offset="100%" stopColor="#ff6b4a" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="url(#cc1)" />
      <path d="M32 18L38 32L32 46L26 32Z" fill="#22314f" />
    </svg>
  );
}

export function NetworkClay({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <radialGradient id="nc1" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7fd6b8" />
          <stop offset="100%" stopColor="#2a9d78" />
        </radialGradient>
      </defs>
      <circle cx="18" cy="22" r="8" fill="url(#nc1)" />
      <circle cx="46" cy="22" r="8" fill="url(#nc1)" />
      <circle cx="32" cy="46" r="8" fill="#22314f" />
      <path d="M23 27L28 40M41 27L36 40M25 22L39 22" stroke="#d9bf8c" strokeWidth="2" />
    </svg>
  );
}
