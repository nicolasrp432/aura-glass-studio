const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Turquoise Orb - Top Right */}
      <div
        className="orb orb-turquoise w-[500px] h-[500px] -top-32 -right-32"
        style={{ animationDelay: "0s" }}
      />
      
      {/* Gold Orb - Bottom Left */}
      <div
        className="orb orb-gold w-[600px] h-[600px] -bottom-48 -left-48"
        style={{ animationDelay: "-7s" }}
      />
      
      {/* Rose Orb - Center Right */}
      <div
        className="orb orb-rose w-[400px] h-[400px] top-1/2 -right-24"
        style={{ animationDelay: "-14s" }}
      />
      
      {/* Small Turquoise Orb - Top Left */}
      <div
        className="orb orb-turquoise w-[300px] h-[300px] top-1/4 -left-20"
        style={{ animationDelay: "-10s" }}
      />
    </div>
  );
};

export default FloatingOrbs;
