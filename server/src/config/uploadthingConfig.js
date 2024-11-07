import { Uploadthing } from "uploadthing";

const upload = new Uploadthing({
  apiKey: process.env.UPLOADTHING_API_KEY 
});

export default upload;