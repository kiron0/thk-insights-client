import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DefaultBanner from "../assets/blog banner.png";
import Logo from "../assets/logo.png";
import { uploadImage } from "../common/aws";
import AnimationWrapper from "../common/page-animation";
import { EditorContext } from "../pages/editor.pages";
import { tools } from "./tools.component";

export default function BlogEditor() {
          const { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext)

          useEffect(() => {
                    const editor = new EditorJS({
                              holder: 'textEditor',
                              data: {} as OutputData || content,
                              tools: tools,
                              placeholder: 'Let\'s write an awesome story!',
                    });

                    setTextEditor(editor);
          }, [])

          const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const img = e.target.files![0];

                    if (img) {
                              const loadingToast = toast.loading('Uploading banner...');
                              uploadImage(img).then((url) => {
                                        if (url) {
                                                  toast.dismiss(loadingToast);
                                                  toast.success('Banner uploaded successfully');

                                                  setBlog({ ...blog, banner: url });
                                        }
                              }).catch(err => {
                                        toast.dismiss(loadingToast);
                                        toast.error(err.message);
                              });
                    }
          }

          const handleBlogTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const input = e.target;

                    input.style.height = "auto";
                    input.style.height = `${input.scrollHeight}px`;

                    setBlog({ ...blog, title: input.value })
          }

          const handlePreviewBlog = () => {
                    // if (!banner.length) {
                    //           return toast.error('Please upload a banner');
                    // }

                    // if (!title.length) {
                    //           return toast.error('Please enter a title');
                    // }

                    if (textEditor) {
                              textEditor.save()
                                        .then((outputData: OutputData) => {
                                                  console.log('Article data: ', outputData);
                                                  if (outputData.blocks.length > 0) {
                                                            setBlog({ ...blog, content: outputData.blocks });
                                                            setEditorState('preview');
                                                  }
                                        }).catch((error) => {
                                                  console.log('Saving failed: ', error)
                                        })
                    }
          }

          return (
                    <>
                              <nav className="navbar">
                                        <Link to="/" className="flex-none w-10">
                                                  <img src={Logo} alt="" />
                                        </Link>
                                        <p className="max-md:hidden text-black line-clamp-1 w-full">
                                                  {title || "New Blog"}
                                        </p>

                                        <div className="flex gap-4 ml-auto">
                                                  <button className="btn-dark py-2"
                                                            onClick={handlePreviewBlog}
                                                  >
                                                            Preview
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
                                                                                          src={banner}
                                                                                          alt="Banner"
                                                                                          className="z-20 rounded-xl"
                                                                                          onError={(e) => {
                                                                                                    const img = e.target as HTMLImageElement;
                                                                                                    img.src = DefaultBanner;
                                                                                          }}
                                                                                />

                                                                                <input
                                                                                          type="file"
                                                                                          id="uploadBanner"
                                                                                          accept="image/*"
                                                                                          hidden
                                                                                          onChange={handleBannerUpload}
                                                                                />
                                                                      </label>
                                                            </div>
                                                            <textarea
                                                                      placeholder="Blog Title"
                                                                      className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                                                                      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                                                                      onChange={handleBlogTitleChange}
                                                            />

                                                            <hr className="w-full opacity-10 my-5" />

                                                            <div id="textEditor" className="font-gelasio"></div>
                                                  </div>
                                        </section>
                              </AnimationWrapper>
                    </>
          )
}