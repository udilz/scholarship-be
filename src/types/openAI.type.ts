interface MessageContent {
    type:string;
    text:string;
 }
 interface Message {
    role: "system" | "user";
    content:MessageContent[];
 }
 interface ChatCompletionMessageParam {
    role: "system" | "user" | "assistant"; // Define possible roles
    content: string; // Content of the message
 }

 export type { Message, MessageContent, ChatCompletionMessageParam }