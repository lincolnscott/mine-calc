import React, { useState, useEffect } from "react";

type NavigationButtonsProps = {
  currentPage: number;
  TOTAL_PAGES: number;
  nextPage: () => void;
  prevPage: () => void;
};

type ItemProps = {
  imageSrc: string;
  altText: string;
};

type ItemGridProps = {
  currentPage: number;
  totalImages: number;
  imagesPerPage: number;
  itemNames: string[];
};

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};



const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentPage, TOTAL_PAGES, nextPage, prevPage }) => (
  <div id='nav' className='flex justify-between mb-8'>
    <img className='w-20 h-20 mx-4' src='../assets/img/button-prev.png' alt='' onClick={prevPage} />
    <h1 className='position-relative translate-y-1/4 text-4xl'>
      {currentPage + 1}/{TOTAL_PAGES}
    </h1>
    <img className='w-20 h-20 mx-4' src='../assets/img/button-next.png' alt='' onClick={nextPage} />
  </div>
);

const Item: React.FC<ItemProps> = ({ imageSrc, altText }) => (
  <div className='flex justify-center my-1'>
    <img src={imageSrc} alt={altText} style={{ imageRendering: "pixelated", width: "50px", height: "50px" }} />
    {/* Add any extra functionality or UI for the item here */}
  </div>
);

const ItemGrid: React.FC<ItemGridProps> = ({ currentPage, totalImages, imagesPerPage, itemNames }) => {
  const cols = 6;
  const rows = 10;

  return (
    <div id='item-display' className='grid grid-cols-6 justify-center'>
      {Array.from({ length: rows * cols }).map((_, index) => {
        const itemIndex = currentPage * imagesPerPage + index;
        const itemName = itemNames[itemIndex];
        if (itemName) {
          return <Item key={index} imageSrc={`../assets/vanilla/item/${itemName}.png`} altText={itemName} />;
        }
        return null;
      })}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemNames, setItemNames] = useState<string[]>([]);
  const TOTAL_PAGES = 17;
  const totalImages = 100; // This can be updated based on the actual number of items
  const cols = 6;
  const rows = 10;
  const imagesPerPage = cols * rows;

  useEffect(() => {
    // fetch item names from backend (this assumes you have an endpoint for this)
    fetch("http://localhost:3001/api/items")
      .then((response) => response.json())
      .then((data) => setItemNames(data))
      .catch((error) => console.error("Error fetching item names:", error));
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < TOTAL_PAGES - 1 ? prev + 1 : 0));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : TOTAL_PAGES - 1));
  };

  return (
    <div id='sidebar-container' className=''>
      <NavigationButtons currentPage={currentPage} TOTAL_PAGES={TOTAL_PAGES} nextPage={nextPage} prevPage={prevPage} />
      <ItemGrid
        currentPage={currentPage}
        totalImages={totalImages}
        imagesPerPage={imagesPerPage}
        itemNames={itemNames}
      />
    </div>
  );
};

export default Sidebar;
