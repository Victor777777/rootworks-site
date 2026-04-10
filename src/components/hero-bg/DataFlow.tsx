export default function DataFlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="gradient-blob-warm gradient-blob-warm-1 absolute"
        style={{
          top: "-10%",
          left: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,195,170,0.15) 0%, rgba(220,195,170,0) 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="gradient-blob-warm gradient-blob-warm-2 absolute"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(210,185,165,0.12) 0%, rgba(210,185,165,0) 70%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="gradient-blob-warm gradient-blob-warm-3 absolute"
        style={{
          top: "35%",
          right: "15%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,190,175,0.10) 0%, rgba(200,190,175,0) 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
