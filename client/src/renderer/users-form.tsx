import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

const apiUrl = window['env']?.API_URL;
const token = window['env']?.JWT_TOKEN;

type TINIT_STATE = {
  name: string;
  email: string;
  phone: string;
};
const INIT_STATE = {
  name: '',
  email: '',
  phone: '',
};
export function UserForm() {
  const [state, setState] = React.useState<TINIT_STATE>(INIT_STATE);

  const setFormState = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(apiUrl + '/add-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(state),
    });

    if (!response.ok) {
      console.error('Error has occurred');
    }

    setState(INIT_STATE);
  };

  return (
    <div>
      <NavLink to={'/'}>
        <button
          style={{
            marginBottom: 16,
          }}
        >
          Return to list
        </button>
      </NavLink>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 100,
        }}
        onSubmit={handleSubmit}
      >
        <div>
          Name:{' '}
          <input
            name={'name'}
            value={state.name}
            onChange={setFormState}
            required
            type="text"
          />
        </div>
        <div>
          Email:{' '}
          <input
            name={'email'}
            value={state.email}
            onChange={setFormState}
            required
            type="email"
          />
        </div>
        <div>
          Phone:{' '}
          <input
            name={'phone'}
            value={state.phone}
            onChange={setFormState}
            required
            type="text"
          />
        </div>

        <button
          style={{
            marginTop: 16,
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
