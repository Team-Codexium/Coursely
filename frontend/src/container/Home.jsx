import React, { useState, useEffect } from "react";
import banner from "../assets/banner.png";
import PropTypes from "prop-types";

const Home = ({courses}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;

 
  const handleNext = () => {
    if (currentIndex + visibleCards < courses.length) {
      setCurrentIndex(currentIndex + visibleCards);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - visibleCards >= 0) {
      setCurrentIndex(currentIndex - visibleCards);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <section
        style={{ backgroundImage: `url(${banner})` }}
        className="mt-8 h-[23rem] p-6 bg-center bg-cover bg-gray-200 border-2 border-blue-400 rounded-lg flex flex-col md:flex-row items-center justify-between"
      >
        <div className="flex flex-col text-left space-y-2">
          <h2 className="text-4xl text-lightBrown w-60 font-bold">
            Become the best version of yourself
          </h2>
          <p className="text-2xl">Explore now</p>
        </div>
        {/* <div className="w-full md:w-1/2 h-48 bg-black text-white flex items-center justify-center mt-4 md:mt-0 "  > */}
        {/* <img  src={banner} alt="hjhjhhgfufhfhvugfuyhfguhgf" /> */}
        {/* </div> */}
      </section>

      <section className="mt-12">
        <h3 className="text-3xl font-bold mb-8">Browse Courses</h3>

        <div className="flex items-center">
          <button
            onClick={handlePrevious}
            className={`${
              currentIndex === 0 ? "invisible" : ""
            } p-2 bg-gray-800 text-white rounded mr-2`}
          >
            &lt; Previous
          </button>

          <div className="flex overflow-hidden flex-wrap">
            {courses
              .slice(currentIndex, currentIndex + visibleCards)
              .map((course, index) => (
                <div key={index} className="w-64 mx-2">
                  <div className="border rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-gray-300 h-48"></div>

                    <div className="p-4">
                      <h4 className="text-lg font-semibold">{course.title}</h4>
                      <p className="text-gray-500 text-sm">{course.mentor}</p>
                      <div className="flex items-center space-x-2 my-2">
                        <span className="text-yellow-500 text-lg font-bold">
                          {course.rating}
                        </span>
                        <span className="text-gray-500 text-xs">
                          ({course.reviews})
                        </span>
                      </div>
                      <p className="text-lg font-bold">{course.price}</p>
                    </div>

                    <div className="flex justify-between p-4 bg-gray-100">
                      <button className="bg-gray-800 text-white px-2 py-2 rounded">
                        ADD TO CART
                      </button>
                      <button className="bg-yellow-500 text-black px-2 space-2 py-2 rounded">
                        Start now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={handleNext}
            className={`${
              currentIndex + visibleCards >= courses.length ? "invisible" : ""
            } p-2 bg-gray-800 text-white rounded ml-2`}
          >
            Next &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.propTypes = {
  courses: PropTypes.array,
}