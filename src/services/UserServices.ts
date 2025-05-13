import { User } from "../pages/home/types";

const API = "https://dummyjson.com";

// This function fetches the list of users from the dummyjson API
export const fetchUsers = async (url:string) => {
    const response = await fetch(`${API}${url}`);
  
    // Check if the response was successful
    if (!response.ok) {
      // If not, throw an error to be caught by the caller
      console.error('Failed to fetch users');
    }
    // Convert the response to JSON and return it
    return response.json();
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