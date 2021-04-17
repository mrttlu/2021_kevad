/* eslint-disable no-console */
const config = require('./config');
const app = require('./app');

const { port } = config || 3000;

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
