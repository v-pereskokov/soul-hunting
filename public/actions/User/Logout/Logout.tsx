import React from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { dialogOpen, dialogMessage } from './dialogMessage';

export const auth = (value) => {
  return {
    type: 'IS_AUTH',
    value
  };
};

export const addErrorSignup = (error) => {
  return {
    type: 'ADD_ERROR_SIGNUP',
    error
  }
};

export const addErrorSignin = (error) => {
  return {
    type: 'ADD_ERROR_SIGNIN',
    error
  }
};

export const login = (user) => {
  return {
    type: 'LOGIN',
    user
  }
};

export const resetUser = () => {
  return {
    type: 'RESET_AUTH',
  }
};

export const signout = () => {
  return {
    type: 'SIGNOUT',
  }
};

export const signoutUser = () => {
  return (dispatch) => {
    fetch('/api/logout', {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then(response => {return response.json()})
      .then(data => {
        if (data === true) {
          dispatch(signout());
          dispatch(resetUser());
        }
      });
  };
};

const getMessage = (message, user) => (
  <div className="dialogMessage">
    {message}
    <em className="dialogMessage__name"> {user}</em>
  </div>
);

export const addUsers = (formData, url, where, message) => {
  return (dispatch) => {

    if (formData.password1 !== undefined) {
      formData.password = formData.password1;
      delete formData.password1;
      delete formData.password2;
    }

    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {return response.json()})
      .then(data => {
        if (data.code !== undefined) {
          if (where === "SIGNUP") {
            dispatch(addErrorSignup(data.reason));
          }
          else if (where === "SIGNIN") {
            dispatch(addErrorSignin(data.reason));
          }
          return;
        }
        localStorage.setItem("user", JSON.stringify(data));

        if (where === "SIGNUP") {
          const element = getMessage(message, "");
          dispatch(dialogMessage(element));
        }
        else if (where === "SIGNIN") {
          const element = getMessage(message, data.login);
          dispatch(dialogMessage(element));
        }

        dispatch(login(data));
        dispatch(auth(true));
        browserHistory.push('/');
        dispatch(dialogOpen());
      });
  };
};
