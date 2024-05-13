// pages/api/chat.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-pro-latest';
const API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: 'user',
        parts: [{ text: 'how many repositories are present here' }],
      },
      {
        role: 'model',
        parts: [{ text: 'SarahGathoni has 11 public repositories.' }],
      },
      {
        role: 'user',
        parts: [{ text: 'how many repositories are present here' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Hello! Gitty here. 👋 \n\nSarahGathoni has 11 public repositories. 😊' }],
      },
      {
        role: 'user',
        parts: [{ text: 'thanks gitty' }],
      },
      {
        role: 'model',
        parts: [{ text: 'No problem! Happy to help! 😄' }],
      },
      {
        role: "user",
        parts: [{ text: "where is Africa"}],
      },
      {
        role: "model",
        parts: [{ text: "I can only provide information about the GitHub repository at https://github.com/SarahGathoni.  Is there anything else I can help you with regarding this repository?"}],
      },
    ],
  });

  const { userInput } = req.body;
  const result = await chat.sendMessage(userInput);
  const response = result.response;

  res.status(200).json({ message: response.text() });
}