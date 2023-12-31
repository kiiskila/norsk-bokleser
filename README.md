# Bokhjelp

Bokhjelp is an online book reader that allows seemless translation as you read. It contains a collection of Norwegian books that can be read with as much assistance as you need. Translate one tricky word at a time, or entire sentences.

![gifDemo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3VxejZkbjkwYmQzbnZ5em9yNG5iN2k1azU5b2t1Y29pMGRpOHJkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bBApS4NzADWLJDdfH6/giphy.gif)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Hosting](#hosting)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Technologies Used

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **DevOps**: Docker
- **Testing and Quality Assurance**: Jest

## Hosting

### Backend

Hosted on an Oracle Compute Instance and accessable here: https://bokhelp.me

GitHub actions autodeploys to the instance. The process is managed using pm2. When manually connecting to the instance through ssh these commands may be useful:

List processes: `pm2 list`

Stop process: `pm2 stop bokhjelp`

Start process: `pm2 start npm --name "bokhjelp" -- run start`

### Frotend

Hosted on Vercel and accessable here: https://norsk-bokleser.vercel.app

### Database

Hosted on Supabase

## Installation

Ensure you have Docker installed on your system to simplify the setup process.

### Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/kiiskila/norsk-bokleser.git
   cd norsk-bokleserr/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate the prisma schema:

   ```bash
   npx prisma generate
   ```

4. Run the migrations:

   ```bash
   npm run local:db:migrate
   ```

   OR to reset the database

   ```bash
   npm run local:db:rebuild
   ```

5. Run the seeder:

```bash
npx prisma db seed
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

## Usage

To run the application within docker:

```bash
docker-compose up -d
```

This will launch the frontend application on `http://localhost:5173`.

To run the tests:

```bash
cd backend
npm run test
```

---

## Contributing

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
