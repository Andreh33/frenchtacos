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
            "radial-gradient(circle at 80% 40%, rgba(255,214,10,0.18), transparent 55%), linear-gradient(135deg, #2A0F3D 0%, #3A1A5C 60%, #2A0F3D 100%)",
          color: "#FFF8E7",
          padding: "72px 80px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#FFD60A",
            }}
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
            Urban French Takos · Nº01 Valdepeñas
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.92 }}>
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              letterSpacing: -4,
              color: "#FFF8E7",
            }}
          >
            FRENCH
          </div>
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              letterSpacing: -4,
              color: "#FFD60A",
            }}
          >
            TAKOS.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "rgba(255,248,231,0.85)" }}>
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
          <span style={{ color: "#FFD60A" }}>· Pide ya →</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
