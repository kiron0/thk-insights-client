import { useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DefaultBanner from "../assets/blog banner.png";
import Logo from "../assets/logo.png";
import { uploadImage } from "../common/aws";
import AnimationWrapper from "../common/page-animation";

export default function BlogEditor() {
          const blogBannerRef = useRef<HTMLImageElement>(null);

          const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const img = e.target.files![0];

                    if (img) {
                              const loadingToast = toast.loading('Uploading banner...');
                              uploadImage(img).then((url) => {
                                        if (url) {
                                                  toast.dismiss(loadingToast);
                                                  blogBannerRef.current!.src = url;
                                                  toast.success('Banner uploaded successfully');
                                        }
                              }).catch(err => {
                                        toast.dismiss(loadingToast);
                                        toast.error(err.message);
                              });
                    }


          }

          return (
                    <>
                              <nav className="navbar">
                                        <Link to="/" className="flex-none w-10">
                                                  <img src={Logo} alt="" />
                                        </Link>
                                        <p className="max-md:hidden text-black line-clamp-1 w-full">
                                                  New Blog
                                        </p>

                                        <div className="flex gap-4 ml-auto">
                                                  <button className="btn-dark py-2">
                                                            Publish
                                                  </button>
                                                  <button className="btn-light py-2">
                                                            Save Draft
                                                  </button>
                                        </div>
                              </nav>

                              <AnimationWrapper>
                                        <section>
                                                  <div className="mx-auto max-w-[900px] w-full">
                                                            <div className="relative aspect-video rounded-xl hover:opacity-80 bg-white border-4 border-grey">
                                                                      <label htmlFor="uploadBanner">
                                                                                <img
                                                                                          ref={blogBannerRef}
                                                                                          src={DefaultBanner}
                                                                                          alt=""
                                                                                          className="z-20 rounded-xl" />

                                                                                <input
                                                                                          type="file"
                                                                                          id="uploadBanner"
                                                                                          accept="image/*"
                                                                                          hidden
                                                                                          onChange={handleBannerUpload}
                                                                                />
                                                                      </label>
                                                            </div>
                                                  </div>
                                        </section>
                              </AnimationWrapper>
                    </>
          )
}