const axios = require('axios');

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5001';

exports.predict = async (req, res) => {
    try {
        const inputData = req.body;

        // Forward to Flask ML service
        const response = await axios.post(`${FLASK_API_URL}/predict`, inputData);

        res.json({
            success: true,
            prediction: response.data.prediction,
            probability: response.data.probability,
            inputData: inputData
        });
    } catch (error) {
        console.error('Prediction error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error making prediction',
            error: error.message
        });
    }
};

exports.getRecommendation = async (req, res) => {
    try {
        const { prediction, inputData } = req.body;

        // Generate AI recommendation
        let recommendation = '';

        if (prediction === '<=50K') {
            recommendation = `Based on your profile analysis, your predicted income is below $50K. Here are personalized recommendations to increase your earning potential:

📚 **Education Enhancement**: With ${inputData.educationNum} years of education, consider pursuing advanced certifications or a higher degree in your field.

💼 **Career Development**: Working ${inputData.hoursPerWeek} hours per week in ${inputData.occupation}, explore opportunities for skill upgrades and leadership roles.

🚀 **Strategic Growth**: Consider transitioning to higher-paying sectors or industries. Networking and continuous learning are key to career advancement.

💡 **Additional Income Streams**: Explore freelancing, consulting, or side projects in your area of expertise to supplement your primary income.`;
        } else {
            recommendation = `Congratulations! Your profile indicates an income above $50K. Here are ways to maintain and grow your financial success:

📈 **Investment Planning**: With your strong income, focus on smart investments and wealth building strategies.

🎯 **Career Advancement**: Continue advancing in your ${inputData.occupation} field. Seek executive roles or specialized positions.

🌟 **Skill Diversification**: Stay ahead by learning emerging technologies and industry trends.

💰 **Financial Management**: Consider working with a financial advisor to optimize your earnings and plan for long-term wealth.`;
        }

        res.json({
            success: true,
            recommendation: recommendation
        });
    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating recommendation'
        });
    }
};