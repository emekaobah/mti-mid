import TradeRequestsChart from "@/components/trade-requests-chart";
import TopRequestedSectorsChart from "@/components/top-requested-sectors-chart";
import Link from "next/link";
import Image from "next/image";
import GatewayCard from "@/components/landing/gateway-card";
import { FaqItem } from "@/components/faq";

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
    question: "How can I submit a trade request?",
    answer:
      "You can submit a trade request through our online form or by contacting our support team.",
  },
  {
    question: "What types of products and services can I offer?",
    answer:
      "You can offer any products or services that are legally allowed for export from Nigeria.",
  },
  {
    question: "How do I know if my trade request has been received?",
    answer:
      "You will receive a confirmation email once your trade request has been submitted successfully.",
  },
  {
    question: "What should I do if I don't receive a confirmation email?",
    answer:
      "If you don't receive a confirmation email, please check your spam folder or contact our support team for assistance.",
  },
  {
    question: "What if I need help with my trade request?",
    answer:
      "If you need help with your trade request, please contact our support team for assistance.",
  },
];
export default function Home() {
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
        <div className="flex flex-col md:flex-row  gap-6 mt-8">
          <Link
            href="/form"
            className="flex items-center justify-center space-x-2 rounded-full h-12 w-full min-w-[240px] bg-[#DCF5EA] hover:bg-[#DCF5EA]/90 text-[#074318] text-base font-semibold"
          >
            Sell to Nigeria
          </Link>
          <Link
            href="/form"
            className="flex items-center justify-center space-x-2 rounded-full h-12 w-full min-w-[240px] bg-[#DCF5EA] hover:bg-[#DCF5EA]/90 text-[#074318] text-base font-semibold"
          >
            Buy from Nigeria{" "}
          </Link>
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
        <div className="rounded-lg p-12 bg-white w-full flex flex-col lg:flex-row gap-6 lg:gap-44">
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

      {/* <div className="mx-auto max-w-6xl rounded-2xl border border-border p-6 bg-card">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TradeRequestsChart />
          <TopRequestedSectorsChart />
        </div>
      </div> */}
    </main>
  );
}
