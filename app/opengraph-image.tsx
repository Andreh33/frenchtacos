import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Urban French Takos · Street food francés en Valdepeñas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 80% 30%, rgba(168,85,247,0.28), transparent 55%), linear-gradient(135deg, #0A0612 0%, #2A0F3D 60%, #0A0612 100%)",
          color: "#FFF8E7",
          padding: "72px 80px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#FFD60A" }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#FFD60A",
            }}
          >
            Valdepeñas · Nº01 · Desde 2024
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.88 }}>
          <div style={{ fontSize: 168, fontWeight: 900, letterSpacing: -6, color: "#FFF8E7" }}>
            FRENCH
          </div>
          <div style={{ fontSize: 168, fontWeight: 900, letterSpacing: -6, color: "#FFD60A" }}>
            TAKOS.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "rgba(255,248,231,0.85)",
              maxWidth: 760,
            }}
          >
            Street food francés con alma manchega.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "rgba(255,248,231,0.6)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>urbanfrenchtakos.com</span>
          <span style={{ color: "#FFD60A" }}>Pide ya →</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
