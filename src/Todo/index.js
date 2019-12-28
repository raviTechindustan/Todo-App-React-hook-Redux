import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Form ,Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { createTodo, updateTodo, deleteTodo, userLogout } from '../redux/actions'
import moment from 'moment';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import TextEditor from '../Common/TextEditor'
import { EditorState } from 'draft-js';
import { useHistory} from 'react-router';
import { logout, initialize } from '../Auth/actions';
import { toast } from 'react-toastify';
import {DropdownButton, Dropdown } from 'react-bootstrap';

function getTodoToDisplay({ search = '' }) {
  return state => {
    const todos = state.todoReducer.todos || [];
    let reversedTodos = todos.sort(compare);
    reversedTodos = search && typeof search === 'string' && reversedTodos && reversedTodos.length ? reversedTodos.filter(item => item.title.toUpperCase().includes(search.toUpperCase())) : reversedTodos;
    return {
      todos,
      reversedTodos,
    }
  }
}


function compare(a, b) {
  let comparison = 0;
  if (a.id < b.id) {
    comparison = 1;
  } else if (a.id > b.id) {
    comparison = -1;
  }
  return comparison;
}


function ToDo() {
  const dispatch = useDispatch()
  const history  = useHistory();
  const [active, setActive] = useState(null)
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [editable, setEditable] = useState(false);
  const [todo, setTodo] = useState({});
  const [show, setShowAlreadyEdited] = useState(false);
  const [search, setsearch] = useState('');
  const { todos, reversedTodos,} = useSelector(getTodoToDisplay(search));
 
  const handleClose = () => setShowAlreadyEdited(false);
  let textInput = React.useRef();

  function saveEditorContent(editorState) {    
    setTodo({
      ...todo,
      description: editorState
    })
  }

  useEffect(() => {
    dispatch(initialize());
  }, [])

  function onChange(editorState) {
    setEditorState(editorState);

    const HTMLdata = stateToHTML(editorState.getCurrentContent());
    saveEditorContent(HTMLdata)
  }

  function debounce(func, delay, intervalId) {
    if (intervalId) {
      clearTimeout(intervalId)
    }
    return setTimeout(func, delay);
  }

  function titleChange(e) {
    const { name, value } = e.target;

    const updatedTodo = {
      ...todo,
      [name]: value,
    }
    setTodo(updatedTodo);
  }

  function onDelete(id) {
    dispatch(deleteTodo(id))
  }

  function addTodo() {
     if (editable) {
       setShowAlreadyEdited(true);
       return
    }
    const newTodo = {
      id: moment().valueOf(),
      created: moment().valueOf(),
      updated: null,
      title: '',
      description: '',
      isNotSaved: true
    }
    setTodo(newTodo);
    setEditorState(EditorState.createEmpty())
    setEditable(true);
    setTimeout(() => {
      textInput.current.focus();
    }, 0)
  }

  function onSave() {
    if(todo && !todo.title) {
      toast.error("PLEASE ENTER TITLE", {
        position: toast.POSITION.TOP_CENTER
      });
      return
    }
    if (todo && !!todo.isNotSaved) {
      const { isNotSaved, ...restTodo } = todo;
      setActive(todo.id);
      setTodo(restTodo)
      dispatch(createTodo(restTodo));
    } else {
      dispatch(updateTodo(todo));
    }
    setEditable(false)
  }

  function onCancel() {
    setEditable(false)
  }

  function onEdit() {
    setEditable(true)
  }

  function onSelectTodo(todoId) {
    if (todoId == active) {
      return
    }
    setActive(todoId);
    const selectedtodo = todos.find(todo => todo.id == todoId) || {};
    setTodo(selectedtodo);
    const rowData = stateFromHTML(selectedtodo.description);
    const editorState = EditorState.createWithContent(rowData)
    setEditorState(editorState);
  }

  function onSearchChange(e) {
    const {name , value } = e.target
    setsearch({
      ...search,
      [name]:value
    })
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
                    onChange={(e)=>onSearchChange(e)}
                  />
                  <Button variant="outline-primary" size="sm" onClick={addTodo} >Add</Button>
                  {show ? <div>
                  

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b><p>A TODO IS ALREAY BEING EDITED</p></b></Modal.Title>
                    </Modal.Header>
                   
                    <Modal.Footer>
                        <Button variant="outline-danger" size="sm"  onClick={handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                  </Modal> </div> : null }
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="list-group">
                    {
                      reversedTodos.map((todo, index) => <TodoItem
                        isActive={todo.id == active}
                        onSelectTodo={onSelectTodo}
                        index={index}
                        key={index}
                        onDelete={onDelete}
                        todo={todo}
                      />
                      )
                    }
                  </div>
                </Col>
                <div className="sticky-footer-left">
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <UserProfile />
                  </Col>
                </div>
              </Row>
            </Col>
            
            <Col xs={12} sm={8} md={9} lg={9}>
              {todo && todo.id ? <Row>
                <Col xs={12} sm={12} md={12} lg={12} className="py-3 d-flex">
                  <Form.Control
                    name="todo-title"
                    placeholder="Title..."
                    className="mr-2"
                    onChange={e => titleChange(e)}
                    name="title"
                    size="sm"
                    value={todo.title}
                    disabled={!editable}
                    ref={textInput}
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
                    readOnly={!editable}
                  />
                </Col>
              </Row> : <div className="text-center p-5 m-5">
                  No Todo found!
              </div>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ToDo;

function TodoItem({ isActive, onSelectTodo, todo, onDelete }) {
  
  const active = isActive ? 'list-group-item-primary' : '';
 return (
   <div className={`list-group-item list-group-item-action todo-item p-2` + ' ' + active} onClick={() => onSelectTodo(todo.id)}>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="title">
          <h5>{renderText(todo.title)}</h5>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className="sub-title d-flex justify-content-between">
              <span>{moment(todo.created).format('DD MMM, YYYY')} {moment(todo.created).format('HH:mm a')}</span>
             <a className="p-0 px-1" href="#" onClick={(e) => { e.stopPropagation(); onDelete(todo.id) }}><i className="fa fa-trash" aria-hidden="true"></i></a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

function renderText(text, length = 30) {
  if(text.length > length) {
    return text.substring(0, 30) + '...';
  }
  return text
}

function UserProfile() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  function Logout() {
    dispatch(logout());
    toast.success("Logged out successfully!")
    history.push('/')
  }
  
  return (
    <div className="pb-3">
      <DropdownButton
        drop="up"
        variant="success"
        title={user && user.email && user.email[0].toUpperCase() || 'U'}
        id={`dropdown-button-drop-up`}
        size="sm"
      >
        <Dropdown.Item>{user.email}</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={Logout}>logout</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}
