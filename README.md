# 🛒 বাজার দর (BazarDor)

### দৈনন্দিন পণ্যের বাজারদর জানুন, থাকুন সচেতন।

**বাজার দর (BazarDor)** is a web-based market price tracking application that helps users easily explore and monitor the daily prices of essential commodities in Bangladesh. Users can view today's prices, compare price changes, browse products by category, and check market-based price details through a simple and responsive interface.

The platform provides an easy way to stay informed about daily market trends and make smarter purchasing decisions.

---

## 🚀 Technologies Used

The project is built using modern web technologies:

- **Next.js** – React framework for building the application.
- **React.js** – For creating interactive user interfaces.
- **TypeScript** – For type safety and better code maintainability.
- **Tailwind CSS** – For responsive and modern UI styling.
- **Better Auth** – For authentication and social login.
- **React Hot Toast** – For displaying success, error, and validation notifications.
- **Lucide React** – For icons and UI elements.
- **JSON Data / REST API** – For managing and fetching product and market price information.
- **Vercel** – For application deployment.

---

## ✨ Key Features

### 1. 📊 Daily Market Price Tracking
- View the latest prices of essential products in Bangladesh.
- See today's, yesterday's, last week's, and last month's prices.
- Identify products with increasing or decreasing prices.
- View price changes with percentage indicators.
- Display prices using Bengali numerals.

### 2. 🛍️ Product Categories & Smart Sorting
- Browse products through different categories.
- View category-specific products with their prices.
- Sort products by price from low to high or high to low.
- Explore product information through interactive product cards.
- Responsive product grid for mobile, tablet, and desktop devices.

### 3. 📈 Product Details & Market Comparison
- View detailed information about individual products.
- See minimum, maximum, and average prices.
- Explore today's prices across different local markets.
- Compare market-based prices to understand price variations.
- Access detailed product information through protected routes.

### 4. 🔐 Secure User Authentication
- User registration with name, email, and password.
- Secure login using Better Auth.
- Google and GitHub social authentication.
- Personalized user profile and account information.
- Update profile information and securely sign out.
- Protected product detail pages for authenticated users.

### 5. 📱 Responsive & User-Friendly Design
- Modern interface inspired by the provided Figma design.
- Responsive navigation bar with category links.
- Animated market price ticker.
- Hero banner with a call-to-action button.
- Loading skeletons and user-friendly empty states.
- Custom 404 page for invalid routes.
- Toast notifications for authentication and user interactions.

---


## ⚙️ Installation & Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd bazardor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the root directory and add the required environment variables.

```env
NEXT_PUBLIC_API_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Configure the appropriate API URL, authentication secret, and OAuth credentials before running the application.

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Responsive Design

BazarDor is designed to provide a consistent experience across different screen sizes.

- **Desktop:** Full navigation, multi-column product grids, and detailed layouts.
- **Tablet:** Adapted navigation and responsive product grids.
- **Mobile:** Stacked layouts, mobile-friendly navigation, and optimized product cards.

---

## ⚠️ Important Note

All displayed market prices are indicative and may vary depending on market conditions, location, product quality, and availability.

---

## 👨‍💻 Project

**Project Name:** বাজার দর (BazarDor)

**Purpose:** Daily essential commodity price tracking and market comparison in Bangladesh.

**Built with:** Next.js, React, TypeScript, Tailwind CSS, and Better Auth.

---

### 🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।

*Stay informed. Compare prices. Shop smarter.*