require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

import React, { useEffect } from "react";
import MediumEditor from "medium-editor";

export const Editor = () => {
  useEffect(() => {
    const editor = new MediumEditor(".editor-window", {
      targetBlank: true,
      toolbar: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "anchor",
          "h3",
          "h4",
          {
            name: "unorderedlist",
            contentDefault: "<b>UL</b>"
          },
          {
            name: "orderedlist",
            contentDefault: "<b>OL</b>"
          },
          "quote",
          {
            name: "pre",
            action: "append-pre",
            tagNames: ["pre"],
            contentDefault: "PRE"
          },
          {
            name: "strikethrough",
            action: "strikethrough",
            tagNames: ["strike"],
            contentDefault: "CODE"
          }
        ]
      },
      placeholder: {
        text: "Tell your story...",
        hideOnClick: false
      }
    });

    console.log("Editor mounted = ", editor);
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <div className="editor-window"></div>
    </div>
  );
};
