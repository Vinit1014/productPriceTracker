Here’s a structured setup guide for your Flipkart product sharing web application, which includes both frontend and backend instructions. This will help users clone your repository and get the application running quickly.

### Setup Instructions for Flipkart Product Sharing Web Application

---

### 1. **Project Overview**

This web application allows users to share Flipkart product links. It automatically fetches product details such as title, description, price, reviews, and total purchases. Users can also recheck product prices, which creates a historical record of prices. The application does not require user login, and all users can view products and their pricing history. Additionally, users can search or filter products by title.

---

### 2. **Prerequisites**

Ensure you have the following software installed:

- [Node.js](https://nodejs.org/en/download) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

---

### 3. **Frontend Setup (Vite + React + TypeScript)**

#### 3.1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Navigate to the frontend directory:

```bash
cd your-repo-name/frontend
```

#### 3.2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or, using **yarn**:

```bash
yarn install
```

#### 3.3. Run the Development Server

To start the frontend application, run:

```bash
npm run dev
```

Or, using **yarn**:

```bash
yarn dev
```

The frontend application will be accessible at `http://localhost:3000`.

---

### 4. **Backend Setup (Node.js + TypeScript)**

#### 4.1. Navigate to the Backend Directory

```bash
cd ../backend
```

#### 4.2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or, using **yarn**:

```bash
yarn install
```


#### 4.3. Run the Backend Server

To start the backend application:

Using **npm**:

```bash
npm run start
```


The backend server will be running at `http://localhost:5000`.

---

### 5. **Create .env in backend folder**

Paste this link: MONGODB_URL='mongodb+srv://v1n1ts0010:lH1KmWhuLRy9pS5u@pricetracker.0av8v.mongodb.net/?retryWrites=true&w=majority&appName=priceTracker'
This will make the connection to the database

---

### 6. **Testing the Application**

1. **Access the Frontend**: Open your web browser and go to `http://localhost:3000`.
2. **Add Flipkart Product Links**: Use the input field to paste Flipkart product URLs. The application will fetch and display the product details automatically.
3. **Recheck Prices**: Use the functionality provided to recheck the product prices, which will create a historical record.
4. **Search and Filter**: Use the search functionality to filter products by title.

---

### 7. **Deployment**

For deployment, frontend on vercel and backend on render

---

### 8. **Common Issues**

- **CORS Issues**: Ensure your backend is set up to allow requests from your frontend URL.
- **Database Connection Errors**: Check your database configuration in the `.env` file.
- **API Fetch Errors**: Verify that your backend is correctly scraping the Flipkart product details.

---

This setup guide should provide clear instructions for users to get your web application up and running. Feel free to modify the details to better fit your project specifics!
