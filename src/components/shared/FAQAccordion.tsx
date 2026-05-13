import { useState, useCallback } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="py-0">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start justify-between gap-4 py-4 text-left bg-transparent border-none cursor-pointer group"
            >
              <h4 className="font-heading text-[13px] md:text-sm font-semibold text-navy leading-snug">
                {item.q}
              </h4>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-border flex items-center justify-center transition-all duration-200 ${
                  isOpen ? 'border-gold bg-gold rotate-180' : 'group-hover:border-gold'
                }`}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed pb-4 pt-0">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
