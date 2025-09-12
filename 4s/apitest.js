document.addEventListener('DOMContentLoaded', () => {
        const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your API endpoint
        const apiToken = 'YOUR_API_TOKEN'; // Replace with your API token

        const dataTable = document.getElementById('dataTable');
        const tableHead = dataTable.querySelector('thead tr');
        const tableBody = dataTable.querySelector('tbody');

        async function fetchDataAndPopulateTable() {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET', // Or 'POST', 'PUT', etc. as required by your API
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiToken}` // Common for token-based auth
                        // Or 'X-API-Key': apiToken if your API uses a custom header
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Assuming 'data' is an array of objects, and each object represents a row
                if (data.length > 0) {
                    // Populate headers
                    const headers = Object.keys(data[0]);
                    tableHead.innerHTML = ''; // Clear existing headers
                    headers.forEach(header => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        tableHead.appendChild(th);
                    });

                    // Populate rows
                    tableBody.innerHTML = ''; // Clear existing rows
                    data.forEach(item => {
                        const tr = document.createElement('tr');
                        headers.forEach(header => {
                            const td = document.createElement('td');
                            td.textContent = item[header];
                            tr.appendChild(td);
                        });
                        tableBody.appendChild(tr);
                    });
                } else {
                    tableBody.innerHTML = '<tr><td colspan="100%">No data available.</td></tr>';
                }

            } catch (error) {
                console.error('Error fetching or parsing data:', error);
                tableBody.innerHTML = '<tr><td colspan="100%">Error loading data.</td></tr>';
            }
        }

        fetchDataAndPopulateTable();
    });
