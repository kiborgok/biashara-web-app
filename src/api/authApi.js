const BASE_URL = "https://biashara-api.herokuapp.com";

export async function signUp(user) {
  try {
    const response = await fetch(BASE_URL + "/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(user) {
  try {
    const response = await fetch(BASE_URL + "/api/v1/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile({
  first_name,
  last_name,
  user_id,
  photo_url,
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/${user_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        photo_url,
      }),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
}
