import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AppWrap from "@/wrapper/AppWrap";


const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  price: z.string().min(1, "Course price is required"),
  language: z.string().optional(),
  lessons: z
    .array(
      z.object({
        title: z.string().min(1, "Lesson title is required"),
        content: z.string().min(1, "Lesson content is required"),
        duration: z.string().optional(),
        position: z.number().int().positive().optional(),
      })
    )
    .nonempty({ message: "Minimum one lesson is required" }),
});


const CreateCourse = ({user}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      language: "English",
      lessons: [{ title: "", content: "", duration: 0 }],
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "lessons" });

  const onSubmit = async (data) => {
    try {

      const parsedData = {
        ...data,
        userId: user._id,
        price: Number(data.price),
        lessons: data.lessons.map((lesson) => ({
          ...lesson,
          duration: Number(lesson.duration),
        })),
      };
      console.log(parsedData);
      const response = await axios.post("http://localhost:3000/courses/create", parsedData, { withCredentials: true });
      if (response.data.success) {
        toast({ title: "Course created successfully!" });
        navigate("/my-courses");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast({ title: "Failed to create course", variant: "destructive" });
    }
  };

  return (
    <Card className="mx-auto max-w-3xl p-6 m-6 w-full max-w[80rem] items-center">
      <CardHeader>
        <CardTitle className="text-2xl">Create Course</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decription</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="0000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="English..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Lessons</FormLabel>
              {fields.map((lesson, index) => (
                <div key={lesson.id} className="space-y-4 border p-4 rounded-md">
                  <FormField control={form.control} name={`lessons.${index}.title`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl><Input placeholder="Lesson title" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`lessons.${index}.content`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl><Input placeholder="Lesson content" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`lessons.${index}.duration`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl><Input placeholder="Duration" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove Lesson</Button>
                </div>
              ))}
              <Button className="mt-4" type="button" onClick={() => append({ title: "", content: "", duration: 0 })}>Add Lesson</Button>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>


       
      </CardContent>
    </Card>
  );
};

export default AppWrap(CreateCourse);

CreateCourse.propTypes = {
  user: PropTypes.object,
};
