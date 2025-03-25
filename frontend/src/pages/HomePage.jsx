import { Link } from "react-router-dom";

import HomePageImage from "../Assets/Images/homePageMainImage.png"
import HomeLayout from "../Layout/HomeLayout";
function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 min-h-[90vh]">
        <div className="w-1/2 space-y-6  ">
          <h1 className="text-5xl font-semibold">
            Find out best 
            <span className="text-yellow-500 font-bold"> Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>
          <div className="space-x-6">
            <Link to="/courses">
              <button className="btn  text-white bg-yellow-500 hover:bg-yellow-600">
                {" "}
                Explore Courses
              </button>
            </Link>
            <Link to="/contact">
              <button className="btn hover:bg-yellow-500  text-white">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
            <img src={HomePageImage} alt="homepage-image" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
