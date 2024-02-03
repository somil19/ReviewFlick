// import { useState } from "react";
// const styleContainer = {
//   display: "flex",
//   alignItems: "center",
//   gap: "16px ",
// };
// const styeP = { lineHeight: "1", margin: "0", fontSize: "2rem" };
// export default function StarRatings({ messages = [], maxRating, onSetRating }) {
//   // setting deafult value of mess =[]
//   const [rating, setRating] = useState(0);
//   const [temprating, setTemprating] = useState(0);

//   function HandleStars(rating) {
//     onSetRating(rating);
//     setRating(rating);
//   }

//   return (
//     <div style={styleContainer}>
//       <div style={{ display: "flex" }}>
//         {Array.from({ length: maxRating }, (_, i) => (
//           <Stars
//             key={i}
//             onRating={() => HandleStars(i + 1)}
//             full={temprating ? temprating >= i + 1 : rating >= i + 1}
//             onHoverIn={() => setTemprating(i + 1)}
//             onHoverOut={() => setTemprating(0)}
//           />
//         ))}
//       </div>
//       <p style={styeP}>
//         {messages.length === maxRating
//           ? messages[temprating ? temprating - 1 : rating - 1]
//           : temprating || rating || ""}
//       </p>
//     </div>
//   );
// }

// const styleStar = {
//   display: "block",
//   height: "24px",
//   width: "24px",
//   cursor: "pointer",
// };
// function Stars({ onRating, full, onHoverIn, onHoverOut }) {
//   return (
//     <span
//       style={styleStar}
//       onClick={onRating}
//       onMouseEnter={onHoverIn}
//       onMouseLeave={onHoverOut}
//     >
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="rgb(255, 225, 0)"
//           stroke="rgb(255, 225, 0)"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="rgb(255, 225, 0)"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="{2}"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// }

import React, { useState } from "react";

const styleContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const stars = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const text = {
  lineHeight: "24px",
  fontSize: "20px",
};
export default function StarRatings({
  maxRating = 5,
  messages = [],
  onSetUserRating,
}) {
  const [rating, setRating] = useState(0);
  const [temprating, settemprating] = useState(0);

  function handleRating(rating) {
    onSetUserRating(rating);
    setRating(rating);
  }

  return (
    <div style={styleContainer}>
      {/* <h1>Radhe Radhe !</h1> */}
      <div style={stars}>
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            onRating={() => handleRating(index + 1)}
            full={temprating ? index < temprating : index < rating} // logic - set full to true if index is less than rating(all starts are full otherwise stars are empty)
            onHoverIn={() => settemprating(index + 1)}
            onHoverOut={() => settemprating(0)}
          />
        ))}
      </div>
      <p style={text}>{temprating ? temprating : rating || ""}</p>
      <p style={text}>
        {messages.length === maxRating
          ? messages[temprating ? temprating - 1 : rating - 1]
          : ""}
      </p>
    </div>
  );
}

const starStyle = {
  width: "22px",
  height: "22px",
  cursor: "pointer",
};
function Star({ onRating, full, onHoverIn, onHoverOut }) {
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="rgb(255, 225, 0)"
          stroke="rgb(255, 225, 0)"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="rgb(255, 225, 0)"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
