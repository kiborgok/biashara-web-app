const BASE_URL = "http://127.0.0.1:9292";

export async function addBusiness(business) {
  try {
    const response = await fetch(BASE_URL + '/api/v1/businesses', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(business)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function addRating({comment, rate, user_id, business_id}) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/reviews/${user_id}/${business_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({comment,rate,user_id,business_id})
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}


export async function getRatings() {
  try {
    const response = await fetch(BASE_URL + "/api/v1/reviews");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBusinesses() {
  try {
    const response = await fetch(BASE_URL + '/api/v1/businesses')
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
