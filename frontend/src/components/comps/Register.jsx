import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react"
import { hr } from "@/assets"
import { Circle, Trash } from "lucide-react"
import PropTypes from "prop-types"

const registerSchema = z.object({
  role: z.string().min(1, { message: "Role selection is required." }),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
  interests: z.string().optional(),
  experties: z.string().optional(),
  bio: z.string().optional(),


})


const Register = ({ setCookie, setIsAuthenticated }) => {
  const navigate = useNavigate();
  // const [preview, setPreview] = useState(null)
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault()
    setStep((prevStep) => prevStep + 1)
  }
  const handlePrev = () => {
    // setRole("");
    setStep(step - 1);
    if (step === 1) {
      setRole("");
    }
  }



  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "",
      name: "",
      email: "",
      password: "",
      interests: "",
      experties: "",
      bio: "",
      // pfp: {},
    },
  });

  // const handleImageUpload = async (file) => {
  //   const formData = new FormData();
  // formData.append("file", file);
  // formData.append("upload_preset", "YOUR_UPLOAD_PRESET");  // Configure this in Cloudinary

  // const response = await fetch("https://console.cloudinary.com/console/c-3e2d84c40c59c6e5925d41e7dc31fa/media_library/folders/c981d64fe08926106998f9b9e03dca3f99", {
  //   method: "POST",
  //   body: formData,
  // });
  // const data = await response.json();
  // return data.secure_url;
  // }

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    try {

      const formData = new FormData();
      formData.append("role", values.role);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("interests", values.interests || "");
      formData.append("experties", values.experties || "");
      formData.append("bio", values.bio || "");
      
      //Sending formData to backend
      const response = await axios.post("http://localhost:3000/users/register", values, { withCredentials: true });

      const token = response.data.token;
      if (token) {
        sessionStorage.setItem("token", token);
        setCookie("token", token);
      }
      if (response.data.success) {
        setIsAuthenticated(true)
        navigate("/dashboard");
      }
    } catch (err) {

      console.log("Error registering user:", err.message);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setPreview(URL.createObjectURL(file))
  //     form.setValue("pfp", file)
  //   }
  // }

  // const handleRemoveImage = () => {
  //   setPreview(null)
  //   form.resetField("pfp")
  // }

  return (
    <div className="flex justify-evenly items-center">
      <div className="hidden md:flex justify-center items-center  flex-1 ml-4">
        <img src={hr} alt="illustrator" className="hidden md:flex justify-center items-center  flex-1 ml-4" />
      </div>

      <div className="flex flex-1 mt-7 min-h-[60vh] h-full w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{step === 1 ? "Select user type" : "Register"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  {step === 1 && (
                    <FormField
                      control={form.control}
                      name="role"
                      render={() => (
                        <Select onValueChange={(value) => { form.setValue("role", value); setRole(value); }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Register as:" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Register as:</SelectLabel>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="instructor">Instructor</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}

                  {step === 2 && role && (
                    <>
                      {/* Name Field */}
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

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                              <Input id="email" placeholder="johndoe@mail.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                              <Input id="password" placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Role-Based Fields */}
                      {role === "instructor" && (
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
                      )}
                      {role === "student" && (
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
                      )}
                    </>
                  )}
                  {step === 3 && role && <>
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
                    {/* Some error occured during implementaion */}
                    {/*<FormField
                      control={form.control}
                      name="pfp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <Card>
                            <CardContent className="p-6">
                              {preview ? (
                                <div className="relative">
                                  <img src={preview} alt="Profile Preview" className="w-full h-44 object-cover rounded-lg" />
                                  <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-sm"
                                  >
                                    <Trash className="m-2" />
                                    
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    e.preventDefault()
                                    const file = e.dataTransfer.files[0]
                                    if (file) {
                                      setPreview(URL.createObjectURL(file))
                                      form.setValue("pfp", file)
                                    }
                                  }}
                                >
                                  <Input
                                    type="file"
                                    onChange={(e) => {
                                      handleFileChange(e)
                                      field.onChange(e.target.files[0])
                                    }}
                                    accept="image/*"
                                    className="hidden"
                                    ref={(input) => (input ? field.ref(input) : null)}
                                  />
                                  <p>Drag and drop an image or click to upload</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                          <FormMessage />
                        </FormItem>
                      )}
                    />*/}

                  </>}

                  {step === 1 && (
                    <Button onClick={handleNext} className="mt-4 w-full" disabled={role.length === 0}>
                      Save and Next
                    </Button>
                  )}
                  {step > 1 && <Button onClick={handlePrev} className="mt-4 w-full">Previous</Button>}
                  {step === 2 && <Button onClick={handleNext} className=" w-full">Next</Button>}
                  {step === 3 && <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Circle />}Register</Button>}
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="underline">Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;


Register.propTypes = {
  setCookie: PropTypes.func,
  setIsAuthenticated: PropTypes.func
}