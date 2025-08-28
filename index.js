
const express = require("express");
const app = express();
const PORT = 3000;


const callModel = async (modelName, delay, successRate) => {
  await new Promise((r) => setTimeout(r, delay));
  if (Math.random() > successRate) throw new Error(`${modelName} failed`);
  return {
    model: modelName,
    confidence: 0.5 + Math.random() * 0.5,
    result: Math.random() > 0.5 ? "Human" : "AI",
  };
};
const modelA = () => callModel("ModelA", 1000, 0.9);
const modelB = () => callModel("ModelB", 2000, 0.7);
const modelC = () => callModel("ModelC", 3000, 0.95);


const questions = [
  "Tell me about yourself",
  "Why this company?",
  "Greatest weakness?",
  "Describe a challenge you solved",
  "Where do you see yourself in 5 years?",
];


const detectWithFallback = async (question) => {
  const start = Date.now();
  let response = null;

  try {
    response = await modelA();
  } catch (errA) {
    console.log(`[Fallback] ModelA failed: ${errA.message}`);
    try {
      response = await modelB();
    } catch (errB) {
      console.log(`[Fallback] ModelB failed: ${errB.message}`);
      try {
        response = await modelC();
      } catch (errC) {
        console.log(`[Fallback] ModelC failed: ${errC.message}`);
        throw new Error("All models failed");
      }
    }
  }

  const end = Date.now();
  return {
    question,
    model: response.model,
    confidence: Number(response.confidence.toFixed(2)),
    result: response.result,
    timeTaken: end - start,
  };
};


app.get("/results", async (req, res) => {
  const { question } = req.query;
  let targetQuestions = questions;

  if (question) {
    if (!questions.includes(question)) {
      return res.status(400).json({ error: "Invalid question" });
    }
    targetQuestions = [question];
  }

  try {
    const results = [];
    for (let q of targetQuestions) {
      const result = await detectWithFallback(q);
      results.push(result);
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("GET /results to see detection results");
});
