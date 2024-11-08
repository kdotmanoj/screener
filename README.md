# Stock Screener Application

## Overview
The Stock Screener is a web-based tool designed to help users filter stocks based on various financial parameters. The application provides a simple interface where users can input screening criteria, and the stock table dynamically updates based on the given conditions.

## Key Features
- **Real-time Query Input**: Users can type in their filter criteria, and the table is automatically updated to display only the stocks that meet all specified conditions.
- **Filtering**: Supports conditions such as Greater than, Less than, or Equal to for each of the nine financial parameters (e.g., Market Capitalization, P/E Ratio, etc.).
- **AND Logic**: All conditions must be met for a stock to appear in the results.
- **Sorting**: Allows users to sort the stock table by any column (e.g., Market Cap, P/E Ratio, etc.).
- **Pagination**: Results are paginated if more than 10 stocks match the filter criteria.

## Screening Logic
The stock screening logic is based on the conditions defined by the user. The system uses AND-only logic, meaning that a stock must meet all of the specified conditions in order to appear in the result table.

### Example Filters:
- Market Cap: Greater than ₹300 Cr
- P/E Ratio: Less than 30
- ROE: Greater than 15%

These filters are applied in real-time as the user types in their criteria.

## User Interface
The user interface has two key sections:

### Query Section:
- Users can input filter conditions for stock parameters like Market Capitalization, P/E Ratio, ROE, etc.
- As the user types or selects options, the stock table is automatically updated to reflect the filtered results.

### Results Table:
- Displays a list of stocks that match the filtering criteria.
- Columns include parameters like Stock Name, Market Cap, P/E Ratio, ROE, etc.
- Results can be sorted by clicking on the column headers.

## Tech Stack:
- **Frontend**: React.js, Tailwind CSS 
- **State Management**: React hooks (useState, useEffect)
- **Sorting & Pagination**: JavaScript functions for sorting and paginating results
- **Deployment**: [Vercel](https://screener-cgwff2h55-manojs-projects-0340e67e.vercel.app/)

## Installation
### Prerequisites
Ensure that the following tools are installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Instructions
1. Clone the Repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
   
2. Install Dependencies:
   ```bash
   npm install
   ```
   
3. Run the Application:
   ```bash
   npm start
   ```
   This will start the development server at http://localhost:3000.
   
5. Build for Production:
   ```bash
   npm run build
   ```
Styling and User Experience
---------------------------

*   **Tailwind CSS** is used to create a responsive, modern design that closely mimics the UI/UX of **Screener.in**.
    
*   The interface is designed to be clean and simple, with a focus on usability and functionality.
    
*   The **Query Section** allows users to quickly input filter criteria, while the **Results Table** updates in real time.
    

Bonus Features
--------------

*   **Responsive Design:** The layout adapts to both desktop and mobile devices, ensuring a seamless experience on any screen size.
    
*   **Deployment:** The project can be deployed to platforms like **Vercel** or **Netlify** for live usage.
    

Conclusion
----------

The **Stock Screener** is a simple but powerful tool for filtering and analyzing stock data based on user-defined criteria. With real-time filtering, sorting, and pagination, it provides a seamless and responsive user experience. The app is easy to deploy and can be a valuable tool for anyone looking to analyze stocks quickly and efficiently.
