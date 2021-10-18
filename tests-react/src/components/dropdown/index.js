import { useState } from "react";

export default function Dropdown({ title, options, onSelect }) {
  const [isOpen, setIsopen] = useState(false);

  function handleSelection(ling) {
    onSelect(ling);
    setIsopen(false);
  }

  return (
    <div>
      <button
        name={title}
        onClick={() => {
          setIsopen(!isOpen);
        }}
      >
        {title}
      </button>

      {isOpen && (
        <ul>
          {options.map((ling, i) => {
            return (
              <li key={i} onClick={() => handleSelection(ling)}>
                {ling}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
