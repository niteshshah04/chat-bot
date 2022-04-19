// Import types
import {
  INPUT_SUCCESS,
  INPUT_FAIL,
  SESSION_SUCCESS,
  SESSION_FAIL,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
} from "./types";

//  Import axios
import axios from "axios";

//  Function that handles  users message
export const userMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: INPUT_SUCCESS, payload: message });
  } catch (err) {
    dispatch({ type: INPUT_FAIL });
  }
};

//  Creates a session - API CALL
export const createSession = () => async (dispatch) => {
  try {
    // const res = await axios.get("/api");
    const res = 1234567890;
    dispatch({ type: SESSION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SESSION_FAIL });
  }
};

//  Sends the message to the bot - API CALL
export const sendMessage = (message) => async (dispatch) => {
  try {
    const body = {
      message: message,
    };
    let res = "";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
      },
    };
    const response = await axios.post(
      "https://afq2nfdfdj.us-east-1.awsapprunner.com/webhooks/rest/webhook",
      body
    );
    res = response.data[0].text;
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};
