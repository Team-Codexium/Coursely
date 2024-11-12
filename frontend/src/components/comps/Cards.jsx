
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    // CardTitle,
  } from "@/components/ui/card";
import { Button } from "../ui/button";


const Cards = () => {
  return (
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
  )
}

export default Cards