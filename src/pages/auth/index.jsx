import Backgrouund from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema, SignUpSchema } from "@/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Auth() {
  const naviagte = useNavigate();
  const { setUserInfo } = useAppStore();

  const formIn = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formUp = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logged in successfully");
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) {
            naviagte("/chat");
          } else {
            naviagte("/profile");
          }
        }
        formIn.reset();
      } else if (response.status === 202) {
        setUserInfo(response.data.user);
        naviagte("/email-verification");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data || "An error occurred during login.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  const handleSignUp = async (values) => {
    const { email, password } = values;

    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUserInfo(response.data.user);
        toast.success("Account created successfully");
        formUp.reset();
        naviagte("/email-verification");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data || "An error occurred during sign-up.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error occurred while making the request.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the chat app.
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ease-in-out"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 ease-in-out"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-10">
                <Form {...formIn}>
                  <form
                    onSubmit={formIn.handleSubmit(handleLogin)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={formIn.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              type="email"
                              className="rounded-full p-6"
                            />
                          </FormControl>
                          <FormMessage className="ml-4" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formIn.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              type="password"
                              className="rounded-full p-6"
                            />
                          </FormControl>
                          <FormMessage className="ml-4" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="rounded-full p-6 w-full"
                      disabled={formIn.formState.isSubmitting}
                    >
                      {formIn.formState.isSubmitting ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signup" className="mt-10">
                <Form {...formUp}>
                  <form
                    onSubmit={formUp.handleSubmit(handleSignUp)}
                    className="flex flex-col gap-5"
                  >
                    <FormField
                      control={formUp.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              type="email"
                              className="rounded-full p-6"
                            />
                          </FormControl>
                          <FormMessage className="ml-4" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formUp.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              {...field}
                              type="password"
                              className="rounded-full p-6"
                            />
                          </FormControl>
                          <FormMessage className="ml-4" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formUp.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Confirm Password"
                              {...field}
                              type="password"
                              className="rounded-full p-6"
                            />
                          </FormControl>
                          <FormMessage className="ml-4" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="rounded-full p-6 w-full"
                      disabled={formUp.formState.isSubmitting}
                    >
                      {formUp.formState.isSubmitting ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Backgrouund} alt="Background" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
}
