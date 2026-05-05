export async function findAll() {
  try {
    const response = await fetch(
      `${process.env.SERVER}/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );

    const status = await response.json();
    return status;
  } catch (e) {
    console.log(e);
  }
}

export async function findActive() {
  try {
    const response = await fetch(
      `${process.env.SERVER}/user?status=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      }
    );

    const status = await response.json();
    return status;
  } catch (e) {
    console.log(e);
  }
}

export async function addUser(data) {
  try {
    const response = await fetch(
      `${process.env.SERVER}/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          desc: data.desc || "",
          status: Boolean(data.status) || false,
        }),
      }
    );

    const status = await response.json();
    return status;
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(data) {
  try {
    const response = await fetch(
      `${process.env.SERVER}/user`,
      {
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
  } catch (e) {
    console.log(e);
  }
}
