const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://Abdullah:UDiCyrwp8pNW6oDK@abdullah.8x4fj4e.mongodb.net/Abdullah
?retryWrites=true&w=majority&appName=Abdullah`; // Replace this with your actual connection string
const client = new MongoClient(uri);

async function handleMessage(userMessage) {
    try {
        await client.connect();
        const database = client.db('mydb'); // Replace with your database name
        const collection = database.collection('mycollection'); // Replace with your collection name

        // Store user message in the database
        const messageDoc = { message: userMessage, timestamp: new Date() };
        await collection.insertOne(messageDoc);

        // Example: Retrieve some response based on the user message
        const responseDoc = await collection.findOne({ someField: "someValue" }); // Customize your query

        return responseDoc ? responseDoc.response : "Sorry, I don't understand.";
    } catch (error) {
        console.error(error);
        return "An error occurred.";
    } finally {
        await client.close();
    }
}

// Example usage in chatbot logic
const userMessage = "Hello, chatbot!";
handleMessage(userMessage).then(response => {
    console.log("Chatbot response:", response);
});
