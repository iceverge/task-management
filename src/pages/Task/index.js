import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Card, Media, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faBell, faTrash } from '@fortawesome/free-solid-svg-icons';
import TaskFormAdd from '../../components/task/task-form-add';
import TaskFormEdit from '../../components/task/task-form-edit';
import { taskForm, taskSelected, taskDelete } from '../../store/actions';
import { del } from '../../services/request';

const Home = () => {
  const dispatch = useDispatch();
  const { api, ui } = useSelector(state => state);
  const { taskFormAddShow, taskFormEditShow } = ui.taskForm;
  const { tasks } = api.tasks;

  const addTask = () => {
    dispatch(taskForm({ name: 'taskFormAddShow', value: true }));
  }

  const editTask = (task) => {
    dispatch(taskSelected({ task }));
    dispatch(taskForm({ name: 'taskFormEditShow', value: true }));
  }

  const handleDelete = (task) => {
    del(`/task/lead_59a79b6cb211449f9698bad058a593e4/${task.id}`)
      .then(res => {
        if (res.code === 204) {
          dispatch(taskDelete({ taskId: task.id }));
        }
      })
  }

  return (
    <Row>
      <div className="task-wrapper">
        <Card>
          <Card.Header as="div" className="card-header">
            TASKS
              <Button variant="primary" className="pull-right" onClick={addTask}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Card.Header>
          <Card.Body>
            {taskFormAddShow && <TaskFormAdd />}
            {taskFormEditShow && <TaskFormEdit />}
            <br />
            {tasks ? tasks.map(task => (
              <Media className="media-style" key={task.id}>
                <img
                  width={64}
                  height={64}
                  className="align-self-start mr-3"
                  src={task.userIcon}
                  alt={task.userName}
                />
                <Media.Body>
                  <Card.Text as="div">{task.taskMsg}</Card.Text>
                  <Card.Text as="div" className="task-date">{task.taskDate}</Card.Text>
                </Media.Body>
                <div className="task-action">
                  <ButtonGroup size="sm" variant="primary">
                    <Button variant="light" onClick={() => editTask(task)}><FontAwesomeIcon icon={faPencilAlt} /></Button>
                    <Button variant="light"><FontAwesomeIcon icon={faBell} /></Button>
                    <Button variant="light" onClick={() => handleDelete(task)}><FontAwesomeIcon icon={faTrash} /></Button>
                  </ButtonGroup>
                </div>
              </Media>
            )) : <Card.Text as="div">No available task</Card.Text>}
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
}

export default Home;
