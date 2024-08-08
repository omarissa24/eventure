// app/components/SignUpForm.tsx
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SignUpSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["organizer", "customer"], {
    required_error: "You need to select a role.",
  }),
});

interface SignUpFormProps {
  signUpWithEmail: (data: z.infer<typeof SignUpSchema>) => void;
  clerkError: string;
}

const SignUpForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    signUpWithEmail(data);
    console.log(data);
  }

  return (
    <div className='justify-center mt-12 grid justify-items-center md:mt-20'>
      <div className='h-auto rounded-xl md:rounded-3xl w-80 md:w-96 bg-white shadow-lg'>
        <div className='p-6 md:p-8'>
          <h1 className='mb-8 text-3xl font-light text-black'>
            Sign Up to Eventure
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    {/* <FormLabel className='text-gray-800'>Role</FormLabel> */}

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex space-x-6 justify-center'
                      >
                        <FormItem className='flex items-end space-x-3'>
                          <FormControl>
                            <RadioGroupItem value='organizer' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Organizer
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-end space-x-3'>
                          <FormControl>
                            <RadioGroupItem value='customer' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Customer
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='First name'
                        {...field}
                        className='input-field'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Last name'
                        {...field}
                        className='input-field'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='emailAddress'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Email address'
                        type='email'
                        {...field}
                        className='input-field'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        type='password'
                        {...field}
                        className='input-field'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {clerkError && (
                <h2 className='text-red-500 mb-8'>
                  <p>{clerkError}</p>
                </h2>
              )}

              <Button type='submit' className='w-full'>
                Create an account
              </Button>
            </form>
          </Form>

          <p className='text-sm font-light text-center text-black mt-4'>
            Already have an account?
            <Link className='ml-2 text-black-200' href='/sign-in'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
