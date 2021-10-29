export default function(items, getWeight, count) {
  const result = [];
  const totalWeight = [];
  let roundRobinCount = 0;

  const roundRobin = function () {
    return roundRobinCount++ % totalWeight.length;
  };

  const leastUtilizedRecipient = function () {
    let minTotalWeight = Number.MAX_VALUE;
    let result = 0;

    // Loop through all recipients
    for (let i = 0; i < totalWeight.length; i++) {
      // Check for the lowest weight  so far
      if (totalWeight[i] < minTotalWeight) {
        // Store index of recipient and new lowest workload
        result = i;
        minTotalWeight = totalWeight[i];
      }
    }

    return result;
  };

  // Check for valid count
  if (count < 1) {
    throw new Error('Count out of range. Must be 1 or greater.');
  }

  // Initialize variables
  for (let index = 0; index < count; index++) {
    result[index] = [];
    totalWeight[index] = 0;
  }

  // Sort items descending by weight
  items.sort((a, b) => getWeight(b) - getWeight(a));

  // Loop through all items to be distributed
  for (let item of items) {
    const weight = getWeight(item);

    // Distribute items with weight = 0 evenly across recipients, otherwise select the least used one
    const selectedRecipient = weight === 0 ? roundRobin() : leastUtilizedRecipient();

    // Add item to selected recipient and increase it's recorded workload
    result[selectedRecipient].push(item);
    totalWeight[selectedRecipient] += weight;
  }

  return result;
};
