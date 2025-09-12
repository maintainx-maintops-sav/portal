async function getMaintainXUsers(apiKey) {
  const apiUrl = 'https://api.getmaintainx.com/v1/users';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('MaintainX Users:', data);
    return data;
  } catch (error) {
    console.error('Error fetching MaintainX users:', error);
    throw error;
  }
}

// Replace 'YOUR_MAINTAINX_API_KEY' with your actual API key
const myApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjczMjg2Niwib3JnYW5pemF0aW9uSWQiOjE0MDI0NCwiaWF0IjoxNzU3NjkyODY2LCJzdWIiOiJSRVNUX0FQSV9BVVRIIiwianRpIjoiOWI5NTJlYzYtMzg1Yy00MDcyLWJlNjYtNzE1YThlOThhNDVhIn0.vLgLdD9m4JCp3sbATWcFLnmLp04WgNsf3njFuH1BSz8'; 
getMaintainXUsers(myApiKey);
