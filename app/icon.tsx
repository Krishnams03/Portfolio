import { ImageResponse } from "next/og";

export const size = {
  width: 96,
  height: 96,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "28%",
          background:
            "radial-gradient(circle at 30% 25%, #ffffff, #e5ecff 45%, #d7e0ff 70%)",
        }}
      >
        <span
          style={{
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#0f172a",
            fontFamily: 'Geist, "Geist Sans", "Segoe UI", system-ui, sans-serif',
            textShadow: "0 8px 25px rgba(15, 23, 42, 0.25)",
          }}
        >
          K
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
