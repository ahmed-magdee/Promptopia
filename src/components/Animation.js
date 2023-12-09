export default function Animation() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const animationDiv = array.map((one) => {
    return (
      <span
        key={one}
        className="w-[12px] h-[12px] rounded-full bg-[#ff5722] absolute animate-opacity opacity-0"
        style={{
          transform: `rotate(calc(${one} * (360deg / 15))) translateY(35px)`,
          animationDelay: `${one * 0.15}s`,
        }}
      />
    );
  });

  return (
    <div className="bg-white/80 backdrop-blur-md fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center">
      {" "}
      {animationDiv}
    </div>
  );
}
