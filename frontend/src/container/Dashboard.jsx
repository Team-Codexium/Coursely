// import { Navbar } from '@/components/comps'
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppWrap from "@/wrapper/AppWrap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hero } from "../assets";

const Dashboard = ({ logout, user }) => {
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    const response = await axios.get("http://localhost:3000/courses", {
      withCredentials: true,
    });
    // console.log(response.data.courses)
    if (response.data.success) {
      setCourses(response.data.courses);
    }
  };
  useEffect(() => {
    getCourses();
  }, [courses]);

  return (
    <div className=" max-w-[80rem]  flex flex-col items-start justify-center overflow-hidden ">
      <h1 className="font-season text-3xl font-bold my-4 px-2 uppercase">
        Welcome ABhishek
      </h1>
      <div
        style={{ backgroundImage: `url(${hero})`, overflow: "hidden" }}
        className="bg-cover bg-center h-80 w-screen mt-6 flex flex-row justify-start items-center lg:w-fll overflow-hidden"
      >
        <Card className="w-96 ml-5 hidden lg:flex flex-col">
          <CardHeader>
            <CardTitle className="font-season text-2xl">
              Welcome to Coursely
            </CardTitle>
            <CardDescription className="font-poppins">
              Learning that makes you better
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Explore</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col justify-start -center  w-full p-4 mt-4 md:mt-7 lg:hidden">
        <h1 className="font-season text-xl md:text-4xl font-semibold">
          Learning that makes you better
        </h1>
        <p className="font-poppins text-sm mt-3 text-gray-700">
          Skills for your present (and future). Get started with us.
        </p>
        <Button className="mt-7 md:text-lg md:h-12">Explore</Button>
      </div>
      <h1 className="font-season text-3xl font-bold my-4 px-2 uppercase">
        Courses For You
      </h1>

      <div className="flex space-y-4 flex-wrap gap-5 w-full justify-center items-center">
        {courses.map((course, index) => (
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
                <Button className="bg-gray-800 text-white px-2 py-2 rounded">
                  ADD TO CART
                </Button>
                <Link to={`/courses/${course._id}`}>
                  <Button className="bg-yellow-500 text-darkBrown hover:text-lightBrown px-2 space-2 py-2 rounded">
                    Start now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(Dashboard);

Dashboard.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};
