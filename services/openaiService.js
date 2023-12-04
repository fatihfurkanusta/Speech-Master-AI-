require("dotenv").config();
const OpenAI = require("openai");

// Create a OpenAI connection
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var threadId = "";

async function main(userInput){
    try{
        const assistant = await openai.beta.assistants.retrieve(
            process.env.ASSISTANT_ID
        );
        
        if(threadId === ""){
            const thread = await openai.beta.threads.create();
            threadId = thread.id;
        }

        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: userInput,
        });
        console.log("Message : 11111111111111111111111111111111");
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistant.id,
        });
        console.log("RUN: 222222222222222222222222222222222");
        let runStatus = await openai.beta.threads.runs.retrieve(
            threadId,
            run.id
        );
        console.log("RUN STATUS : 3333333333333333333333333333");
        while (runStatus.status !== "completed") {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        }
        console.log("While Loop runSTATUS!=='completed' 4444444444444444444444");

        const messages = await openai.beta.threads.messages.list(threadId);
        console.log("MESSAGES : 555555555555555555555555");
        const lastMessageForRun = messages.data.filter(
            (message) => message.run_id === run.id && message.role === "assistant").pop();
        console.log("LAST MESSAGEFRORUN: 66666666666666666666666");
        if (lastMessageForRun) {
            console.log(`${lastMessageForRun.content[0].text.value} \n`);
        }
        console.log("OVERR");

        return `${lastMessageForRun.content[0].text.value}`;        
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    main
};