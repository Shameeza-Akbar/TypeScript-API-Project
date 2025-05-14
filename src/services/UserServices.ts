import { User } from "../pages/home/types";

const API = "https://dummyjson.com/users";

export const fetchUsers = async () => {
    const response = await fetch(`${API}`);
    if (!response.ok) {
      console.error('Failed to fetch users');
    }
    return response.json();
  }; // FetchUsers function

  export const getUserById = async (id: string): Promise<User> => {
    const res = await fetch(`${API}/${id}`);
    return res.json();
  };

export const loginUser = async (name:FormDataEntryValue|null, pass:FormDataEntryValue|null): Promise<string> => {
  const res = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: `${name}`,
      password: `${pass}`,
    }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.accessToken);
    alert('Login Successful');
     return data.accessToken;
  } else {
    alert('Login Failed');
  }
  return data.accessToken;
}; // loginUserFunction

export const getAuthenticatedUser = async (token: string): Promise<User> => {
  const res = await fetch('https://dummyjson.com/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}; // GetAuthenticatedUser Function