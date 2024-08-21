import React from 'react';
import './App.css';
import { IServerError, IUser } from '../models';
import { NavLink } from 'react-router-dom';

const apiUrl = window['env']?.API_URL;
const token = window['env']?.JWT_TOKEN;

type TINIT_STATE = {
  data: null | IUser[];
  isLoading: boolean;
  isError: boolean;
  error: null | IServerError;
};
const INIT_STATE = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
};

export function UsersList() {
  const [state, setState] = React.useState<TINIT_STATE>(INIT_STATE);

  React.useEffect(() => {
    (async () => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await fetch(apiUrl + '/get-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();

        setState((prevState) => ({
          ...prevState,

          isLoading: false,

          isError: true,
          error: error,
        }));

        return;
      }

      const users = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: users,
        isLoading: false,
      }));
    })();
  }, []);

  if (state.isLoading) {
    return <div>Loading....</div>;
  }

  if (state.isError) {
    return <div> Error: {state.error?.message || 'Error has occurred'}</div>;
  }

  if (!state.data?.length && !state.isLoading && !state.isError) {
    return (
      <div>
        <NavLink to={'/form'}>
          <button>Add user</button>
        </NavLink>
        <div>There is no users</div>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {!!state.data?.length &&
          state.data?.map((item) => {
            return (
              <li
                key={`${item.name}_${item.email}`}
                style={{
                  paddingBottom: 16,
                }}
              >
                <div>Name: {`${item.name}`}</div>
                <div>Phone: {`${item.phone}`}</div>
                <div>Email: {`${item.email}`}</div>
              </li>
            );
          })}
      </ul>

      <NavLink to={'/form'}>
        <button>Add user</button>
      </NavLink>
    </div>
  );
}
