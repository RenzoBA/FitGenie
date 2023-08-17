import { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">ABOUT</h1>
      </div>
      <div className="text-justify text-muted-foreground mt-3 leading-relaxed space-y-5 max-w-3xl">
        <p>
          We understand that starting in the world of fitness can be
          overwhelming, especially if you feel lost or do not know where to
          begin. That is why we created this platform, to make your experience
          simple, practical, and motivating. Our embedded chatbot will guide you
          step by step, adapting to your needs and providing recommendations
          based on your goals, fitness level, and preferences.
        </p>
        <p>
          But it is not just about routines and tips; our goal is to build a
          supportive community where you can find inspiration, share your
          accomplishments, and connect with people who share your passion for
          fitness. Additionally, we are committed to keeping you updated with
          the latest trends and discoveries in the world of training and
          nutrition.
        </p>
        <p>
          Ultimately, we are here to be your virtual fitness companion, giving
          you the necessary boost to stay motivated and achieve your goals
          effectively. Join our community and discover what you can accomplish
          with our help!
        </p>
        <p>
          Whether you are an absolute beginner or a fitness enthusiast, we are
          here to support you every step of the way. It is time to take the
          first step towards a healthier and active lifestyle!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
