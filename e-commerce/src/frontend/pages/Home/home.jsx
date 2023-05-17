import { Categories } from "../../components/categories";
import { Slider } from "../../components/productSlider";
export const Home = () => {

  return (
    <div>
      <Slider />
      <Categories />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "30vh",
            backgroundColor: "grey",
            margin: "0.5rem 1rem",
          }}
        ></div>
        <div
          style={{
            width: "40%",
            height: "30vh",
            backgroundColor: "grey",
            margin: "0.5rem 1rem",
          }}
        ></div>
      </div>
    </div>
  );
};
