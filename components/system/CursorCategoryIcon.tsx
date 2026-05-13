"use client";

/** Tiny SVG icons rendered inside the cursor ring when the visitor scrolls
 *  through a category section in the menu. Stylised, mono-color
 *  (currentColor), readable at 24px. */
type Props = { category: string; className?: string };

export function CursorCategoryIcon({ category, className = "" }: Props) {
  const c = category.toUpperCase();
  switch (c) {
    case "TACOS":
      return (
        // French tacos: rectangular folded wrap, cheese drip on side
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <rect x="2.5" y="7.5" width="19" height="9" rx="2" />
          <path d="M5 11.5h14" />
          <path d="M6 13.5h2M11 13.5h3M17 13.5h1.5" />
          <path d="M21.5 16.5l.8 2.2M16.5 16.5v2.5M11.5 16.5l-.6 2" />
        </svg>
      );

    case "BURGERS":
      return (
        // Classic burger silhouette
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <path d="M3 9.5C3 6.5 6.5 4.5 12 4.5S21 6.5 21 9.5" />
          <path d="M3 9.5h18" />
          <path d="M3.5 12.5h17" />
          <path d="M3 15.5c1 0 1 1 2 1s1-1 2-1 1 1 2 1 1-1 2-1 1 1 2 1 1-1 2-1 1 1 2 1 1-1 2-1" />
          <path d="M3.5 18.5c0 1 1 1.5 2 1.5h13c1 0 2-.5 2-1.5" />
          <path d="M7 7.5l.5-.3M11 6.7l.4-.2M15 6.9l.5-.2M18 8l.4-.3" />
        </svg>
      );

    case "BOWLS":
      return (
        // Bowl with food inside + steam
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <path d="M3 12c0 4 4 7 9 7s9-3 9-7" />
          <path d="M3 12h18" />
          <path d="M6 11c1-1 2.5-1.5 3.5-1M12 10c1.5-.5 3 0 4 .5" />
          <path d="M9 5c0 1.5 1 1.5 1 3M14 4c0 1.5 1 1.5 1 3" />
        </svg>
      );

    case "ENSALADAS":
      return (
        // Bowl with leaves rising
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden
        >
          <path d="M3 14c0 3.5 4 6 9 6s9-2.5 9-6" />
          <path d="M3 14h18" />
          <path d="M7 13c0-3 2-5 4-5M12 13c0-4 3-6 6-5M11 13c-1-2-3-2-4-1" />
          <path d="M9 8c1-1 2-1 3 0" />
        </svg>
      );

    default:
      return null;
  }
}
