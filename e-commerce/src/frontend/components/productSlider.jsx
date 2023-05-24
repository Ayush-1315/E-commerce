
import { useEffect, useState } from "react";

export const Slider=()=>{
    const slides=[
        {
            image:"https://shorturl.at/JYZ59",
        },
        {
            image:"https://shorturl.at/bghlP",
        },
        {
            image:"https://shorturl.at/cquT6",
        },
        {
            image:"https://shorturl.at/ceLU9"
        }
    ]
    const totalSlides=slides.length;
    const [currentSlide,setCurrentSilder]=useState(0);
    const slide=(slideNo)=>{
        return {transform:`translate(-${slideNo*100}vw)`,width:`${totalSlides*100}%`}
    }
    const nextSlide=()=>{
        setCurrentSilder((prev)=>prev===totalSlides-1?0:prev+1);
    }
    const prevSlide=()=>{
        setCurrentSilder((prev)=>prev===0?totalSlides-1:prev-1);
    }
    useEffect(()=>{
        setInterval(()=>{nextSlide()},3000);

    },[]);
 
    return <div className="Slider">
        <ul style={slide(currentSlide)}>
            {slides.map(({image},index)=><li className="slides" key={index}>
                <img src={image} alt="ad" className="sliderImages"/>
            </li>)}
        </ul>
        <button onClick={prevSlide} className="sliderBtn prev"> {"<<"} </button>
        <button onClick={nextSlide} className="sliderBtn next">{">>"}</button>
    </div>
}