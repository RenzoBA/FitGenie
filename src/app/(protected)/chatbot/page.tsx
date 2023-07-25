import ChatBot from "@/components/Chatbot";
import MessagesLiked from "@/components/MessagesLiked";

const page = async () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">
          FitGenie<span className="text-2xl align-top">&reg;</span>
        </h1>
        <h2 className="text-2xl text-primary mt-5 tracking-widest">CHAT</h2>
      </div>
      <div className="text-justify text-muted-foreground mt-3 leading-relaxed space-y-5 max-w-7xl">
        <h3 className="text-lg text-primary tracking-widest">
          Messages saved:
        </h3>
        <MessagesLiked />
        <ChatBot />
      </div>
    </div>
  );
};

export default page;
