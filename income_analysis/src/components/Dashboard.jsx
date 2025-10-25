import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, Clock, Briefcase, GraduationCap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Recommendation from './Recommendation';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!location.state) {
            navigate('/chat');
            return;
        }
        setData(location.state);
    }, [location, navigate]);

    if (!data) return null;

    const { predictionData, userData } = data;
    const isHighIncome = predictionData.prediction === '>50K';
    const probability = (predictionData.probability * 100).toFixed(1);

    // Pie chart data
    const pieData = [
        { name: '>50K', value: predictionData.probability * 100 },
        { name: '<=50K', value: (1 - predictionData.probability) * 100 }
    ];

    const COLORS = ['#06B6D4', '#A855F7'];

    // Bar chart data
    const comparisonData = [
        { category: 'Your Education', value: userData.educationNum },
        { category: 'Avg Education', value: 10 },
        { category: 'Your Hours/Week', value: userData.hoursPerWeek },
        { category: 'Avg Hours/Week', value: 40 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">Income Prediction Dashboard</h1>
                    <p className="text-gray-400">AI-powered insights based on your profile</p>
                </motion.div>

                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`bg-gradient-to-br ${isHighIncome ? 'from-green-500/20 to-cyan-500/20' : 'from-orange-500/20 to-red-500/20'} backdrop-blur-lg border border-white/10 rounded-2xl p-6`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300 text-sm font-medium">Predicted Income</h3>
                            {isHighIncome ? <TrendingUp className="w-6 h-6 text-green-400" /> : <TrendingDown className="w-6 h-6 text-orange-400" />}
                        </div>
                        <div className={`text-3xl font-bold ${isHighIncome ? 'text-green-400' : 'text-orange-400'}`}>
                            {predictionData.prediction}
                        </div>
                        <p className="text-gray-400 text-sm mt-2">Based on ML analysis</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300 text-sm font-medium">Confidence Level</h3>
                            <DollarSign className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="text-3xl font-bold text-cyan-400">{probability}%</div>
                        <p className="text-gray-400 text-sm mt-2">Prediction accuracy</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300 text-sm font-medium">Work Hours</h3>
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-purple-400">{userData.hoursPerWeek}</div>
                        <p className="text-gray-400 text-sm mt-2">Hours per week</p>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-white mb-6">Income Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <h3 className="text-xl font-semibold text-white mb-6">Your Profile vs Average</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={comparisonData}>
                                <XAxis dataKey="category" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Bar dataKey="value" fill="url(#colorGradient)" />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Profile Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8"
                >
                    <h3 className="text-xl font-semibold text-white mb-6">Profile Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Occupation</p>
                                <p className="text-white font-medium">{userData.occupation}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Education</p>
                                <p className="text-white font-medium">{userData.educationNum} years</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Age</p>
                                <p className="text-white font-medium">{userData.age} years</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Workclass</p>
                                <p className="text-white font-medium">{userData.workclass}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recommendations */}
                <Recommendation predictionData={predictionData} userData={userData} />

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center space-x-4 mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/chat')}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
                    >
                        Try Again
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium"
                    >
                        Back to Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;