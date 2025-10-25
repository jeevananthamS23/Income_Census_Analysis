import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="fixed w-full bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2"
                        >
                            <Brain className="w-8 h-8 text-cyan-400" />
                            <span className="text-xl font-bold text-white">AI Income Predictor</span>
                        </motion.div>
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-white hover:text-cyan-400 transition"
                            >
                                Login
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium"
                            >
                                Sign Up
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Predict Your{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Income Potential
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Harness the power of AI to understand your earning potential and get personalized recommendations to boost your income.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-lg font-semibold shadow-lg shadow-purple-500/50"
                        >
                            Try Predictor Now
                        </motion.button>
                    </motion.div>

                    {/* Floating Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        {[
                            { icon: Brain, title: 'AI-Powered', desc: 'Advanced machine learning algorithms' },
                            { icon: TrendingUp, title: 'Accurate Predictions', desc: 'Data-driven income insights' },
                            { icon: Shield, title: 'Secure & Private', desc: 'Your data is encrypted and safe' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 + 0.5 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
                            >
                                <feature.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold text-center text-white mb-16"
                    >
                        How It Works
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { num: '01', title: 'Share Your Info', desc: 'Answer a few simple questions about your background' },
                            { num: '02', title: 'AI Analysis', desc: 'Our model analyzes your data using advanced algorithms' },
                            { num: '03', title: 'Get Insights', desc: 'Receive predictions and personalized recommendations' }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center"
                            >
                                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-3xl p-12"
                    >
                        <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Discover Your Potential?
                        </h2>
                        <p className="text-gray-300 mb-8">
                            Join thousands of users who have unlocked their income insights
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-lg font-semibold"
                        >
                            Get Started Free
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center text-gray-400">
                    <p>© 2025 AI Income Predictor. Empowering financial decisions with AI.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;