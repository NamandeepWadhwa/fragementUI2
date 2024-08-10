// src/api.js



// fragments microservice API to use, defaults to localhost:8080 if not set in env
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";


/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user,expand=false) {
  let url;
  if(expand){
    url=`${apiUrl}/v1/fragments?expand=1`;
  }
  else{
    url=`${apiUrl}/v1/fragments`;
  }
  try {
    const res = await fetch(url, {
      // Generate headers with the proper Authorization bearer token to pass.
      // We are using the `authorizationHeaders()` helper method we defined
      // earlier, to automatically attach the user's ID token.
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Successfully got user fragments data', { data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}
export async function postUserFragments(user,contentType, data) {

 
console.log(contentType);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: 'POST',
      headers:{
        
        ...user.authorizationHeaders(contentType),
      },
      
      body:  data,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const responseData = await res.json();
    const locationHeader = res.headers.get('location');
    if(res.status==415){
     throw new Error('Unsupported media type');
    }
    
  
    return responseData;
  } catch (err) {
    throw new Error('Unable to call POST /v1/fragment', { err });
    
  }

}
export async function getFragmentById(user, id) {
  console.log(id);

  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

 

    // Get the Content-Type header
    const contentType = res.headers.get("Content-Type");
    let data;
    

    // Handle response based on Content-Type
    if (contentType && contentType.includes("application/")) {
      // Handle JSON responses
      data = await res.json();
     
      return data;
    } else if (contentType && contentType.includes("text/")) {
      // Handle plain text responses
      data = await res.text();
      return data;
    } 
  
     data = await res.blob();
    console.log("Successfully got user fragments data:", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment:", { err });
  }
}
export async function getFragmentInfo(user,id){
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`,{
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}
export async function getdifferentType(user,location,ext){
  const imageAllowed=[ 'png','jpeg','gif','webp','avif'];
  try {
    console.log(ext,location);
    const res = await fetch(`${apiUrl}/v1/fragments/${location}.${ext}`,{
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    if(imageAllowed.includes(ext)){
      const data = await res.blob();
      return data;
    }
    const data = await res.text();
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}
export async function deleteFragment(user, id) {
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: 'DELETE',
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return true;
  } catch (err) {
    console.error('Unable to call DELETE /v1/fragment', { err });
  }
}
export async function updateFragment(user, contentType, id, data) {

  console.log(contentType);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "PUT",
      headers: {
       ...user.authorizationHeaders(contentType)//Ensure correct Content-Type is set
      },
      body: data, // data should be a Blob or binary data
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return true;
  } catch (err) {
    if (err.message.includes("400")) {
      alert("Cannot change the type of the fragment");
    }
    console.error("Unable to call PUT /v1/fragment", { err });
  }
}

