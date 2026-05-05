import { globalData } from "../api";
const URL = globalData.apiUrl + ':' + globalData.backendPort

export async function addBook(data) {
  try {
    const response = await fetch(`${URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        author: data.author,
        category: data.category,
        rating: data.rating,
        opinion: data.opinion,
        coverImage: data.coverImage, // base64
        isPublished: data.isPublished ?? false,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

export async function getBooks() {
  try {
    const response = await fetch(`${URL}/book`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

export async function getBook(id) {
  try {
    const response = await fetch(`${URL}/book/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
  }
}

export async function updateBook(id, data) {
  try {
    const response = await fetch(`${URL}/book/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        author: data.author,
        category: data.category,
        rating: data.rating,
        opinion: data.opinion,
        coverImage: data.coverImage,
        isPublished: data.isPublished,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

export async function deleteBook(id) {
  try {
    const response = await fetch(`${URL}/book/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

export async function incrementViewCount(id) {
  try {
    const response = await fetch(
      `${URL}/book/${id}/view`,
      {
        method: "PATCH",
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error updating view count:", error);
  }
}

export async function getBooksByCategory(category) {
  try {
    const response = await fetch(
      `${URL}/book?category=${category}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error filtering books:", error);
  }
}