// Finish the code here.
// Feel free to modify any of the code in this project, this is just a starting point if it's helpful.
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import "./combo-box.scss"
import { dropdownData } from "./data"

export const ComboBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(dropdownData);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  //handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  //filter options
  useEffect(() => {
    setFilteredOptions(
      dropdownData.filter((data) =>
        data.label.toLowerCase().includes(searchInput.toLowerCase().trim())
      )
    );
  }, [searchInput]);

  //select an option
  const handleOptionClick = (option: (typeof dropdownData)[0]) => {
    setSearchInput(option.label);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };
  
  //user navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((index) =>
          index < filteredOptions.length - 1 ? index + 1 : index
        );
        setIsOpen(true);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((index) => (index > 0 ? index - 1 : index));
        setIsOpen(true);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
          setSearchInput(filteredOptions[selectedIndex].label);
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  //input loses focus
  useEffect(() => {
    const handleLoseFocus = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleLoseFocus);
    return () => {
      document.removeEventListener("mousedown", handleLoseFocus);
    };
  }, []);

  return (
    <div className="combo-box">
      <input
        ref={inputRef}
        type="Input"
        value={searchInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="combo-box-listbox"
        aria-haspopup="listbox"
        placeholder="Search here"
      />
      {isOpen && (
        <ul
          ref={listRef}
          className="combo-box-options"
          role="listbox"
          id="combo-box-listbox"
        >
          {filteredOptions.length !== 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={index === selectedIndex}
                className={`combo-box-option ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="no-results">No results</li> //no results found
          )}
        </ul>
      )}
    </div>
  );
}