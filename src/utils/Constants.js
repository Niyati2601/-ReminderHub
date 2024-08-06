export const API_BASE_URL = "http://localhost:5000/api";
export const LOGIN_ENDPOINT = "/v1/login";
export const REGISTER_ENDPOINT = "/v1/register";
export const ADD_REMINDER_ENDPOINT = "/v2/addReminder";
export const EDIT_REMINDER_ENDPOINT = "/v2/editReminder";
export const DELETE_REMINDER_ENDPOINT = "/v2/deleteReminder";
export const GET_REMINDER_ENDPOINT = "/v2/getReminders";


export const ERROR_MESSAGES = {
    EMAIL_REQUIRED: "Email is required",
    INVALID_EMAIL: "Invalid email address",
    PASSWORD_REQUIRED: "Password is required",
    SERVER_ERROR: "An error occurred. Please try again later.",
    USERNAME_REQUIRED: "Username is required",
    PASSWORD_LENGTH: "Password should be at least 8 characters",
    USER_ALREADY_EXISTS: "User already exists",
    EMPTY_TITLE_DESCRIPTION: "Title or description can't be empty",
    ERROR_UPDATING_REMINDER: "Error updating reminder",
    PLEASE_REGISTER: "Please Register..",
    ERROR_ADDING_REMINDER: "Error adding reminder",
    ERROR_DELETING_REMINDER: "Error deleting reminder",
    ERROR_FETCHING_REMINDERS: "Error fetching reminders",
};

export const MESSAGES = {
    REMINDER_ADDED: "Reminder Added!!",
    REMINDER_UPDATED: "Reminder Updated!!",
    REMINDER_DELETED: "Reminder Deleted!!",
};

export const loginUrl = `${API_BASE_URL}${LOGIN_ENDPOINT}`;
export const registerUrl = `${API_BASE_URL}${REGISTER_ENDPOINT}`;
export const addReminderUrl = `${API_BASE_URL}${ADD_REMINDER_ENDPOINT}`;

