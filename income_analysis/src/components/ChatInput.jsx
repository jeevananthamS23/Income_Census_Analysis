import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatInput = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const questions = [
        { key: 'age', question: 'What is your age?', type: 'number', validation: (val) => val >= 18 && val <= 100 },
        { 
            key: 'workclass', 
            question: 'What is your work class?',
            options: ['Private', 'Self-emp-not-inc', 'Self-emp-inc', 'Federal-gov', 'Local-gov', 'State-gov', 'Without-pay', 'Never-worked']
        },
        { key: 'educationNum', question: 'How many years of education do you have?', type: 'number', validation: (val) => val >= 1 && val <= 20 },
        { 
            key: 'maritalStatus', 
            question: 'What is your marital status?',
            options: ['Married-civ-spouse', 'Divorced', 'Never-married', 'Separated', 'Widowed', 'Married-spouse-absent', 'Married-AF-spouse']
        },
        { 
            key: 'occupation', 
            question: 'What is your occupation?',
            options: ['Tech-support', 'Craft-repair', 'Other-service', 'Sales', 'Exec-managerial', 'Prof-specialty', 'Handlers-cleaners', 'Machine-op-inspct', 'Adm-clerical', 'Farming-fishing', 'Transport-moving', 'Priv-house-serv', 'Protective-serv', 'Armed-Forces']
        },
        { 
            key: 'relationship', 
            question: 'What is your relationship status?',
            options: ['Wife', 'Own-child', 'Husband', 'Not-in-family', 'Other-relative', 'Unmarried']
        },
        { 
            key: 'race', 
            question: 'What is your race?',
            options: ['White', 'Asian-Pac-Islander', 'Amer-Indian-Eskimo', 'Other', 'Black']
        },
        { 
            key: 'gender', 
            question: 'What is your gender?',
            options: ['Male', 'Female']
        },
        { key: 'hoursPerWeek', question: 'How many hours per week do you work?', type: 'number', validation: (val) => val >= 1 && val <= 100 }
    ];

    useEffect(() => {
        // Welcome message
        setTimeout(() => {
            addBotMessage("Hello! I'm your AI assistant. I'll help you predict your income potential by asking you a few questions. Let's get started!");
            setTimeout(() => {
                addBotMessage(questions[0].question);
                if (questions[0].options) {
                    addBotMessage("Please choose from: " + questions[0].options.join(', '));
                }
            }, 1000);
        }, 500);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addBotMessage = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { text, sender: 'bot' }]);
            setIsTyping(false);
        }, 500);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { text, sender: 'user' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const currentQuestion = questions[currentStep];
        addUserMessage(inputValue);

        // Validate input
        if (currentQuestion.type === 'number') {
            const numValue = parseInt(inputValue);
            if (isNaN(numValue) || !currentQuestion.validation(numValue)) {
                setTimeout(() => {
                    addBotMessage("Please enter a valid number. " + currentQuestion.question);
                }, 500);
                setInputValue('');
                return;
            }
            userData[currentQuestion.key] = numValue;
        } else {
            if (!currentQuestion.options.some(opt => opt.toLowerCase() === inputValue.toLowerCase())) {
                setTimeout(() => {
                    addBotMessage("Please choose from the given options: " + currentQuestion.options.join(', '));
                }, 500);
                setInputValue('');
                return;
            }
            const matchedOption = currentQuestion.options.find(opt => opt.toLowerCase() === inputValue.toLowerCase());
            userData[currentQuestion.key] = matchedOption;
        }

        setInputValue('');

        // Move to next question or submit
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setTimeout(() => {
                addBotMessage(questions[currentStep + 1].question);
                if (questions[currentStep + 1].options) {
                    addBotMessage("Options: " + questions[currentStep + 1].options.join(', '));
                }
            }, 1000);
        } else {
            // All questions answered - make prediction
            setTimeout(() => {
                addBotMessage("Thank you! Let me analyze your data and predict your income potential...");
            }, 500);

            try {
                const response = await axios.post('http://localhost:5000/api/predict', userData, {
                    withCredentials: true
                });

                setTimeout(() => {
                    navigate('/dashboard', { state: { predictionData: response.data, userData } });
                }, 2000);
            } catch (error) {
                setTimeout(() => {
                    addBotMessage("Sorry, there was an error processing your request. Please try again.");
                }, 1000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl h-[80vh] bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                        <Bot className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h2 className="text-xl font-bold text-white">AI Income Predictor</h2>
                            <p className="text-sm text-gray-400">Question {currentStep + 1} of {questions.length}</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start space-x-2 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'bot' ? 'bg-cyan-500/20' : 'bg-purple-500/20'}`}>
                                        {msg.sender === 'bot' ? <Bot className="w-5 h-5 text-cyan-400" /> : <User className="w-5 h-5 text-purple-400" />}
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl ${msg.sender === 'bot' ? 'bg-white/5 text-gray-200' : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2"
                        >
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="px-4 py-3 bg-white/5 rounded-2xl">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-6 border-t border-white/10">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your answer..."
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium flex items-center space-x-2"
                        >
                            <span>Send</span>
                            <Send className="w-4 h-4" />
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ChatInput;