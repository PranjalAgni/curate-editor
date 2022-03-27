require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

import React from "react";
import MediumEditor from "medium-editor";

export const Editor = () => {
  const editor = new MediumEditor(".editable", {
    placeholder: {
      text: "Hey there this is a placeholder text"
    },
    toolbar: {
      /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
      allowMultiParagraphSelection: true,
      buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: "medium-editor-button-first",
      lastButtonClass: "medium-editor-button-last",
      relativeContainer: undefined,
      standardizeSelectionStart: false,
      static: false,
      /* options which only apply when static is true */
      align: "center",
      sticky: false,
      updateOnEmptySelection: false
    }
  });

  return (
    <div>
      <div className="editable"></div>
    </div>
  );
};
