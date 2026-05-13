import { globalData } from "../api";
const URL = globalData.apiUrl
const token = globalData.apiToken

export async function findAll() {
  try {
    const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(),
      }
    );

    const status = await response.json();
    return status;
  } catch (err) {
    console.log(err);
  }
}

export async function findActive() {
  try {
    const response = await fetch(`${URL}/user?status=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(),
      }
    );

    const status = await response.json();
    return status;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(data) {
  try {
    const response = await fetch(`${URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          desc: data.desc,
          status: data.status,
        }),
      }
    );

    const status = await response.json();
    return status;
  } catch (err) {
    console.log(err);
  }
}

// LOGIN
export async function loginUser(password) {
  try {
    const res = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "admin@vep.pt",
        password: password
       }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// REGISTER
export async function addUser(data) {
  try {
    const response = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        }),
      }
    );

    const status = await response.json();
    return status;
  } catch (err) {
    console.log(err);
  }
}