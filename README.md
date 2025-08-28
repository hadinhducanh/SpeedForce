

# SpeedForce AI Detection Backend

## Overview
This backend service simulates AI detection results for interview questions using three asynchronous AI models with fallback logic.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation
1. Clone the repository:
    ```powershell
    git clone https://github.com/hadinhducanh/SpeedForce.git
    cd SpeedForce
    ```
2. Install dependencies:
    ```powershell
    npm install
    ```

## Usage
Start the backend service:
```powershell
node index.js
```

## API Endpoints

### GET /results
Returns AI detection results for 5 predefined interview questions:
- "Tell me about yourself"
- "Why this company?"
- "Greatest weakness?"
- "Describe a challenge you solved"
- "Where do you see yourself in 5 years?"

#### Example Request
```
GET http://localhost:3000/results
```

#### Example Response
```
[
   {
      "question": "Tell me about yourself",
      "model": "ModelA",
      "confidence": 0.83,
      "result": "Human",
      "timeTaken": 1023
   },
   {
      "question": "Why this company?",
      "model": "ModelB",
      "confidence": 0.67,
      "result": "AI",
      "timeTaken": 2070
   }
]
```

### Optional Features
- Logging of failed models before fallback
- Query parameter to test a single question:
   - `GET /results?question=Why%20this%20company?`
- Simple unit tests for fallback logic

## Testing Extra (Unit Test Fallback Logic)
To test the extra feature (unit test for fallback logic), open PowerShell and run:

```powershell
$env:NODE_ENV="test"; node index.js
```

Test results will be printed in the terminal. If any test fails, the process will exit with a non-zero code; if all pass, it will exit with 0.

## License
This project is licensed under the MIT License.
