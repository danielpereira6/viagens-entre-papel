import { globalData } from "../api";
const URL = globalData.apiUrl
const token = globalData.apiToken

export async function addQuote(data) {
  try {
    const response = await fetch(`${URL}/love`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        author: data.author,
        quote: data.quote,
        isPublished: data.isPublished ?? false,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

export async function getQuotes() {
  try {
    const response = await fetch(`${URL}/love`);
    const res = await response.json();
    return res
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

export async function getQuote(id) {
  try {
    const response = await fetch(`${URL}/love/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
  }
}

export async function updateQuote(id, data) {
  try {
    const response = await fetch(`${URL}/love/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        author: data.author,
        quote: data.quote,
        isPublished: data.isPublished,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

export async function deleteQuote(id) {
  try {
    const response = await fetch(`${URL}/love/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}
