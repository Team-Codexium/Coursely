import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from 'axios';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Circle } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const updateProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  interests: z.string().optional(),
  experties: z.string().optional(),
  bio: z.string().optional(),


})


const EditProfile = () => {

  const { cookies, user } = useUserContext();

  const [file, setFile] = useState(null);
  const [pfpUrl, setPfpUrl] = useState("");
  

  const handleUpload = async () => {
    console.log(`Uploading`);
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append('media', file);
    try {
      const response = await axios.post("http://localhost:3000/users/upload-media", formData, { headers: { "Content-Type": "multipart/form-data", }, withCredentials: true });
      console.log(response)
      const url = response.data.url;
      setPfpUrl(url)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      interests: user.interests,
      experties: user.experties,
      bio: user.bio,
    },
  })

  const token = cookies.token || sessionStorage.getItem("token");

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    try {
      await handleUpload();
      
      const formData = new FormData();
      formData.append("name", values.name);
      // formData.append("role", role);
      formData.append("interests", values.interests);
      formData.append("experties", values.experties);
      formData.append("bio", values.bio);
      formData.append("pfp", pfpUrl);
      
      const response = await axios.patch("http://localhost:3000/users/update-profile", formData, { withCredentials: true, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"}});
      
      if (response.data.success) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error updating profile", error);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      <img src={user.pfp} alt="profile picture" className='h-full w-36 rounded-full bg-over' />
      <form action='http://localhost:3000/users/upload-media' method="POST" encType='multipart/form-data' onSubmit={(e) => handleUpload(e)} className='flex flex-col s'>
        <label htmlFor="pfp">Profile Picture</label>
        <input type="file" name='pfp' id='pfp' onChange={(e) => setFile(e.target.files[0])} />
      </form>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experties"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="experties">Experties</FormLabel>
                <FormControl>
                  <Input id="experties" placeholder="Your area of expertise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="interests">Interests</FormLabel>
                <FormControl>
                  <Input id="interests" placeholder="Your interests" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input id="bio" placeholder="Tell us a little bit about yourself" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Circle />}update</Button>
        </form>
      </Form>
    </div>
  )
}

export default EditProfile
