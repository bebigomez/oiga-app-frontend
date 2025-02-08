import { useState } from "react";

const Slider = ({ slides }) => {

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          transform: `translateX(-${index * 200 / slides.length}%)`,
          transition: "transform 0.5s ease-in-out",
          width: `${100}%`,
        }}
      >
        {slides.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} style={{ width: "100%" }} />
        ))}
      </div>

      {slides.length > 1 && (<>
      <button onClick={prevSlide} style={{ position: "absolute", left: 10, top: "50%" }}>
        ◀
      </button>
      <button onClick={nextSlide} style={{ position: "absolute", right: 10, top: "50%" }}>
        ▶
      </button>
      </>
    )}
    </div>
  );
};

export default Slider;
