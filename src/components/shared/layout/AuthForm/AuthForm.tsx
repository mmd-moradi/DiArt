
import React, { Dispatch, SetStateAction } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Form from "@radix-ui/react-form";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AuthFormActionType } from "@/state/authpopupContext/AuthPopupContext";

interface Props {
  show: boolean;
  setShowForm: Dispatch<AuthFormActionType>;
}

const AuthForm = ({show, setShowForm}: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const passwordRegex = /[!@#$%^&*]/;

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setBusy(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      if (response?.ok) {
        setBusy(false);
        setEmail("");
        setPassword("");
        setUserName("");
        setShowForm({type: "AuthFormClosed"});
        toast.success("Logged in successfully");
      } else if (response?.status === 401) {
        setBusy(false);
        toast.error("Invalid credentials");
      }
    }catch (error) {
      console.log(error);
    }
  }

  const handleSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setBusy(true);
      const response = await axios.post("/api/auth/register", {
        userName,
        email,
        password
      })
      if (response.status === 200) {
        setBusy(false);
        setEmail("");
        setPassword("");
        setUserName("");
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false
        })
        if (res?.status == 200) {
          toast.success("Logged in successfully");
          setBusy(false);
        } else {
          toast.error("there was an error");
          setBusy(false);
        }
        setBusy(false);
        setShowForm({type: "AuthFormClosed"});
      }
    }catch (error) {
      toast.error("Something went wrong")
      console.log(error);
    }
  }

  const checkPassword = (value: string) => {
    return !passwordRegex.test(value);
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-[900]">
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm max-h-[450px] bg-primary rounded-lg shadow-md opacity-0 animate-fadeIn md:max-w-md ${show ? "opacity-100" : ""}`}>
        <button className="absolute top-[-15px] right-[-15px] p-2 bg-white rounded-full border-none cursor-pointer outline-none text-primary hover:opacity-80" onClick={() => setShowForm({type: "AuthFormClosed"})}>
          <MdClose size={24} />
        </button>
        <Tabs.Root className="mt-6 flex flex-col w-full" defaultValue="tab1">
          <Tabs.List className="shrink-0 flex border-b-2 border-tertiary3 outline-none" aria-label="Authentication">
            <Tabs.Trigger className="font-inherit bg-transparent px-5 h-11 flex-1 flex items-center justify-center text-lg font-bold 
            leading-none text-tertiary3 select-none outline-none border-none cursor-pointer transition-all duration-200
             hover:text-white first:rounded-tl-lg last:rounded-tr-lg data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_0_0,0_3px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative" value="tab1">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger className="font-inherit bg-transparent px-5 h-11 flex-1 flex items-center justify-center text-lg font-bold 
            leading-none text-tertiary3 select-none outline-none border-none cursor-pointer transition-all duration-200 hover:text-white first:rounded-tl-lg last:rounded-tr-lg data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_0_0,0_3px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative" value="tab2">
              Sign up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="flex-grow p-8 bg-transparent outline-none" value="tab1">
            <Form.Root onSubmit={(event) => handleLogin(event)} className="w-full h-full">
              <Form.Field className="grid mb-4" name="email">
                <div className="flex items-baseline justify-between mb-1">
                  <Form.Label className="text-lg font-bold leading-9 text-white">Email</Form.Label>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="valueMissing">
                    Please enter your email
                  </Form.Message>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="typeMismatch">
                    Please provide a valid email
                  </Form.Message>
                </div>
                <Form.Control className="w-full inline-flex items-center justify-center rounded-md font-medium text-base text-gray-800 bg-whitesmoke outline-none border-white border focus:ring-2 focus:ring-blue-500" asChild>
                  <input
                    className="w-full px-2.5 h-9 leading-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Form.Control>
              </Form.Field>
              <Form.Field className="grid mb-4" name="password">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-lg font-bold leading-9 text-white">Password</Form.Label>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="valueMissing">
                    Please enter your Password
                  </Form.Message>
                </div>
                <Form.Control className="w-full inline-flex items-center justify-center rounded-md font-medium text-base text-gray-800 bg-whitesmoke outline-none border-white border focus:ring-2 focus:ring-blue-500" asChild>
                  <input
                    className="w-full px-2.5 h-9 leading-none"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit className="py-3 px-16 w-full mt-3 rounded-lg bg-gradient-primary-1 text-base font-bold
               text-white border-none shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gradient-primary-2 active:shadow-sm active:translate-y-1 md:text-lg" asChild>
                <button style={busy ? {opacity: "0.6"}: {opacity: "1"}} 
                  disabled={busy}
                >
                  Login
                </button>
              </Form.Submit>
              <button 
                onClick={() => signIn("google")} 
                type="button" 
                className="mt-4 py-3 px-16 w-full rounded-lg flex items-center justify-center gap-2.5 bg-whiteAlpha9 text-base font-bold text-zinc-800 border-none shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:opacity-90 active:shadow-sm active:translate-y-1 md:text-lg">
                <FcGoogle size={24} />
                <p className="GoogleLoginP">Login with Google</p>
              </button>
            </Form.Root>
          </Tabs.Content>
          <Tabs.Content className="flex-grow p-8 bg-transparent outline-none" value="tab2">
            <Form.Root onSubmit={(event) => handleSignUp(event)} className="w-full h-full">
              <Form.Field className="grid mb-4" name="userName">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-lg font-bold leading-9 text-white">Username</Form.Label>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="valueMissing">
                    Please enter your Username
                  </Form.Message>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="tooShort">
                    Username must be at least 4 characters
                  </Form.Message>
                </div>
                <Form.Control className="w-full inline-flex items-center justify-center rounded-md font-medium text-base text-gray-800 bg-whitesmoke shadow-sm border-white border hover:shadow-md focus:outline-blue-500 focus:ring-2 focus:ring-black focus:ring-opacity-30" asChild>
                  <input
                    className="w-full px-2.5 h-9 leading-none"
                    minLength={4}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    required />
                </Form.Control>
              </Form.Field>
              <Form.Field className="grid mb-4" name="email">
                <div className="flex items-baseline justify-between mb-1">
                  <Form.Label className="text-lg font-bold leading-9 text-white">Email</Form.Label>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="valueMissing">
                    Please enter your email
                  </Form.Message>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="typeMismatch">
                    Please provide a valid email
                  </Form.Message>
                </div>
                <Form.Control className="w-full inline-flex items-center justify-center rounded-md font-medium text-base text-gray-800 bg-whitesmoke shadow-sm border-white border hover:shadow-md focus:outline-blue-500 focus:ring-2 focus:ring-black focus:ring-opacity-30" asChild>
                  <input
                    className="w-full px-2.5 h-9 leading-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Form.Control>
              </Form.Field>
              <Form.Field className="grid mb-4" name="password">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-lg font-bold leading-9 text-white">Password</Form.Label>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match="valueMissing">
                    Please enter your Password
                  </Form.Message>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match={"tooShort"}>
                    At least 8 characters
                  </Form.Message>
                  <Form.Message className="text-sm font-bold text-whitesmoke opacity-90" match={checkPassword}>
                    At least one special character
                  </Form.Message>
                </div>
                <Form.Control className="w-full inline-flex items-center justify-center rounded-md font-medium text-base text-gray-800 bg-whitesmoke shadow-sm border-white border hover:shadow-md focus:outline-blue-500 focus:ring-2 focus:ring-black focus:ring-opacity-30" asChild>
                  <input
                    className="w-full px-2.5 h-9 leading-none"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit className="py-3 px-16 w-full mt-3 rounded-lg bg-gradient-primary-1 text-base font-bold
               text-white border-none shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gradient-primary-2 active:shadow-sm active:translate-y-1 md:text-lg" asChild>
                <button style={busy ? {opacity: "0.6"}: {opacity: "1"}} disabled={busy}>
                  Sign up 
                </button>
              </Form.Submit>
            </Form.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default AuthForm