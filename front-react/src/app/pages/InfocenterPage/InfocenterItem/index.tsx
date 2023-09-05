import classNames from "classnames";
import { PropsWithChildren, useRef, useState } from "react";

export type InfocenterItemProps = PropsWithChildren<{
  title: string;
}>;

export function InfocenterItem(props: InfocenterItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  const handleHeaderClick = () => {
    const nextOpened = !opened;

    setOpened(nextOpened);

    if (contentRef.current) {
      if (nextOpened) {
        const scrollHeight = contentRef.current.scrollHeight;
        setMaxHeight(scrollHeight);
      } else {
        setMaxHeight(undefined);
      }
    }
  };

  return (
    <div className="infocenter__item">
      <div
        className={classNames("infocenter__item-header", { active: opened })}
        onClick={handleHeaderClick}
      >
        <h3 className="infocenter__item-label">{props.title}</h3>
        <img
          className="infocenter__item-arrow"
          src="/img/icons/arrow-down.svg"
          alt="arrow"
        />
      </div>
      <div
        className="infocenter__item-content"
        style={{ maxHeight: maxHeight }}
        ref={contentRef}
      >
        {props.children}
      </div>
    </div>
  );
}

// function toggleAccordion() {
//   if (openAccordion && openAccordion !== this) {
//     // Если есть открытый аккордеон, который не совпадает с текущим
//     openAccordion.classList.remove('active'); // закрыть его
//     const openAccordionContent = openAccordion.nextElementSibling;
//     if (openAccordionContent) {
//       // если у аккордеона есть содержимое
//       openAccordionContent.style.maxHeight = null; // сбросить высоту контента
//     }
//   }

//   this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

//   const content = this.nextElementSibling;
//   if (content) {
//     // если у аккордеона есть содержимое
//     if (content.style.maxHeight) {
//       // Если контент открыт, закрыть его
//       content.style.maxHeight = null;
//     } else {
//       // Если контент закрыт, открыть его
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   }

//   openAccordion = this; // запомнить ссылку на открытый аккордеон
// }
