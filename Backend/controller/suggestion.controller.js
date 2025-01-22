import Suggestion from "../model/suggestion.model.js"; // Import the Suggestion model

// Controller function to handle suggestion submission
export const submitSuggestion = async (req, res) => {
    const { name, email, suggestion, enquiryType } = req.body;

    // Validate required fields
    if (!name || !email || !suggestion || !enquiryType) {
        return res
            .status(400)
            .json({ message: "Name, email, suggestion, and enquiry type are required!" });
    }

    try {
        const suggestionRecord = new Suggestion({
            name,
            email,
            suggestion,
            enquiryType,
        });

        await suggestionRecord.save();
        res.status(200).json({ message: "Thank you for your suggestion!" });
    } catch (error) {
        res.status(500).json({ message: `Error saving suggestion: ${error.message}` });
    }
    
};
// Controller function to fetch all suggestions
export const getSuggestions = async (req, res) => {
    try {
        
        const suggestions = await Suggestion.find();
        res.status(200).json(suggestions); 
    } catch (error) {
        res.status(500).json({ message: `Error retrieving suggestions: ${error.message}` });
    }
};
