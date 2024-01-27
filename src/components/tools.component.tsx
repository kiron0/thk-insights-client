import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import Quote from "@editorjs/quote"
import { uploadImage } from "../common/aws"

const uploadImageByFile = async (e: File) => {
          return uploadImage(e).then((url) => {
                    if (url) {
                              return {
                                        success: 1,
                                        file: { url }
                              }
                    }
          })
}

const uploadImageByURL = async (e: string) => {
          const link = new Promise<string>((resolve, reject) => {
                    try {
                              resolve(e);
                    } catch (err) {
                              reject(err);
                    }
          });

          return link.then((url) => {
                    return {
                              success: 1,
                              file: { url }
                    }
          })
}

export const tools = {
          embed: Embed,
          list: {
                    class: List,
                    inlineToolbar: true,
          },
          image: {
                    class: Image,
                    config: {
                              uploader: {
                                        uploadByUrl: uploadImageByURL,
                                        uploadByFile: uploadImageByFile,
                              }
                    }
          },
          header: {
                    class: Header,
                    config: {
                              placeholder: "Type Heading...",
                              levels: [2, 3],
                              defaultLevel: 2,
                    },
          },
          quote: {
                    class: Quote,
                    inlineToolbar: true,
          },
          marker: Marker,
          inlineCode: InlineCode
};