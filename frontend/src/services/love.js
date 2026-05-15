import { globalData } from "../api";
const URL = globalData.apiUrl
const token = globalData.apiToken

export async function addPost(data) {
  try {
    const response = await fetch(`${URL}/love`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        author: data.author,
        title: data.title,
        content: data.content,
        isPublished: data.isPublished ?? false,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding post:", error);
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${URL}/love`);
    const res = await response.json();
    return res
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getPost(id) {
  try {
    const response = await fetch(`${URL}/love/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export async function updatePost(id, data) {
  try {
    const response = await fetch(`${URL}/love/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        author: data.author,
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

export async function deletePost(id) {
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
