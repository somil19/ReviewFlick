import React from "react";
import ReactDOM from "react-dom/client";
//import StarRatings from "./StarRatings";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {
      <App />

      // <>
      //   <StarRatings
      //     maxRating={5}
      //     messages={["Terible", "Bad", "Okay", "Good", "Amazing"]}
      //   />
      //   <StarRatings maxRating={10} />
      // </>
    }
  </React.StrictMode>
);
