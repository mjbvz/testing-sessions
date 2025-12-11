import React, { useState } from 'react';

function BinarySearch() {
  const [arr, setArr] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  const [target, setTarget] = useState('');
  const [result, setResult] = useState(null);

  const binarySearch = (array, value) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (array[mid] === value) return mid;
      if (array[mid] < value) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  };

  const handleSearch = () => {
    const index = binarySearch(arr, parseInt(target));
    setResult(index);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Binary Search</h2>
      <p>Array: [{arr.join(', ')}]</p>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter number"
      />
      <button onClick={handleSearch}>Search</button>
      {result !== null && (
        <p>
          {result !== -1 
            ? `Found at index: ${result}` 
            : 'Not found'}
        </p>
      )}
    </div>
  );
}

export default BinarySearch;
