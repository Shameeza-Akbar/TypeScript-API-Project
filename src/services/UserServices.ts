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

export const handleLogin=async (name:FormDataEntryValue|null, pass:FormDataEntryValue|null)=>{
    const res=await fetch(`${API}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: `${name}`,
        password: `${pass}`,
        expiresInMins: 60, // optional, defaults to 60
      }),
    })
    
  const data = await res.json()
  if (res.ok) {
    localStorage.setItem('token', data.accessToken);
    alert('Login Successful');
  } else {
    alert('Login Failed');
  }
}