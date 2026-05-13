import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "CLM French Tacos · Tacos urbanos 100% franceses en Ciudad Real";
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
            "radial-gradient(circle at 80% 30%, rgba(255,138,61,0.22), transparent 55%), linear-gradient(135deg, #070707 0%, #3D0F0A 60%, #070707 100%)",
          color: "#FFF8E7",
          padding: "72px 80px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FFD60A" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#FFD60A",
            }}
          >
            Ciudad Real · Nº01
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.88 }}>
          <div style={{ fontSize: 168, fontWeight: 900, letterSpacing: -6, color: "#FFF8E7" }}>
            FRENCH
          </div>
          <div style={{ fontSize: 168, fontWeight: 900, letterSpacing: -6, color: "#FFD60A" }}>
            TACOS.
          </div>
          <div
            style={{ marginTop: 28, fontSize: 28, color: "rgba(255,248,231,0.85)", maxWidth: 820 }}
          >
            Carne jugosa, patatas dentro, quesazo fundido.
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
          <span>frenchtacos.es</span>
          <span style={{ color: "#FFD60A" }}>Pide en Glovo →</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
