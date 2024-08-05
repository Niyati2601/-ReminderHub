import React, { useEffect, useState, useCallback } from "react";
import ReminderCards from "../Reminder/ReminderCards";
import { toast } from 'react-hot-toast';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  API_BASE_URL,
  DELETE_REMINDER_ENDPOINT,
  EDIT_REMINDER_ENDPOINT,
  GET_REMINDER_ENDPOINT,
  addReminderUrl,
} from "../../utils/Constants";
import { MESSAGES, ERROR_MESSAGES } from "../../utils/Constants";

let id = localStorage.getItem("id");
const Reminder = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
    date: null,
  });

  const [reminders, setReminders] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleDateChange = (date) => {
    setInputs({ ...inputs, date });
  };

  const handleSubmit = useCallback(async () => {
    if (inputs.title.trim() === "" || inputs.body.trim() === "") {
      toast.error(ERROR_MESSAGES.EMPTY_TITLE_DESCRIPTION);
    } else {
      if (editingIndex !== null) {
        const updatedReminders = [...reminders];
        updatedReminders[editingIndex] = inputs;
        setReminders(updatedReminders);
        setEditingIndex(null);
        toast.success(MESSAGES.REMINDER_UPDATED);
        try {
          const reminderToEdit = reminders[editingIndex];
          await axios.put(
            `${API_BASE_URL}${EDIT_REMINDER_ENDPOINT}/${reminderToEdit._id}`,
            inputs
          );
        } catch (error) {
          toast.error(ERROR_MESSAGES.ERROR_UPDATING_REMINDER);
        }
      } else {
        setReminders([...reminders, inputs]);
        toast.success(MESSAGES.REMINDER_ADDED);
        try {
          await axios.post(addReminderUrl, {
            title: inputs.title,
            body: inputs.body,
            date: inputs.date,
            id: id,
          });
        } catch (error) {
          toast.error(ERROR_MESSAGES.ERROR_ADDING_REMINDER);
        }
      }

      setInputs({ title: "", body: "", date: "" });
    }
  }, [inputs, reminders, editingIndex]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    const reminderToEdit = reminders[index];
    setInputs({
      title: reminderToEdit.title,
      body: reminderToEdit.body,
      date: new Date(reminderToEdit.date),
    });
  };

  const handleDelete = async (Cardid) => {
    try {
      if (id) {
        await axios.delete(
          `${API_BASE_URL}${DELETE_REMINDER_ENDPOINT}/${Cardid}`,
          { data: { id: id } }
        );
        setReminders(reminders.filter((reminder) => reminder._id !== Cardid));
        toast.success(MESSAGES.REMINDER_DELETED);
      } else {
        toast.error(ERROR_MESSAGES.PLEASE_REGISTER);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR_DELETING_REMINDER);
    }
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}${GET_REMINDER_ENDPOINT}/${id}`
        );
        if (Array.isArray(response.data.list)) {
          setReminders(response.data.list);
        }
      } catch (error) {
        // toast.error(ERROR_MESSAGES.ERROR_FETCHING_REMINDERS);
      }
    };

    if (id) {
      fetchReminders();
    }
  }, []);

  useEffect(() => {
    const scheduleNotifications = () => {
      const currentDate = new Date().toLocaleDateString();
      const reminderDate = new Date(inputs.date).toLocaleDateString();
      if (currentDate === reminderDate) {
        // toast.success(`Reminder: ${inputs.title}`);
      }
    };
    scheduleNotifications();
  }, [inputs.date, inputs.title]);

  return (
    <div className="reminders" style={{ backgroundColor: "#fff" }}>
      <section className="vh-100">
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-20 col-xl-7 w-100">
              <div className="card rounded-0 shadow-lg">
                <div className="card-body p-15">
                  <h4
                    className="text-center my-3 pb-3"
                    style={{ color: "#023047" }}
                  >
                    Reminder App
                  </h4>

                  <div className="row row-cols-lg-auto justify-content-center align-items-center mb-4 pb-2">
                    <div className="col-12 w-100">
                      <div className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="title"
                                name="title"
                                placeholder="Reminder Title"
                                value={inputs.title}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-4">
                              <DatePicker
                                selected={inputs.date}
                                dateFormat="dd/MM/yyyy hh:mm aa"
                                onChange={handleDateChange}
                                placeholderText="Select date"
                                minDate={new Date()}
                                className="form-control rounded-0"
                                showTimeInput
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <textarea
                            type="text"
                            className="form-control mt-2 rounded-0"
                            rows="3"
                            id="body"
                            name="body"
                            placeholder="Reminder Description"
                            value={inputs.body}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12">
                          <button
                            type="button"
                            className="btn-custom"
                            onClick={handleSubmit}
                          >
                            {editingIndex !== null ? "Save" : "+ Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <ReminderCards
              reminders={reminders}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reminder;
