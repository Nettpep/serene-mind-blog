import React, { useEffect, useState } from 'react';
import { TocItem } from '../types';

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden lg:block sticky top-32 self-start ml-8 p-6 border-l border-neutral-800 max-w-[250px]">
      <h4 className="text-gray-400 uppercase text-xs tracking-[0.2em] mb-6 font-bold">สารบัญ</h4>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-all duration-300 font-light ${
                activeId === item.id
                  ? 'text-accent translate-x-1 font-normal'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth'
                });
                setActiveId(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;