import axios from "axios"
import { FormEvent, useContext } from "react"
import toast from "react-hot-toast"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../App"
import Google from "../assets/google.png"
import AnimationWrapper from "../common/page-animation"
import { passwordRegex } from "../common/regex"
import { storeInSession } from "../common/session"
import InputBox from "../components/input.component"
import { BASE_API } from "../configs"

type UserAuthFormProps = {
          type: 'sign-in' | 'sign-up'
}

export default function UserAuthForm({ type }: UserAuthFormProps) {
          const { userAuth: { accessToken }, setUserAuth } = useContext(UserContext);

          const UserAuthThroughServer = (serverRoute: string, formData: { [k: string]: FormDataEntryValue }) => {
                    axios.post(`${BASE_API}${serverRoute}`, formData)
                              .then(({ data }) => {
                                        storeInSession("user", JSON.stringify(data?.data));
                                        setUserAuth(data?.data);
                                        toast.success(data?.message);
                              })
                              .catch(err => {
                                        toast.error(err.response.data.message);
                              })
          }

          const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const serverRoute = type === 'sign-in' ? '/users/sign-in' : '/users/sign-up';

                    const formData = new FormData(e.currentTarget);

                    const data = Object.fromEntries(formData.entries());

                    const { fullName, email, password, confirmPassword } = data;

                    if (!email || !password) {
                              return toast.error('Please fill in all fields');
                    }

                    if (type === 'sign-up' && !fullName) {
                              return toast.error('Please fill in all fields');
                    }

                    if (type === 'sign-up' && !passwordRegex.test(password as string)) {
                              return toast.error('Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character');
                    }

                    if (type === 'sign-up' && password !== confirmPassword) {
                              return toast.error('Passwords do not match');
                    }

                    UserAuthThroughServer(serverRoute, data);
          }

          return (
                    accessToken ? (
                              <Navigate to="/" />
                    ) : (
                              <AnimationWrapper keyValue={type}>
                                        <section className="h-cover flex items-center justify-center">
                                                  <form onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
                                                            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                                                                      {type === 'sign-in' ? 'Welcome Back' : 'Join us today'}
                                                            </h1>

                                                            {
                                                                      type !== 'sign-in' && <InputBox name="fullName" type="text" placeholder="Enter full name" icon="fi-rr-user" />
                                                            }

                                                            <InputBox name="email" type="email" placeholder="Enter email" icon="fi-rr-envelope" />

                                                            <InputBox name="password" type="password" placeholder="Enter password" icon="fi-rr-key" />

                                                            {
                                                                      type === 'sign-up' && <InputBox name="confirmPassword" type="password" placeholder="Confirm password" icon="fi-rr-key" />
                                                            }

                                                            <button className="btn-dark center mt-14"
                                                                      type="submit"
                                                            >
                                                                      {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                                            </button>

                                                            <div className="relative w-full flex items-center gap-2 my-4 opacity-10 uppercase text-black font-bold">
                                                                      <hr className="w-1/2 border-black" />
                                                                      <span>or</span>
                                                                      <hr className="w-1/2 border-black" />
                                                            </div>

                                                            <button className="btn-dark flex justify-center items-center gap-4 w-[90$] center">
                                                                      <img src={Google} alt="google" className="w-5" />
                                                                      Continue with Google
                                                            </button>

                                                            {
                                                                      type === 'sign-in' ? (
                                                                                <p className="mt-6 text-dark-grey text-xl text-center">
                                                                                          Don't have an account?
                                                                                          <Link to="/sign-up" className="underline text-black text-xl ml-1">Sign Up</Link>
                                                                                </p>
                                                                      ) :
                                                                                (
                                                                                          <p className="mt-6 text-dark-grey text-xl text-center">
                                                                                                    Already have an account?
                                                                                                    <Link to="/sign-in" className="underline text-black text-xl ml-1">Sign In</Link>
                                                                                          </p>
                                                                                )
                                                            }
                                                  </form>
                                        </section>
                              </AnimationWrapper>
                    )
          )
}