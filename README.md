# MindSpeak 🧠💭


FULL URL: https://mindspeak-sys.vercel.app/auth/login



A safe, anonymous confession platform designed to support mental health and well-being for university students.

## Project Structure

- **client/**: Next.js frontend for MindSpeak (see [client/README.md](client/README.md))
- **server/**: Laravel backend API and web server (see [server/README.md](server/README.md))

## About MindSpeak

MindSpeak provides university students with a safe, anonymous space to share their thoughts, struggles, and experiences. The platform aims to reduce mental health stigma by creating a supportive community where students can express themselves freely without fear of judgment.


### Team Project
University team project

### Key Features
- Anonymous confessions and community support
- Access to mental health resources and crisis support
- Moderated, safe environment
- Responsive, modern UI

## Getting Started

### Prerequisites
- Node.js (v16+) and npm/yarn/pnpm/bun (for client)
- PHP 8.1+, Composer, and MySQL/PostgreSQL (for server)

### Quick Start

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/mindspeak.git
cd mindspeak
```

#### 2. Setup the server (backend)
See [server/README.md](server/README.md) for full instructions.
```bash
cd server
composer install
npm install
cp .env.example .env
php artisan key:generate
# Configure your database in .env
php artisan migrate
npm run dev # or npm run build for production
php artisan serve
```
The backend will be available at http://localhost:8000 by default.

#### 3. Setup the client (frontend)
See [client/README.md](client/README.md) for full instructions.
```bash
cd ../client
npm install
npm run dev
```
The frontend will be available at http://localhost:3000 by default.

#### 4. API URL Configuration
The client uses a proxy to communicate with the backend. To change the API base URL, edit `client/src/store/services/api.ts`:
```ts
const API_BASE_URL = '/api/proxy' // Update this if your API endpoint changes
```

## Contributing
See [server/README.md](server/README.md#contributing) for contribution guidelines.

## License
This project is licensed under the MIT License.

---

**Disclaimer**: MindSpeak is not a substitute for professional mental health care. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately. 
