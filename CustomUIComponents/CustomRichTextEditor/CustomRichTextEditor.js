import React from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./CustomRichTextEditor.scss";

const CustomRichTextEditor = (props) => {
    return (
        <div>
            <Editor
                editorState={props?.editorState}
                toolbarClassName={
                    props?.iSshowToolbar ? "toolbarClassName" : "hideToolBar"
                }
                wrapperClassName="rich-text-container"
                editorClassName="rich-text-editor"
                onEditorStateChange={props?.onEditorStateChange}
                placeholder={props?.placeholder}
                name={props?.name}
                keyBindingFn={props.keyBindingFn}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "remove",
                        "history",
                    ],
                }}
            />
        </div>
    );
};

CustomRichTextEditor.propTypes = {
    onEditorStateChange: PropTypes.func,
    editorState: PropTypes.any,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    iSshowToolbar: PropTypes.bool,
    maxLength: PropTypes.number,
    keyBindingFn: PropTypes.func,
};

export default CustomRichTextEditor;
