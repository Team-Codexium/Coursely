import { useState, useEffect } from "react";
import banner from "../assets/banner.png";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import AppWrap from "@/wrapper/AppWrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get("http://localhost:3000/courses", {withCredentials: true});
      // console.log(response.data.courses)
      console.log(response)
      if (response.data.success) {
        setCourses(response.data.courses)
      }
    }
    getCourses();
  }, [])
 console.log(courses)
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
    <div className="px-4 md:px-8 lg:px-16 max-w-[80rem] w-full flex flex-col justify-center items-start">
      <section
        style={{ backgroundImage: `url(${banner})` }}
        className="mt-8 h-[23rem] w-full p-6 bg-center bg-cover bg-gray-200 border-2 border-blue-400 rounded-lg flex flex-col md:flex-row items-center justify-between"
      >
        <div className="flex flex-col text-left space-y-2">
          <h2 className="text-4xl text-lightBrown w-60 font-bold">
            Become the best version of yourself
          </h2>
          <Button variant="outline" className="text-xl">Explore now</Button>
        </div>
      </section>

      <section className="mt-12 w-full">
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

          <div className="flex space-y-4  w-full justify-center items-center">
            {courses && courses
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
                    <Link to={`/login`}><button className="bg-gray-800 text-white px-2 py-2 rounded">
                        ADD TO CART
                      </button></Link>
                      <Link to={`/courses/${course._id}`}><button className="bg-yellow-500 text-black px-2 space-2 py-2 rounded">
                        Start now
                      </button></Link>
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

export default AppWrap(Home);

Home.propTypes = {
  courses: PropTypes.array,
}
