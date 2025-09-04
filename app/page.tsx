"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GatewayCard from "@/components/landing/gateway-card";
import { FaqItem } from "@/components/faq";
import CountryInsights from "@/components/landing/country-insights";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { authStorage } from "@/lib/auth-storage";

const gatewayCards = [
  {
    title: "Discover Opportunities",
    description:
      "Find real-time trade requests from African countries looking for Nigerian products and services.",
    image: "/glass.png",
    color: "rgba(7, 67, 24, 1)",
  },
  {
    title: "Share Trade Needs",
    description:
      "Governments, businesses, and partners easily submit what they want to buy or sell through forms and quick quizzes..",
    image: "/notes.png",
    color: "rgba(6, 55, 20, 1)",
  },
  {
    title: "Verified Market Insights",
    description:
      "Access accurate, trusted data on demand patterns, compliance requirements, and market trends across Africa..",
    image: "/checkmark.png",
    color: "rgba(6, 55, 20, 1)",
  },
  {
    title: "Connect and Grow",
    description:
      "Directly connect with verified buyers, partners, and government contacts to expand Nigerian exports.",
    image: "/handshake.png",
    color: "rgba(7, 67, 24, 1)",
  },
];

const faqItems = [
  {
    question: "Who can use this platform?",
    answer:
      "Businesses and exporters in Nigeria seeking trade opportunities across Africa.",
  },
  {
    question: "How do I submit a trade request?",
    answer:
      "Click on the 'Sell to Nigeria' or 'Buy from Nigeria' button on the home page. You'll receive a confirmation email once your request is submitted.",
  },
  {
    question: "What products or services can I offer?",
    answer: "Any products or services legally allowed for export from Nigeria.",
  },
  {
    question: "What market insights can I access?",
    answer:
      "Trade requests, real-time demand trends, compliance requirements, and country-specific opportunities.",
  },
  {
    question: "Is support available?",
    answer:
      "Yes. Contact us via info@fmiti.gov.ng or call +234 123-456-7890 / +234 987-654-3210 for assistance.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. All data is encrypted and accessible only to authorized users.",
  },
  {
    question: "How can I withdraw my consent for the use of my personal data?",
    answer:
      "You may withdraw your consent at any time by contacting the system administrator.",
  },
];
export default function Home() {
  const router = useRouter();

  const handleTradeAction = (tradeDirection: string) => {
    // Check if user is authenticated (includes token expiration check)
    if (!authStorage.isAuthenticated()) {
      console.log(
        "User not authenticated or token expired, redirecting to login"
      );
      router.push("/login");
      return;
    }

    // Get current user data directly from localStorage
    const currentUser = authStorage.getUser();
    console.log("Current user from localStorage:", currentUser);

    // If authenticated, navigate to the form with the trade direction
    router.push(`/form?tradeDirection=${tradeDirection}`);
  };

  return (
    <main className=" bg-[#F9F7F1] ">
      <div className="text-center mx-auto flex flex-col items-center justify-center px-4 pb-40  pt-15 lg:px-15">
        <h1 className="text-3xl font-bold  text-[#074318] max-w-md ">
          Unlock African Markets with Real-Time Trade Intelligence{" "}
        </h1>
        <p className="text-muted-foreground max-w-lg mt-3">
          Empowering Nigerian exporters with real-time market intelligence,
          verified trade requests, and direct connections across Africa.
        </p>
        <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center items-center">
          <Button
            onClick={() => handleTradeAction("sell_to_nigeria")}
            className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px] bg-[#DCF5EA] hover:bg-[#DCF5EA]/90 text-[#074318] text-base font-semibold"
          >
            Sell to Nigeria
          </Button>
          <Button
            onClick={() => handleTradeAction("buy_from_nigeria")}
            className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px] bg-[#DCF5EA] hover:bg-[#DCF5EA]/90 text-[#074318] text-base font-semibold"
          >
            Buy from Nigeria{" "}
          </Button>
        </div>
      </div>

      {/* Country Insights */}
      <div className="bg-[#0A5C21]  px-4 lg:px-16 pt-16 pb-20">
        <div className="-mt-36 ">
          <CountryInsights />
        </div>
      </div>

      {/* Gateway */}
      <div className=" bg-[#FBFFFD] pt-24 pb-16 lg:px-15 px-4 ">
        <h2 className="text-2xl text-center font-semibold text-[#074318]">
          Nigeria&apos;s Gateway to African Markets
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8 mt-10 ">
          {gatewayCards.map((card) => (
            <GatewayCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <div className="bg-[#074318]  flex w-full p-4 lg:p-15">
        <div className="rounded-lg lg:p-12 p-4 bg-white w-full flex flex-col lg:flex-row gap-6 lg:gap-44">
          <div>
            <h3 className="text-3xl font-semibold text-[#074318] max-w-[271px]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-lg">
            {faqItems.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
