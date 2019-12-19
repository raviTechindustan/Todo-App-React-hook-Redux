import React, { useState } from 'react'
import { Row, Col, Container, Form, Button, ListGroup, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { throttle, debounce } from 'throttle-debounce';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

let searchTimeout = null;

function Todo() {
  const [key, setKey] = useState(false)

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  function saveEditorContent(editorState) {
    const raw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem('editorData', JSON.stringify(raw));
  }

  function onChange(editorState) {
    setEditorState(editorState);
    searchTimeout = debounce(() => saveEditorContent(editorState), 500, searchTimeout);
  }

  function debounce(func, delay, intervalId) {
    if (intervalId) {
      clearTimeout(intervalId)
    }
    return setTimeout(func, delay);
  }

  function onBoldClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))

  }
  function onUnderlineClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }
  function onItalicClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }
  function onStrikeClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
  }
  function onSetKey() {
    setKey(true)
    console.log(key, "key")
  }
  var value = [
    {
      id: onBoldClick, name: "B"
    },
    {
      id: onUnderlineClick, name: "U"
    },
    {
      id: onItalicClick, name: "I"
    },
    {
      id: onStrikeClick, name: "Strike"
    },
  ]
  const raw = convertToRaw(editorState.getCurrentContent());
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={2} lg={2}>
            <div className="first-side">
              <Button variant="info" className="functionbtn" style={{ float: "right" }}>Add+</Button><br /><br />
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
              <hr style={{ color: "black" }}></hr>
            </div>
          </Col>
          <Col xs={12} sm={6} md={10} lg={10} style={{ Color: "black" }}>
            <div className="second-side">
              {
                value.map(val => {
                  return <div key={val.id}><button className="btncls" onClick={val.id}>{val.name}</button></div>
                })
              }
              <div style={{ float: "right", display: "inline-block" }}>

              </div>
              <div className="editor"><br />
                <ListGroup className="title"   >
                  <ListGroup.Item variant="primary" style={{ width: "300px", Color: "#00408582", }}>Title</ListGroup.Item>
                </ListGroup>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ float: "right" }}>
                  <ButtonGroup className="mr-2" aria-label="First group" className="btngroup">
                    <Button variant="primary" className="functionbtn">Cancel</Button>
                    <Button variant="success" className="functionbtn">Save</Button>
                    <Button variant="info" className="functionbtn">Edit</Button>
                    <Button variant="danger" className="functionbtn">Delete</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              <div style={{clear:"both"}}>
                <Editor
                  placeholder="Write here..."
                  editorState={editorState}
                  onChange={onChange}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Todo;