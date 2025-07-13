# URL Shortener (MERN Stack)

A simple and efficient **URL Shortening** application built with the **MERN stack (MongoDB, Express, React, Node.js)** and styled using **Tailwind CSS**.

## 🚀 Features

* 🔗 Shorten long URLs
* 📊 Track URL statistics (access count, creation time, update time)
* 📝 Edit or delete existing shortened URLs
* 📋 Copy shortened links to clipboard
* 📱 Responsive design with horizontal scroll support for small devices

## 📁 Project Structure

```
project-root/
├── client/           # React frontend (Vite + Tailwind CSS)
├── server/           # Express backend with MongoDB
├── package.json      # Root-level dependencies (optional)
├── README.md         # Project documentation
```

## 🛠 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

2. **Install dependencies for both client and server:**

```bash
# For server
cd server
npm install

# For frontend
cd ../client
npm install
```

3. **Create .env file inside `server/` folder:**

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. **Run the development servers:**

```bash
# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm run dev
```

## 🔍 API Endpoints (Backend)

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| POST   | `/shorten`                  | Create a short URL      |
| GET    | `/:shortCode`               | Redirect to long URL    |
| GET    | `/shorten/:shortCode/stats` | Get stats of short URL  |
| PUT    | `/shorten/:shortCode`       | Update the original URL |
| DELETE | `/shorten/:shortCode`       | Delete the short URL    |

## 🎨 UI Highlights

* Clean UI with TailwindCSS
* Mobile-friendly with scrollable cards
* Icons for viewing, copying, editing, and deleting

## 📌 Notes

* Make sure MongoDB is running locally or hosted on a service like MongoDB Atlas.
* CORS is handled in the backend to allow frontend to communicate properly.

## 📸 Screenshots

> Add screenshots here for better presentation (optional)

---

## 📃 License

MIT License. Feel free to fork and modify.

---

Made with ❤️ using MERN & TailwindCSS
