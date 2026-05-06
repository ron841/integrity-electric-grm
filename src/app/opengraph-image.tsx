import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Integrity Electric — Marion County Electrician · 4.8 / 106 reviews on Google";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#14110f",
          color: "#f7f4f0",
          padding: 80,
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#cf1e1e",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
            Integrity Electric
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
              color: "#f7f4f0",
            }}
          >
            Marion County&apos;s pick-up-the-phone electrician.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#f5b3b3",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Residential, agricultural, and small-commercial out of Belleview.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            borderTop: "1px solid rgba(247,244,240,0.18)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 56, fontWeight: 600, color: "#cf1e1e" }}>
              4.8 ★
            </span>
            <span style={{ fontSize: 22, color: "rgba(247,244,240,0.7)" }}>
              across 106 Google reviews
            </span>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 20, color: "rgba(247,244,240,0.7)" }}>
            (352) 307-6335 · FL EC13006493
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
