export default function RisingLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="gradient-blob-cool gradient-blob-cool-1 absolute"
        style={{
          top: "-10%",
          right: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,190,220,0.15) 0%, rgba(180,190,220,0) 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="gradient-blob-cool gradient-blob-cool-2 absolute"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(170,180,210,0.12) 0%, rgba(170,180,210,0) 70%)",
          filter: "blur(110px)",
        }}
      />
      <div
        className="gradient-blob-cool gradient-blob-cool-3 absolute"
        style={{
          top: "30%",
          left: "15%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,195,215,0.10) 0%, rgba(200,195,215,0) 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
