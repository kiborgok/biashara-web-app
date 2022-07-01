const BASE_URL = "https://biashara-api.herokuapp.com";

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

export async function deleteBusiness(business_id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/businesses/${business_id}`,{
      method: "DELETE"
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
