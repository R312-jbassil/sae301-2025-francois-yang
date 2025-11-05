import { OpenAI } from 'openai';


const HF_TOKEN = import.meta.env.HF_TOKEN;
const NOM_MODEL = import.meta.env.HF_MODEL;
const BASE_URL = import.meta.env.HF_URL;


export const POST = async ({ request }) => {
    
    let messages = await request.json();
   
    if (!Array.isArray(messages)) {
        messages = [messages];
    }

    
    const client = new OpenAI({
        baseURL: BASE_URL,
        apiKey: HF_TOKEN,
    });

    
    const SystemMessage = {
        role: "system",
        content: "You are an SVG code generator. Generate SVG code for the following messages. Make sure to include ids for each part of the generated SVG.",
    };

   
    const chatCompletion = await client.chat.completions.create({
        model: NOM_MODEL,
        messages: [SystemMessage, ...messages],
    });

   
    if (
        !chatCompletion ||
        !chatCompletion.choices ||
        chatCompletion.choices.length === 0 ||
        !chatCompletion.choices[0].message
    ) {
        return new Response(
            JSON.stringify({ error: "Aucune réponse du modèle IA." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

   
    const message = chatCompletion.choices[0].message.content || "";

 
    const svgMatch = message.match(/<svg[\s\S]*?<\/svg>/i);

  
    return new Response(
        JSON.stringify({ svg: svgMatch ? svgMatch[0] : "" }),
        { headers: { "Content-Type": "application/json" } }
    );
};

