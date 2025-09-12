document.getElementById('fetch-button').addEventListener('click', fetchMaintainXAssets);

async function fetchMaintainXAssets() {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjczMjg2Niwib3JnYW5pemF0aW9uSWQiOjE0MDI0NCwiaWF0IjoxNzU3Njk4MTQ3LCJzdWIiOiJSRVNUX0FQSV9BVVRIIiwianRpIjoiYTUyYjBhMjMtYTM3Ni00ZDgyLWJiMzctODdhNmI2OGI5YzgzIn0.dHnzd7piXi5UnsHeJV5pJIlk4OO9cgeZaDRzg8vMtTg';
    const assetList = document.getElementById('asset-list');
    assetList.innerHTML = 'Loading assets...';

    // CORS proxy is used to make a cross-origin request from the browser
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://api.getmaintainx.com/v1/assets';
    const fullUrl = proxyUrl + encodeURIComponent(targetUrl);

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the full response to see its structure

        displayAssets(data.assets); // Access the 'assets' array from the response
    } catch (error) {
        console.error('Error fetching data:', error);
        assetList.innerHTML = '<li>Error loading assets. Check the console for details.</li>';
    }
}

function displayAssets(assets) {
    const assetList = document.getElementById('asset-list');
    assetList.innerHTML = ''; // Clear previous content

    if (!assets || assets.length === 0) {
        assetList.innerHTML = '<li>No assets found.</li>';
        return;
    }

    assets.forEach(asset => {
        const li = document.createElement('li');
        li.textContent = `Name: ${asset.name} | ID: ${asset.id} | Location: ${asset.locationName}`;
        assetList.appendChild(li);
    });
}
