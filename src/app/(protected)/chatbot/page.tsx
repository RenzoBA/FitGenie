import ChatBot from "@/components/Chatbot";
import MessagesLiked from "@/components/MessagesLiked";

const page = async () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">CHATBOT</h1>
      </div>
      <div className="text-justify text-muted-foreground mt-3 leading-relaxed space-y-5 max-w-7xl w-full">
        <h3 className="font-light text-muted-foreground uppercase tracking-widest text-center">
          Messages saved
        </h3>
        <MessagesLiked />
      </div>
      <ChatBot />
    </div>
  );
};

export default page;
