import React from 'react';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import {
  Editor,
  EditorState,
} from 'draft-js';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

function TextEditor({ onChange, editorState, setEditorState }) {
  const staticToolbarPlugin = createToolbarPlugin();
  const { Toolbar } = staticToolbarPlugin;
  const plugins = [staticToolbarPlugin];
  return (
    <>
      <Toolbar>
        {
          (props) => {
            const externalProps = {
              ...props,
              getEditorState: () => editorState,
              setEditorState: (state) => onChange(state)
            }
            return (
              <div className="toolbar-btn">
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>
            )
          }
        }
      </Toolbar>
      <Editor
        placeholder="Write here..."
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
      />
    </>
  )
}

export default TextEditor;