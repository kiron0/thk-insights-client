import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import Logo from "../assets/logo.png";
import UserNavigationPanel from "./user-navigation.component";

export default function Navbar() {
          const [searchBoxVisibility, setSearchBoxVisibility] = useState<boolean>(false)

          const [userNavPanel, setUserNavPanel] = useState<boolean>(false);

          const { userAuth: { accessToken, profile_img } } = useContext(UserContext);

          const handleUserNavPanel = () => {
                    setUserNavPanel(prev => !prev);
          }

          const handleUserNavPanelBlur = () => {
                    setTimeout(() => {
                              setUserNavPanel(false);
                    }, 200);
          }

          return (
                    <>
                              <nav className="navbar">
                                        <Link to="/" className="flex-none w-10">
                                                  <img src={Logo} alt="Logo" className="w-full" />
                                        </Link>

                                        <div className={`absolute bg-white w-full left-0 top-full mt-0 5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show
                                        ${searchBoxVisibility ? 'show' : 'hide'}
                              `}>
                                                  <input type="text"
                                                            placeholder="Search"
                                                            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                                                  />

                                                  <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                                        </div>

                                        <div className="flex items-center gap-3 md:gap-6 ml-auto">
                                                  <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                                                            onClick={() => setSearchBoxVisibility(prev => !prev)}
                                                  >
                                                            <i className="fi fi-rr-search text-xl"></i>
                                                  </button>

                                                  <Link to="editor" className="hidden md:flex gap-2 link rounded-full">
                                                            <i className="fi fi-rr-file-edit"></i>
                                                            <p className="hidden md:block">Write</p>
                                                  </Link>

                                                  {
                                                            accessToken ? (
                                                                      <>
                                                                                <Link to="/dashboard/notifications">
                                                                                          <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                                                                                                    <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                                                                                          </button>
                                                                                </Link>

                                                                                <div className="relative"
                                                                                          onClick={handleUserNavPanel}
                                                                                          onBlur={handleUserNavPanelBlur}
                                                                                >
                                                                                          <button className="w-12 h-12 mt-1">
                                                                                                    <img src={profile_img} alt="" className="w-full h-full object-cover rounded-full" />
                                                                                          </button>
                                                                                          {
                                                                                                    userNavPanel && <UserNavigationPanel />
                                                                                          }
                                                                                </div>
                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Link to="/sign-in" className="btn-dark py-2">
                                                                                          Sign In
                                                                                </Link>

                                                                                <Link to="/sign-Up" className="btn-light py-2 hidden md:block">
                                                                                          Sign Up
                                                                                </Link>
                                                                      </>
                                                            )
                                                  }
                                        </div>
                              </nav>
                              <Outlet />
                    </>
          )
}