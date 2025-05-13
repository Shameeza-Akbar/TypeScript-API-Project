// src/services/userService.ts

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
}

const BASE_URL = 'https://dummyjson.com/users';

export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.users;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  const data = await res.json();
  return data.users;
};

export const filterUsers = async (key: string, value: string): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/filter?key=${key}&value=${value}`);
  const data = await res.json();
  return data.users;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};

export const addUser = async (userData: Partial<User>): Promise<User> => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (): Promise<string> => {
  const res = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
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
