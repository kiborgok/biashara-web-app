const BASE_URL = "http://127.0.0.1:9292"

export async function addCategory(category) {
  try {
    const response = await fetch(BASE_URL + "/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: category }),
    });
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getCategories() {
  try {
    const response = await fetch(BASE_URL + "/api/v1/categories")
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}
