import AppWrap from "@/wrapper/AppWrap";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col justify-center lg:w-[80rem] w-full max-w-[50rem]  ">
      <div
        style={{
          background: "url('../assets/hero.jpg')",
          backgroundSize: "fit",
        }}
        className=" bg-heo flex flex-col text-center  justify-center items-center h-[30rem] px-8 "
      >
        <h1 className="text-3xl font-semibold font-season">
        Discover Your Next Passion with Courses Tailored Just for You
        </h1>
        <Button
          className="h-12 px-2 mt-2 bg-lightBrown text-darkBrown font-poppins font-bold border-2 border-darkBrown hover:text-lightBrown hover:bg-darkBrown"
          size={40}
        >
          Get Started
        </Button>
      </div>

      <div className="heading"></div>
      <div className="cateogories"></div>
      <div className="cards bg-green-900 ">
        <Card className="w-48">
          <CardHeader>
            <img src="" alt="" />
          </CardHeader>
          <CardContent>
            <h1>Title</h1>
            <p>instructor</p>
            <p>rating</p>
            <h2>price</h2>
          </CardContent>
          <CardFooter>
            <Button>Add to card</Button>
            <Button>Buy Now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AppWrap(Home);
