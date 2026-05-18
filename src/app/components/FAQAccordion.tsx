import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <Accordion.Item
            value={`item-${index}`}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-300 hover:shadow-lg transition-all"
          >
            <Accordion.Trigger className="flex justify-between items-center w-full p-8 hover:bg-yellow-50/50 transition-colors group">
              <span className="text-left text-lg font-medium">{item.question}</span>
              <ChevronDown className="w-6 h-6 text-yellow-600 transition-transform group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
            </Accordion.Trigger>
            <Accordion.Content className="px-8 pb-8 pt-2 text-gray-600 text-lg leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        </motion.div>
      ))}
    </Accordion.Root>
  );
}
