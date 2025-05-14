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

  export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  };

  export const filterUsers = async (key: string, value: string): Promise<User[]> => {
    const res = await fetch(`${API}/filter?key=${key}&value=${value}`);
    const data = await res.json();
    return data.users;
  };

  export const searchUsers = async (query: string): Promise<User[]> => {
    const res = await fetch(`${API}/search?q=${query}`);
    const data = await res.json();
    return data.users;
  };

  export const getAllUsers = async (): Promise<User[]> => {
    const res = await fetch(API);
    const data = await res.json();
    return data.users;
  };

  export const deleteUser = async (id: string): Promise<void> => {
    await fetch(`${API}/${id}`, {
      method: 'DELETE',
    });
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
};

export const getAuthenticatedUser = async (token: string): Promise<User> => {
  const res = await fetch('https://dummyjson.com/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}; 

export const addUser = async (userData: Partial<User>): Promise<User> => {
  const res = await fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};