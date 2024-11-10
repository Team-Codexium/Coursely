
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Circle } from 'lucide-react'
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"


// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
})

const Login = ({ setCookie }) => {
  const toast = useToast()
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        values,
        { withCredentials: true }
      );
      // console.log("login response: ", response)
      if (response.data.success) {

        setCookie("token", response.data.token,{ 
          sameSite: "None",
        });
        setErrorMessage(response.data.message);
        navigate("/dashboard");

      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message);
      toast({
        title: errorMessage,
      })
    }
  }

  return (
    <div>
      <div>

      </div>
      <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormControl>
                          <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoComplete="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <> <Circle /> Loging in </> : "Log in"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login

Login.propTypes = {
  setCookie: PropTypes.func,
  user: PropTypes.object,
};