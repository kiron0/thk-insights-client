import { Link } from "react-router-dom"
import Google from "../assets/google.png"
import AnimationWrapper from "../common/page-animation"
import InputBox from "../components/input.component"

type UserAuthFormProps = {
          type: 'sign-in' | 'sign-up'
}

export default function UserAuthForm({ type }: UserAuthFormProps) {
          return (
                    <AnimationWrapper keyValue={type}>
                              <section className="h-cover flex items-center justify-center">
                                        <form className="w-[80%] max-w-[400px]">
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
                                                                                <Link to="/sign-up" className="underline text-black text-xl ml-1">Join us today</Link>
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
}