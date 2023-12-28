# Bokhjelp

Bokhjelp is an online book reader that allows seemless translation as you read. It contains a collection of Norwegian books that can be read with as much assistance as you need. Translate one tricky word at a time, or entire sentences.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Development] (#development)
- [Demos](#demos)
- [Contributing](#contributing)
- [Contact](#contact)

## Technologies Used

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **DevOps**: Docker
- **Testing and Quality Assurance**: Jest

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
   npm run db:migrate
   ```

Optionally undo the migration:

```bash
npm run db:migrate:undo
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

## Demos

to-do

## Contributing

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Will Kiiskila - [kiiskila.will@gmail.com](mailto:kiiskila.will@gmail.com)

Project Link: [https://github.com/kiiskila/norsk-bokleser](https://github.com/kiiskila/norsk-bokleser)
