import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader } from 'lucide-react';
import axios from 'axios';

const Recommendation = ({ predictionData, userData }) => {
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(true);
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchRecommendation();
    }, []);

    useEffect(() => {
        if (recommendation && currentIndex < recommendation.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + recommendation[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 20);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, recommendation]);

    const fetchRecommendation = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/predict/recommend',
                {
                    prediction: predictionData.prediction,
                    inputData: userData
                },
                { withCredentials: true }
            );
            setRecommendation(response.data.recommendation);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recommendation:', error);
            setRecommendation('Unable to generate recommendations at this time.');
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg border-2 border-cyan-500/30 rounded-2xl p-8"
        >
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">AI Recommendations</h3>
                    <p className="text-gray-400 text-sm">Personalized insights for your career growth</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="ml-3 text-gray-300">Generating personalized recommendations...</span>
                </div>
            ) : (
                <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 whitespace-pre-line leading-relaxed">
                        {displayedText}
                        {currentIndex < recommendation.length && (
                            <span className="inline-block w-1 h-5 bg-cyan-400 animate-pulse ml-1"></span>
                        )}
                    </div>
                </div>
            )}

            {!loading && currentIndex >= recommendation.length && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                    <p className="text-sm text-gray-400 text-center">
                        💡 These recommendations are AI-generated based on your profile. Consider consulting with a career advisor for personalized guidance.
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Recommendation;