import AppWrap from '@/wrapper/AppWrap'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const Home = () => {
  return (
    <div className='bg-violet-800 h-[100vh] '>
      {/* <Carousel plugin={[Autoplay({delay: 200})]}>
        <CarouselContent>
          <CarouselItem className="basis-1 bg-red-400">...</CarouselItem>
          <CarouselItem className="basis-1 bg-green-300">...</CarouselItem>
          <CarouselItem className="basis-1 w-full bg-blue-200">...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      <div className='bg-slate-400 w-full h-[30rem]'>

      </div>

    </div>
  )
}

export default AppWrap(Home);