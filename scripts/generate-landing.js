// scripts/generate-landing.js
const fs = require('fs');
const path = require('path');

const landingHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assignment Solver API</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Your landing page styles */
    body { background-color: #f9fafb; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <!-- Your landing page content -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Assignment Solver API</h1>
      <p class="text-xl text-gray-600 mb-8">Backend service is running successfully</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a href="/api-docs" class="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div class="text-indigo-600 mb-3"><i class="fas fa-book-open fa-2x"></i></div>
          <h3 class="text-xl font-semibold mb-2">API Documentation</h3>
          <p class="text-gray-600">Explore our API endpoints with Swagger UI</p>
        </a>
        
        <a href="/api/health" class="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div class="text-green-600 mb-3"><i class="fas fa-heartbeat fa-2x"></i></div>
          <h3 class="text-xl font-semibold mb-2">Health Check</h3>
          <p class="text-gray-600">Verify the API status and database connection</p>
        </a>
        
        <a href="https://github.com/your-repo" class="card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div class="text-gray-800 mb-3"><i class="fab fa-github fa-2x"></i></div>
          <h3 class="text-xl font-semibold mb-2">GitHub Repository</h3>
          <p class="text-gray-600">View the source code and contribute</p>
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'index.html'), landingHTML);
console.log('Landing page generated successfully');