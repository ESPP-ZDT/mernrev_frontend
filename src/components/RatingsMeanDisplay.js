import React, { useEffect, useState } from 'react';
import uri from '../uri';

const MeanRating = ({ noteId }) => {
  const [meanRating, setMeanRating] = useState(0);
  

  useEffect(() => {
    // Make a request to the server to retrieve the mean rating for the note with the specified id
    async function fetchMeanRating() {
      const response = await fetch(uri+ `/api/rating/${noteId}/mean-rating`);
      const data = await response.json();
      setMeanRating(data.meanRating);
    }
    fetchMeanRating();
  }, [noteId]);

  return <div>Mean Rating: {meanRating}</div>;
};

export default MeanRating;
