import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import {celeb} from "../constants/CelebrityData"
import HomeLayout from "../Layout/HomeLayout";
function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center mx-10 gap-5">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable & Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide Affordable and quality Education to the
              world. we are providing the platform to aspiring students to share
              their skills , creativity and knowledge to empower and contribute
              in the growth and wellness of mankind
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px,10px,10px,rgb(0,0,0))",
              }}
              className="drop-shadow-2xl"
              src={aboutMainImage}
              alt="aboutMainImage"
            />
          </div>
        </div>
        <div className="carousel w-1/2 m-auto my-16">
          {celeb &&
            celeb.map(cele => (
              <CarouselSlide
                {...cele}
                key={cele.slideNumber}
                totalSlide={celeb.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
