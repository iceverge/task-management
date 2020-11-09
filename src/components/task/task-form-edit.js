import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { put, del } from '../../services/request';
import { taskForm, taskDelete, taskUpdate } from '../../store/actions';

const TaskFormEdit = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const { users: { users }, task: { task } } = useSelector(state => state.api);
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [timeInSeconds, setTimeInSeconds] = useState();
  const [date, setDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [assignUser, setAssignUser] = useState("");

  function setSelectedDate(time) {
    setDate(time)
    setFormattedDate(moment(time).format('YYYY-MM-DD'));
  }

  function setSelectedTime(time) {
    setTime(time)
    const selectedTime = moment(time, 'HH:mm A').diff(moment().startOf('day'), 'seconds');
    setTimeInSeconds(selectedTime);
  }

  function handleChange(event) {
    setDesc(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const data = {
      assigned_user: assignUser.value,
      task_date: formattedDate ? formattedDate : task.taskDate,
      task_time: timeInSeconds ? timeInSeconds : task.taskTime,
      task_msg: desc ? desc : task.taskMsg,
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      put(`/task/lead_59a79b6cb211449f9698bad058a593e4/${task.id}`, data)
        .then(res => {
          if (res.code === 202) {
            dispatch(taskUpdate({ task: res.results }))
            dispatch(taskForm({ name: 'taskFormAddShow', value: false }));
          }
        });
    }

    setValidated(true);
  }

  const cancelTask = () => {
    dispatch(taskForm({ name: 'taskFormEditShow', value: false }));
  }

  const handleDelete = () => {
    del(`/task/lead_59a79b6cb211449f9698bad058a593e4/${task.id}`)
      .then(res => {
        if (res.code === 204) {
          dispatch(taskDelete({ taskId: task.id }));
          dispatch(taskForm({ name: 'taskFormAddShow', value: false }));
        }
      })
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          required
          // ref={text => setDesc(text)}
          value={desc ? desc : task.taskMsg}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              as={DatePicker}
              required
              selected={date ? date : new Date(task.taskDate)}
              onChange={date => setSelectedDate(date)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              required
              as={DatePicker}
              selected={time ? time : new Date(moment().startOf('day').seconds(task.taskTime))}
              onChange={date => setSelectedTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group>
        <Form.Label>Assign User</Form.Label>
        <Form.Control
          name="assign_user"
          as="select"
          defaultValue={task.userId}
          required
          ref={text => setAssignUser(text)}
          id="assign">
          {
            users ? users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            )) : null
          }
        </Form.Control>
      </Form.Group>
      <div className="flex">
        <Button variant="light" size="sm" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
        <Button size="sm" className="pull-right mr-4" variant="link" onClick={cancelTask}>Cancel</Button>
        <Button type="submit" size="sm">Save</Button>
      </div>
    </Form>
  )
}

export default TaskFormEdit;
