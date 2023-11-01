const http = require('http');
const mysql = require('mysql2');
const ejs = require('ejs'); // A template engine for rendering HTML

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sundaramxkr',
  database: 'customers',
  port:'3306',
});

const server = http.createServer((req, res) => {
  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }

    // Perform a query to retrieve data (change the query to match your schema)
    connection.query('SELECT ID, username, age, email, pass FROM customers.details', (queryErr, results) => {
      if (queryErr) {
        console.error('Error querying the database: ' + queryErr);
      } else {
        // Render the data in an HTML template using EJS
        const template = `
          <html>
            <head>
              <title>Customer Data</title>
            </head>
            <body>
              <h1>User Data</h1>
              <table>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Pass</th>
                </tr>
                <% data.forEach(user => { %>
                  <tr>
                    <td><%= user.ID %></td>
                    <td><%= user.username %></td>
                    <td><%= user.age %></td>
                    <td><%= user.email %></td>
                    <td><%= user.pass%></td>
                  </tr>
                <% }); %>
              </table>
            </body>
          </html>
        `;

        const renderedHtml = ejs.render(template, { data: results });

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderedHtml);
      }

      // Close the database connection
      connection.end();
    });
  });
});

const port = 3000; // You can change the port as needed
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
