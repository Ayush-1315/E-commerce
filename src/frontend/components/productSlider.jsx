import { useEffect, useState, useRef } from "react";

export const Slider = () => {
  const slides = [
    {
      image: "https://shorturl.at/JYZ59",
    },
    {
      image: "https://shorturl.at/bghlP",
    },
    {
      image: "https://shorturl.at/cquT6",
    },
    {
      image: "https://shorturl.at/ceLU9",
    },
  ];
  const totalSlides = slides.length;
  const sliders = useRef(totalSlides);

  const [currentSlide, setCurrentSilder] = useState(0);
  const slide = (slideNo) => {
    return {
      transform: `translate(-${slideNo * 100}vw)`,
      width: `${totalSlides * 100}%`,
    };
  };
  useEffect(() => {
    setInterval(() => {
      setCurrentSilder((prev) => (prev === sliders.current - 1 ? 0 : prev + 1));
    }, 3000);
  }, []);

  return (
    <div className="Slider">
      <ul style={slide(currentSlide)}>
        {slides.map(({ image }, index) => (
          <li className="slides" key={index}>
            <img src={image} alt="ad" className="sliderImages" />
          </li>
        ))}
      </ul>
      <div className="toggleBtn">
        {slides.map((_,index)=><span key={index}>
        <input type="radio" id={index} checked={index===currentSlide} name="slide" onClick={()=>{
            setCurrentSilder(index)
        }} onChange={e => {}}/>
        <label htmlFor={index} className="toggleBtnlabel" style={{backgroundColor:index===currentSlide?"#00b495":"white"}}></label>
        </span>)}
        </div>
    </div>
  );
};
