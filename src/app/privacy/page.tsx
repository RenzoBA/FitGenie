import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">
          FitGenie<span className="text-2xl align-top">&reg;</span>
        </h1>
        <h2 className="text-2xl text-primary mt-5 tracking-widest">PRIVACY</h2>
      </div>
      <div className="text-justify text-muted-foreground mt-3 leading-relaxed space-y-5 max-w-3xl">
        <p>
          Effective Date: <span className="font-semibold">JUNE 2023</span>
        </p>
        <p>
          FitGenie<span className="text-sm align-top">&reg;</span> is committed
          to protecting your privacy and ensuring the proper handling of your
          personal data. This Privacy Policy describes how we collect, use, and
          share your information when you use the FitGenie application. By
          accessing and using our application, you agree to the terms outlined
          in this policy.
        </p>
        <ol className="list-inside list-decimal space-y-3">
          <li>
            <h3 className="font-semibold inline">Information We Collect</h3>
            <p>
              We may collect the following types of personal and non-personal
              information when you use FitGenie
              <span className="text-sm align-top">&reg;</span>:
            </p>
            <ul className="list-inside list-disc">
              <li>
                Registration Information: When you create an account on
                FitGenie, we may collect information such as your name, email
                address, date of birth, and gender.
              </li>
              <li>
                Usage Information: We collect information about your use of the
                application, including the workout routines and nutrition tips
                you access, the queries you make to the chatbot, and other
                interactions with the application.
              </li>
              <li>
                Device Information: We may collect information about your
                device, such as the device type, operating system version, and
                unique device identification.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="font-semibold inline">Use of the Application</h3>
            <p>
              FitGenie<span className="text-sm align-top">&reg;</span> grants
              you access to workout routines, nutrition tips, and sports
              supplementation through a chatbot powered by artificial
              intelligence. The use of the application is subject to applicable
              laws and regulations, and you agree to use it only for lawful
              purposes and in accordance with these terms and conditions.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">User Responsibility</h3>
            <p>
              You are responsible for any information you provide through
              FitGenie<span className="text-sm align-top">&reg;</span> and
              warrant that such information is accurate, up-to-date, and
              complete. You also agree to use the application responsibly and
              respectfully, without violating the rights of third parties or
              breaking the law.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">Intellectual Property</h3>
            <p>
              FitGenie<span className="text-sm align-top">&reg;</span> is owned
              by FitGenie Inc. and is protected by intellectual property laws.
              All intellectual property rights to the application and its
              content, including but not limited to text, graphics, images,
              videos, logos, and trademarks, are owned by FitGenie Inc. or its
              licensors. You are not granted any rights or licenses to the
              intellectual property of FitGenie
              <span className="text-sm align-top">&reg;</span>, except for the
              legitimate use of the application as permitted by these terms and
              conditions.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">Privacy</h3>
            <p>
              FitGenie<span className="text-sm align-top">&reg;</span> is
              committed to protecting your privacy and using your personal data
              in accordance with our Privacy Policy. By using the application,
              you agree to our collection, use, and disclosure of your personal
              data as outlined in that policy.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">Limitation of Liability</h3>
            <p>
              FitGenie<span className="text-sm align-top">&reg;</span> is not
              liable for any injuries, damages, or losses you may suffer as a
              result of using the application or the information provided
              through it. We recommend that you consult a healthcare
              professional before starting any exercise program or making
              significant changes to your diet or supplementation.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">
              Modifications and Termination
            </h3>
            <p>
              FitGenie<span className="text-sm align-top">&reg;</span> reserves
              the right to make modifications to the application, including its
              features, functionalities, and terms and conditions, at any time
              and without prior notice. Additionally, we reserve the right to
              terminate or suspend your access to the application if we believe
              you have violated these terms and conditions.
            </p>
          </li>
          <li>
            <h3 className="font-semibold inline">
              Applicable Law and Jurisdiction
            </h3>
            <p>
              These terms and conditions are governed by the laws of the country
              in which FitGenie Inc. is located. Any dispute arising in
              connection with the application shall be subject to the exclusive
              jurisdiction of the courts located in this country.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default page;
