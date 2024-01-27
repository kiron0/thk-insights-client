/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

export const blogStructure = {
          title: '',
          banner: '',
          content: [] || '',
          tags: [],
          des: '',
          author: { personal_info: {} }
          // isPublished: false,
          // isFeatured: false,
          // isArchived: false,
          // isDeleted: false,
};

export type EditorContextDefault = {
          blog: typeof blogStructure,
          setBlog: Dispatch<SetStateAction<typeof blogStructure>>,
          editorState: string,
          setEditorState: Dispatch<SetStateAction<string>>
          textEditor: { isReady: boolean },
          setTextEditor: Dispatch<SetStateAction<any>>
}