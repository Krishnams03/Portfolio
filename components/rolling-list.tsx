interface RollingListProps {
  items: string[];
  speed?: "slow" | "normal" | "fast";
}

const speedClass: Record<NonNullable<RollingListProps["speed"]>, string> = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
};

export function RollingList({ items, speed = "normal" }: RollingListProps) {
  const trackClass = speedClass[speed] ?? speedClass.normal;
  const duplicated = [...items, ...items];

  return (
    <div className="rolling-list">
      <div className={`rolling-list-track ${trackClass}`}>
        {duplicated.map((item, index) => (
          <span key={`${item}-${index}`} className="rolling-list-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
