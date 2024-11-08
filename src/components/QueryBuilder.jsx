import React, { useState } from 'react';

const operators = [
  { value: '>', label: 'Greater than' },
  { value: '<', label: 'Less than' },
  { value: '=', label: 'Equal to' },
];

const parameters = [
  { value: 'marketCap', label: 'Market Capitalization (B)' },
  { value: 'peRatio', label: 'P/E Ratio' },
  { value: 'roe', label: 'ROE (%)' },
  { value: 'debtToEquity', label: 'Debt-to-Equity Ratio' },
  { value: 'dividendYield', label: 'Dividend Yield (%)' },
  { value: 'revenueGrowth', label: 'Revenue Growth (%)' },
  { value: 'epsGrowth', label: 'EPS Growth (%)' },
  { value: 'currentRatio', label: 'Current Ratio' },
  { value: 'grossMargin', label: 'Gross Margin (%)' },
];

const ExampleQuery = () => (
  <div className="bg-blue-50 rounded-lg px-7 py-5">
    <h3 className="text-sm font-medium text-blue-800 mb-2">Example Query:</h3>
    <pre className="font-mono text-sm text-blue-700">
      {'marketCap > 500 AND\npeRatio < 15 AND\nroe > 20'}
    </pre>
  </div>
);

const ParametersList = () => (
  <div className="bg-gray-50 p-4 rounded-lg mt-4">
    <h3 className="text-sm font-medium text-gray-800 mb-2">Available Parameters:</h3>
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
      {parameters.map(param => (
        <div key={param.value} className="font-mono">{param.value}</div>
      ))}
    </div>
  </div>
);

export default function QueryBuilder({ onQueryChange }) {
  const [queryText, setQueryText] = useState('');

  const handleQueryTextChange = (e) => {
    const newText = e.target.value;
    setQueryText(newText);

    // Split by 'AND' and map each condition
    const conditions = newText
      .split(/AND/i) // Split by 'AND' (case-insensitive)
      .map(chunk => chunk.split(/\s+/).filter(Boolean)) // Split by whitespace and filter out empty strings
      .map(conditionParts => {
        if (conditionParts.length !== 3) return null; // We need exactly 3 parts: param, operator, value

        const [param, op, value] = conditionParts;
        return { 
          parameter: param.trim(), 
          operator: op.trim(), 
          value: parseFloat(value.trim()) 
        };
      })
      .filter(condition => 
        condition && // Ensure it's not null
        parameters.some(p => p.value === condition.parameter) && // Validate parameter
        operators.some(o => o.value === condition.operator) && // Validate operator
        !isNaN(condition.value) // Ensure value is a number
      );

    onQueryChange(conditions);
  };

  return (
    <div className="space-y-4 py-2">
      <div className="relative flex justify-between px-1.5">
        <textarea
          value={queryText}
          onChange={handleQueryTextChange}
          placeholder="Enter your query here (e.g., 'marketCap > 10000 AND peRatio < 15')"
          className="w-2/3 h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono resize-none"
        />
        <div className="w-1/3 pl-5">
          <ExampleQuery/>
        </div>
      </div>
      
      <ParametersList />
    </div>
  );
}