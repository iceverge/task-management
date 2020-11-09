import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { post } from '../../services/request';
import { taskForm, task } from '../../store/actions';

const TaskFormAdd = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const { users: { users } } = useSelector(state => state.api);
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

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      assigned_user: assignUser.value,
      task_date: formattedDate,
      task_time: timeInSeconds,
      task_msg: desc.value,
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      post('/task/lead_59a79b6cb211449f9698bad058a593e4', data)
        .then(res => {
          if (res.code === 404) {
            console.log('response failed: ', res.message)
          }
          if (res.code === 201) {
            dispatch(task({ task: res.results }))
            dispatch(taskForm({ name: 'taskFormAddShow', value: false }));
          }
        });
    }

    setValidated(true);
  }

  const cancelTask = () => {
    dispatch(taskForm({ name: 'taskFormAddShow', value: false }));
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          required
          ref={text => setDesc(text)}
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
              selected={date}
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
              selected={time}
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
        <Button size="sm" className="pull-right mr-4" variant="link" onClick={cancelTask}>Cancel</Button>
        <Button type="submit" size="sm">Save</Button>
      </div>
    </Form>
  )
}

export default TaskFormAdd;
