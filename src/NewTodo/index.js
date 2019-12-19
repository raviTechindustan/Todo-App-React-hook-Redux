import React, { useState } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createEditorStateWithText } from 'draft-js-plugins-editor';
import { throttle, debounce } from 'throttle-debounce';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding, KeyBindingUtil
} from 'draft-js';


let searchTimeout = null;

function ToDo() {

  const staticToolbarPlugin = createToolbarPlugin();
  const { Toolbar } = staticToolbarPlugin;
  const plugins = [staticToolbarPlugin];
  const [active, setActive] = useState(null)
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const [data, setData] = useState('<p></p>');
  const { hasCommandModifier } = KeyBindingUtil;
  function saveEditorContent(editorState) {
    const data = stateToHTML(editorState.getCurrentContent());
    const rowData = stateFromHTML(data);
    console.log(data, 'data', rowData, 'rowData');
    setData(data);
  }

  function onChange(editorState) {
    setEditorState(editorState);
    searchTimeout = debounce(() => saveEditorContent(editorState), 1000, searchTimeout);
  }

  function debounce(func, delay, intervalId) {
    if (intervalId) {
      clearTimeout(intervalId)
    }
    return setTimeout(func, delay);
  }
   function keyBindingFn(event){
    // we press CTRL + K => return 'bbbold'
    // we use hasCommandModifier instead of checking for CTRL keyCode because different OSs have different command keys
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) { return 'bbbold'; }
    // manages usual things, like:
    // Ctrl+Z => return 'undo'
    return getDefaultKeyBinding(event);
  }
  const raw = convertToRaw(editorState.getCurrentContent());
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={12} sm={4} md={3} lg={3} className="py-3 d-flex">
              <Form.Control
                name="search"
                placeholder="Search..."
                className="mr-2"
              />
              <Button variant="outline-primary">Add</Button>
            </Col>
            <Col xs={12} sm={8} md={9} lg={9} className="py-3 d-flex">
              <Form.Control
                name="todo-title"
                placeholder="Title..."
                className="mr-2"
              />
              <Button className="mr-2" variant="outline-success">Save</Button>
              <Button variant="outline-danger">Cancel</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={4} md={3} lg={3}>
              <div className="list-group">
                {
                  [...Array(5)].map((item, index) => <TodoItem isActive={index == active} setActive={setActive} index={index} key={index} />)
                }
              </div>
            </Col>
            <Col xs={12} sm={8} md={9} lg={9}>
              
              <Toolbar>
                {
                  // may be use React.Fragment instead of div to improve perfomance after React 16
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
                keyBindingFn={(event) => keyBindingFn(event)}
              />
            </Col>
            <Col xs={12} sm={8} md={9} lg={9}>
              <div dangerouslySetInnerHTML={{ __html: data }}></div>

            </Col>
          </Row>
        </Col>
      </Row>
      {/* <p>{text}</p> */}
    </Container>
  )
}

export default ToDo;


function TodoItem({ isActive, setActive, index }) {
  const active = isActive ? 'list-group-item-primary' : '';
  return (
    <div className={`list-group-item list-group-item-action todo-item p-2` + ' ' + active} onClick={() => setActive(index)}>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="title">
          <h5>Title Will be here</h5>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className="sub-title d-flex justify-content-between">
              <span>Date & Time will be here...</span>
              <a href="#" onClick={e => e.preventDefault()}><i className="fa fa-trash" aria-hidden="true"></i></a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}