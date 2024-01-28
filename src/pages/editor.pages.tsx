import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { EditorContextDefault, blogStructure } from "../types";

export const EditorContext = createContext<EditorContextDefault>({
          blog: blogStructure,
          setBlog: () => { },
          editorState: 'editor',
          setEditorState: () => { },
          textEditor: null,
          setTextEditor: () => { },
});

export default function Editor() {
          const [blog, setBlog] = useState(blogStructure);
          const [editorState, setEditorState] = useState<string>('editor');
          const [textEditor, setTextEditor] = useState(null);

          const { userAuth: { accessToken } } = useContext(UserContext);

          return (
                    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
                              {
                                        accessToken === null ? (
                                                  <Navigate to="/sign-in" />
                                        ) : editorState === 'editor' ? <BlogEditor /> : <PublishForm />
                              }
                    </EditorContext.Provider>
          )
}