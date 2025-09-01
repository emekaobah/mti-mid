import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[#454545] text-base">
          {question}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{answer}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
