"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger setup
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Landing page route
app.get('/', (req, res) => {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${process.env.APP_NAME || 'Assignment Solver'} API</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      }
      .tech-icon {
        transition: all 0.3s ease;
      }
      .tech-icon:hover {
        transform: scale(1.2);
      }
    </style>
  </head>
  <body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0 flex items-center">
            <i class="fas fa-laptop-code text-2xl text-indigo-600 mr-2"></i>
            <span class="text-xl font-bold text-gray-800">${process.env.APP_NAME || 'Assignment Solver API'}</span>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#features" class="text-gray-500 hover:text-indigo-600">Features</a>
            <a href="#docs" class="text-gray-500 hover:text-indigo-600">Documentation</a>
            <a href="/api-docs" class="text-gray-500 hover:text-indigo-600">API Explorer</a>
            <a href="#status" class="text-gray-500 hover:text-indigo-600">Status</a>
          </nav>
          <div class="md:hidden">
            <button id="menu-btn" class="text-gray-500">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="md:flex items-center justify-between">
            <div class="md:w-1/2 mb-10 md:mb-0">
              <h1 class="text-4xl md:text-5xl font-bold mb-4">${process.env.APP_NAME || 'Assignment Solver'} API</h1>
              <p class="text-xl mb-6 text-indigo-100">A powerful backend solution for educational applications</p>
              <div class="flex space-x-4">
                <a href="/api-docs" class="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-300">
                  Explore API <i class="fas fa-arrow-right ml-2"></i>
                </a>
                <a href="#docs" class="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition duration-300">
                  Documentation
                </a>
              </div>
            </div>
            <div class="md:w-1/2 flex justify-center">
              <div class="relative">
                <div class="bg-indigo-400 rounded-full w-64 h-64 opacity-50 absolute -top-4 -left-4"></div>
                <div class="bg-purple-400 rounded-full w-64 h-64 opacity-50 absolute -bottom-4 -right-4"></div>
                <div class="relative bg-white rounded-xl shadow-xl p-6 w-80">
                  <div class="text-gray-800">
                    <h3 class="font-bold text-lg mb-2">API Response</h3>
                    <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">{
  "status": "success",
  "message": "Welcome to Assignment Solver API",
  "version": "1.0.0",
  "timestamp": "${new Date().toISOString()}"
}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Modern backend with powerful capabilities for educational applications</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="card bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100 transition-all duration-300">
              <div class="text-indigo-600 mb-4">
                <i class="fas fa-bolt text-4xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">High Performance</h3>
              <p class="text-gray-600">Built with Express and Node.js for fast, efficient request handling and scalability.</p>
            </div>
            <div class="card bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100 transition-all duration-300">
              <div class="text-indigo-600 mb-4">
                <i class="fas fa-database text-4xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">MongoDB Storage</h3>
              <p class="text-gray-600">Flexible NoSQL database with Mongoose ODM for robust data modeling and validation.</p>
            </div>
            <div class="card bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100 transition-all duration-300">
              <div class="text-indigo-600 mb-4">
                <i class="fas fa-shield-alt text-4xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Secure Authentication</h3>
              <p class="text-gray-600">JWT-based authentication with password hashing to keep user data safe and secure.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Documentation Section -->
      <section id="docs" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">API Documentation</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive documentation and interactive testing</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-8 mb-12">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="md:w-1/2">
                <h3 class="text-xl font-bold mb-4">Getting Started</h3>
                <p class="mb-4 text-gray-600">To use the Assignment Solver API, you'll need an API key for authentication. Contact support to get your access credentials.</p>
                <div class="mb-6">
                  <h4 class="font-bold mb-2">Base URL</h4>
                  <code class="bg-gray-100 p-2 rounded text-sm block">${req.protocol}://${req.get('host')}/api/v1</code>
                </div>
                <div class="mb-6">
                  <h4 class="font-bold mb-2">Example Request</h4>
                  <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">fetch('${req.protocol}://${req.get('host')}/api/v1/problems', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));</pre>
                </div>
              </div>
              <div class="md:w-1/2">
                <h3 class="text-xl font-bold mb-4">Interactive Documentation</h3>
                <p class="mb-4 text-gray-600">Explore the API endpoints interactively using Swagger UI:</p>
                <a href="/api-docs" class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 mb-6">
                  Open API Explorer <i class="fas fa-external-link-alt ml-2"></i>
                </a>
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                  <span class="text-gray-500">Swagger UI Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Status Section -->
      <section id="status" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">System Status</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Real-time monitoring of API health and performance</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-700">API Status</h3>
                  <p class="text-2xl font-bold mt-2"><span class="text-green-500">Operational</span></p>
                </div>
                <div class="bg-green-100 p-2 rounded-full">
                  <i class="fas fa-check-circle text-green-500 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-700">Database</h3>
                  <p class="text-2xl font-bold mt-2"><span class="text-green-500">Connected</span></p>
                </div>
                <div class="bg-green-100 p-2 rounded-full">
                  <i class="fas fa-database text-green-500 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-700">Uptime</h3>
                  <p class="text-2xl font-bold mt-2">99.95%</p>
                </div>
                <div class="bg-blue-100 p-2 rounded-full">
                  <i class="fas fa-chart-line text-blue-500 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-700">Response Time</h3>
                  <p class="text-2xl font-bold mt-2">42ms</p>
                </div>
                <div class="bg-purple-100 p-2 rounded-full">
                  <i class="fas fa-stopwatch text-purple-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Technology Stack</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Modern technologies powering the backend</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fab fa-node-js text-4xl text-green-600"></i>
              </div>
              <span class="font-medium">Node.js</span>
            </div>
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fab fa-js text-4xl text-yellow-400"></i>
              </div>
              <span class="font-medium">TypeScript</span>
            </div>
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fas fa-server text-4xl text-gray-600"></i>
              </div>
              <span class="font-medium">Express</span>
            </div>
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fas fa-database text-4xl text-green-500"></i>
              </div>
              <span class="font-medium">MongoDB</span>
            </div>
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fab fa-docker text-4xl text-blue-500"></i>
              </div>
              <span class="font-medium">Docker</span>
            </div>
            <div class="tech-icon text-center">
              <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md mx-auto mb-3">
                <i class="fab fa-git-alt text-4xl text-orange-600"></i>
              </div>
              <span class="font-medium">Git</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex justify-between items-center">
          <div class="mb-6 md:mb-0">
            <div class="flex items-center mb-4">
              <i class="fas fa-laptop-code text-2xl text-indigo-400 mr-2"></i>
              <span class="text-xl font-bold">${process.env.APP_NAME || 'Assignment Solver API'}</span>
            </div>
            <p class="text-gray-400 max-w-md">A powerful backend solution for educational applications, built with modern technologies.</p>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-4">Connect with us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-github text-xl"></i></a>
              <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-xl"></i></a>
              <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin text-xl"></i></a>
              <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-discord text-xl"></i></a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© ${new Date().getFullYear()} ${process.env.APP_NAME || 'Assignment Solver API'}. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <script>
      // Mobile menu toggle
      document.getElementById('menu-btn').addEventListener('click', function() {
        const menu = document.querySelector('nav');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        menu.classList.toggle('flex-col');
        menu.classList.toggle('absolute');
        menu.classList.toggle('top-16');
        menu.classList.toggle('left-0');
        menu.classList.toggle('right-0');
        menu.classList.toggle('bg-white');
        menu.classList.toggle('p-4');
        menu.classList.toggle('shadow-lg');
        menu.classList.toggle('space-y-4');
      });
      
      // Dynamic status update
      async function updateStatus() {
        try {
          const response = await fetch('/api/health');
          const data = await response.json();
          
          if(data.status === 'ok') {
            document.getElementById('api-status').textContent = 'Operational';
            document.getElementById('api-status').className = 'text-2xl font-bold mt-2 text-green-500';
            document.getElementById('db-status').textContent = 'Connected';
            document.getElementById('db-status').className = 'text-2xl font-bold mt-2 text-green-500';
          }
        } catch (error) {
          document.getElementById('api-status').textContent = 'Degraded';
          document.getElementById('api-status').className = 'text-2xl font-bold mt-2 text-yellow-500';
          document.getElementById('db-status').textContent = 'Connection Issues';
          document.getElementById('db-status').className = 'text-2xl font-bold mt-2 text-red-500';
        }
      }
      
      // Initialize
      document.addEventListener('DOMContentLoaded', function() {
        updateStatus();
        setInterval(updateStatus, 30000);
      });
    </script>
  </body>
  </html>
  `;
    res.send(html);
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
exports.default = app;
