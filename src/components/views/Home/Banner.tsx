import { useNavigate } from "react-router-dom";
import Banner_left from "../../../assets/home/banner.jpg";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row py-5 justify-content-center">
          <div className="col-lg-5">
            <h2 className="fs-1 fw-bold">
              Find your next <span>Perfect</span>
            </h2>
            <h2 className="fs-1 fw-bold test">place with ease</h2>
            <p>
              RealEstate will help you find your home fast, easy and
              comfortable. Our expert support are always available.
            </p>
            <button
              className="btn btn-link"
              onClick={() => navigate("/search")}
            >
              Lets start now
            </button>
          </div>
          <div className="col-lg-5 banner_img">
            <img src={Banner_left} className="img-fluid"></img>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
