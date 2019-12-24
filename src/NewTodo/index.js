import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { pushData } from '../redux/actions/add'
import moment from 'moment';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import TextEditor from '../Common/TextEditor'
import { EditorState } from 'draft-js';
let searchTimeout = null;

function ToDo() {

  const counter = useSelector(state => state.add);
  const { todos = [] } = counter
  const dispatch = useDispatch()
  const [active, setActive] = useState(null)
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [data, setData] = useState();
  const [editable, setEditable] = useState(false);

  function saveEditorContent(editorState) {
    const HTMLdata = stateToHTML(editorState.getCurrentContent());
    setData({
      ...data,
      description: HTMLdata
    })
    // const rowData = stateFromHTML(data);
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

  function titleChange(e) {
    const { name, value } = e.target;

    const updatedData = {
      ...data,
      [name]: value,
    }
    setData(updatedData);
  }

  function addTodo() {
    if(data && data.id) {
      alert("A todo is already being edited");
      return
    }
    const todo = {
      id: moment().valueOf(),
      created: moment().valueOf(),
      updated: null,
      title: '',
      description: ''
    }
    setData(todo);
    setEditable(true)
    // dispatch(createTodo(todo))

  }

  function onSave() {
    if (data && !data.id) {
      // dispatch(createTodo());
    } else {
      // dispatch(updateTodo());
    }
    // setData({});
    setEditable(false)
  }

  function onCancel() {
    setEditable(false)
  }

  function onEdit() {
    setEditable(true)
  }



  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={12} sm={4} md={3} lg={3}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className="py-3 d-flex">
                  <Form.Control
                    name="search"
                    placeholder="Search..."
                    className="mr-2"
                    size="sm"
                  />
                  <Button variant="outline-primary" size="sm" onClick={addTodo}>Add</Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="list-group">
                    {
                      todos.map((item, index) => <TodoItem
                        isActive={index == active}
                        setActive={setActive}
                        index={index}
                        key={index}
                        item={item}
                      />
                      )
                    }
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={8} md={9} lg={9}>
              {data && data.id ? <Row>
                <Col xs={12} sm={12} md={12} lg={12} className="py-3 d-flex">
                  <Form.Control
                    name="todo-title"
                    placeholder="Title..."
                    className="mr-2"
                    onChange={e => titleChange(e)}
                    name="title"
                    required
                    size="sm"
                    disabled={!editable}
                    onDoubleClick={console.log}
                  />
                  {editable ? <Button className="mr-2" variant="outline-success" size="sm" onClick={onSave}>Save</Button>
                  : <Button className="mr-2" variant="outline-success" size="sm" onClick={onEdit}>Edit</Button>}
                  {editable ? <Button variant="outline-danger" size="sm" onClick={onCancel}>Cancel</Button> : ''}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextEditor
                    onChange={onChange}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                </Col>
              </Row> : <div className="text-center p-5 m-5">
                  No Todo found!
              </div>}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ToDo;

function TodoItem({ isActive, setActive, index, item, }) {
  const active = isActive ? 'list-group-item-primary' : '';
  return (
    <div className={`list-group-item list-group-item-action todo-item p-2` + ' ' + active} onClick={() => setActive(index)}>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="title">
          <h5>{item.title}</h5>
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