/** Shared W3S mark for app/icon and app/apple-icon (browser tab + home screen). */
export function brandIconMarkup(size: number) {
  const scale = size / 32;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        color: "#ffffff",
        fontSize: Math.round(11 * scale),
        fontWeight: 700,
        borderRadius: Math.round(6 * scale),
        letterSpacing: "-0.04em",
      }}
    >
      W3S
    </div>
  );
}
