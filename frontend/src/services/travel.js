import { globalData } from "../api";
const URL = globalData.apiUrl
const token = globalData.apiToken

export async function addTrip(data) {
  try {
    const response = await fetch(`${URL}/travel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: data.title,
        location: data.location,
        description: data.description,
        photos: data.photos,
        isPublished: data.isPublished ?? false,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

export async function getTrips() {
  try {
    const response = await fetch(`${URL}/travel`);
    const res = await response.json();
    return res
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

export async function getTrip(id) {
  try {
    const response = await fetch(`${URL}/travel/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
  }
}

export async function updateTrip(id, data) {
  try {
    const response = await fetch(`${URL}/travel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: data.title,
        location: data.location,
        description: data.description,
        photos: data.photos,
        isPublished: data.isPublished,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

export async function deleteTrip(id) {
  try {
    const response = await fetch(`${URL}/travel/${id}`, {
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
