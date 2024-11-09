import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  price: z.string().min(1, "Course price is required"),
  language: z.string().optional(),
  lessons: z
    .array(
      z.object({
        title: z.string().min(1, "Lesson title is required"),
        content: z.string().optional(),
        duration: z.number({message: "Number"}).positive({message: "Duration must be positive"}).optional().default(1),
        position: z.number().int().positive().optional(),
      })
    )
    .nonempty({ message: "At least one lesson is required" }),
});

const CourseForm = () => {
  const { toast } = useToast();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      language: "English",
      lessons: [{ title: "", content: "", duration: 0, position: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "lessons" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/create-courses", data);
      if (response.data.success) {
        toast({ title: "Course created successfully!" });
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast({ title: "Failed to create course", variant: "destructive" });
    }
  };

  return (
    <Card className="mx-auto max-w-3xl p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Create Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Course Title */}
          <div className="form-item">
            <label className="form-label">Course Title</label>
            <Input {...register("title")} placeholder="Enter course title" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          {/* Course Description */}
          <div className="form-item">
            <label className="form-label">Description</label>
            <Input {...register("description")} placeholder="Enter course description" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div className="form-item">
            <label className="form-label">Price</label>
            <Input type="number" {...register("price")} placeholder="Enter price" />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          {/* Language */}
          <div className="form-item">
            <label className="form-label">Language</label>
            <Input {...register("language")} placeholder="Enter language" />
          </div>

          {/* Lessons */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Lessons</h3>
            {fields.map((item, index) => (
              <div key={item.id} className="space-y-4 border rounded-lg p-4">
                <div className="form-item">
                  <label className="form-label">Lesson Title</label>
                  <Input {...register(`lessons.${index}.title`)} placeholder="Enter lesson title" />
                  {errors.lessons?.[index]?.title && <p className="text-red-500">{errors.lessons[index].title.message}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label">Content</label>
                  <Input {...register(`lessons.${index}.content`)} placeholder="Enter content" />
                </div>

                <div className="form-item">
                  <label className="form-label">Duration (mins)</label>
                  <Input {...register(`lessons.${index}.duration`)} placeholder="Enter duration" />
                </div>

                <Button variant="destructive" onClick={() => remove(index)}>Remove Lesson</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ title: "", content: "", duration: "", position: fields.length + 1 })}>
              Add Lesson
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Course"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
