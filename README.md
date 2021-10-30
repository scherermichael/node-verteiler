# Verteiler

Verteiler ([[fɛɐ̯ˈtaɪ̯lɐ], meaning: distributor](https://en.wiktionary.org/wiki/Verteiler)) distributes an array of weighted items to a given number of recipients.

## Installation

```bash
npm install verteiler
```

## Quick start

First you need to integrate Verteiler into your application.

```javascript
import verteiler from 'verteiler';
```

The function expects three input parameters:

- Array of all objects to be distributed
- Function that returns the weight of an object as a number
- Number of recipients

For each recipient, an array of objects is returned.

```javascript
const items = [
  { name: 'a', weight: 2 },
  { name: 'b', weight: 9 },
  { name: 'c', weight: 1 },
  { name: 'd', weight: 6 },
  { name: 'e', weight: 3 }
];

// Distribute over 2 recipients
verteiler(items, (item) => item.weight, 2); 
// => [
//      [{ name: 'b', weight: 9 }, { name: 'a', weight: 2 }],
//      [{ name: 'd', weight: 6 }, { name: 'e', weight: 3 }, { name: 'c', weight: 1 }]
//    ]

// Distribute over 3 recipients
verteiler(items, (item) => item.weight, 3); 
// => [
//      [{ name: 'b', weight: 9 }],
//      [{ name: 'd', weight: 6 }],
//      [{ name: 'e', weight: 3 }, { name: 'a', weight: 2 }, { name: 'c', weight: 1 }]
//    ]
```

## How it works

The list of elements is sorted by weight in descending order and the result is iterated over. The current element is added to the recipient that received the lowest weight in total so far. Elements with weight 0 are distributed evenly among all recipients.

The algorithm is stable as it always returns the same result for the same input parameters. It can therefore also be used to distribute a workload among several consumers that cannot communicate with each other, as long as the total workload and the number of consumers are known to all participants. Each participant must also know its own position in the list of consumers.
