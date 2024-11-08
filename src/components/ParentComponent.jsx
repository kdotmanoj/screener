import React, { useState } from 'react';
import QueryBuilder from './QueryBuilder'; // Adjust according to your file structure
import StockTable from './StockTable';     // Adjust according to your file structure

const ParentComponent = () => {
  const [queryConditions, setQueryConditions] = useState([]);

  const handleQueryChange = (conditions) => {
    setQueryConditions(conditions);
  };

  return (
    <div>
      <StockTable queryConditions={queryConditions} />
      <QueryBuilder onQueryChange={handleQueryChange} />
    </div>
  );
};

export default ParentComponent;