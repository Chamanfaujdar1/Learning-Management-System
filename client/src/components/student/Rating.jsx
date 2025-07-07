import React, { useEffect, useState } from 'react'

const Rating = ({initialRating, onRate}) => {

  const [rating, setRating] = useState(initialRating || 0)

  const handleRating = (value) => {
    setRating(value);
    
    if(onRate) {
      onRate(value); // Call the onRate function if provided
    }
  }

  useEffect(() => {
    if(initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div>
      {Array.from({length: 5}, (_, index) =>{
        const starValue = index + 1;
        return(
          // here we have used the backtics so that we can insert the dynamics classes also
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={() => handleRating(starValue)}>
            {/* Using a star icon, you can replace this with any icon library or SVG */}
            {/* For example, using Font Awesome or similar */}
            {/* Here we are using a simple star character as a placeholder */}
            &#9733; {/* HTML icon code */}
          </span>
        )
      })}
    </div>
  )
}

export default Rating
