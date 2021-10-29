# Verteiler

Distributes an array of weighted items to a given number of recipients.

## Installation

```bash
npm install verteiler
```

## Quick start

First you need to integrate Verteiler into your application.

```javascript
const verteiler = require('verteiler');
```

The function expects three input parameters:

- Array of all objects to be distributed
- Function that returns the weight of an object as a number
- Number of recipients

For each recipient, an array of objects is returned.

```javascript
const items = [
  { id: 1, weight: 2 },
  { id: 2, weight: 9 },
  { id: 3, weight: 1 },
  { id: 4, weight: 6 },
  { id: 5, weight: 3 }
];

const items = [{ id: 1, weight: 2 },{ id: 2, weight: 9 },{ id: 3, weight: 1 },{ id: 4, weight: 6 },{ id: 5, weight: 3 }];

// Distribute over 2 recipients
verteiler(items.entries(), (item) => item.weight, 2); 
// => [
//      [{ id: 2, weight: 9 }, { id: 1, weight: 2 }],
//      [{ id: 4, weight: 6 }, { id: 5, weight: 3 }, { id: 3, weight: 1 }]
//    ]

// Distribute over 3 recipients
verteiler(items.entries(), (item) => item.weight, 3); 
// => [
//      [{ id: 2, weight: 9 }],
//      [{ id: 4, weight: 6 }],
//      [{ id: 5, weight: 3 }, { id: 1, weight: 2 }, { id: 3, weight: 1 }]
//    ]
```

## How it works

The list of elements is sorted by weight in descending order and the result is iterated over. The current element is added to the recipient that received the lowest weight in total so far. Elements with weight 0 are distributed evenly among all recipients.

The algorithm is stable as it always returns the same result for the same input parameters. It can therefore also be used to distribute a workload among several consumers that cannot communicate with each other, as long as the total workload and the number of consumers are known to all participants. Each participant must also know its own position in the list of consumers.
