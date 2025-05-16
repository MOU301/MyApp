import React, { useState,useEffect } from 'react'
import axios from 'axios';

  const topics = {
    vorstellen: [
      { question: "Wie heißt du?", answer: "Ich heiße [your name]" },
      { question: "Wie alt bist du?", answer: "Ich bin [your age]" }
    ],
    essen: [
      { question: "Was isst du gern?", answer: "Ich esse gern Pizza." },
      { question: "Hast du ein Lieblingsessen?", answer: "Mein Lieblingsessen ist Sushi." }
    ],
    hobbys: [
      { question: "Was sind deine Hobbys?", answer: "Meine Hobbys sind Fußball und Lesen." },
      { question: "Spielst du ein Instrument?", answer: "Ja, ich spiele Gitarre." }
    ]
  };
  
  const Bot = () => {
    const [topic, setTopic] = useState("vorstellen");
    const [question, setQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [botResponse, setBotResponse] = useState("");
    const [feedback, setFeedback] = useState("");
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      // Select a random question based on the current topic
      const randomQuestion = topics[topic][Math.floor(Math.random() * topics[topic].length)];
      setQuestion(randomQuestion.question);
      speakQuestion(randomQuestion.question); // Bot speaks the question
    }, [topic]);
  
    // Function to handle user response
    const handleAnswer = () => {
      const correctAnswer = topics[topic].find(q => q.question === question).answer;
  
      if (userAnswer.toLowerCase().includes(correctAnswer.toLowerCase())) {
        setFeedback("Richtig! Gute Arbeit.");
        speakResponse("Richtig! Gute Arbeit.");
      } else {
        setFeedback("Leider falsch. Versuch es nochmal.");
        speakResponse("Leider falsch. Versuch es nochmal.");
      }
  
      // Log the question and answer in history for conversation flow
      setHistory([...history, { question, userAnswer, feedback }]);
  
      // Clear the user input after checking the answer
      setUserAnswer("");
    };
  
    // Function to handle speech recognition (voice input)
    const startVoiceRecognition = () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "de-DE";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserAnswer(transcript);
        handleAnswer(); // Automatically check the answer after voice input
      };
      recognition.start();
      speakResponse("Ich höre, bitte antworte.");
    };
  
    // Function to speak the question (Text-to-Speech)
    const speakQuestion = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    };
  
    // Function to speak the response (Text-to-Speech)
    const speakResponse = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    };
  
    // Function to change topic
    const handleTopicChange = (e) => {
      setTopic(e.target.value);
    };
  
    return (
      <div>
          <button onClick={startVoiceRecognition}>Antwort mit Stimme geben</button>
      </div>
    );
  };
export default Bot
