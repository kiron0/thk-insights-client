import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

export default function Editor() {
          const [editorState, setEditorState] = useState<string>('editor');

          const { userAuth: { accessToken } } = useContext(UserContext);

          return (
                    accessToken === null ? (
                              <Navigate to="/sign-in" />
                    ) : editorState === 'editor' ? <BlogEditor /> : <PublishForm />
          )
}