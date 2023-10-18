import React, { useState } from "react";

type NavigationButtonsProps = {
  currentPage: number;
  TOTAL_PAGES: number;
  nextPage: () => void;
  prevPage: () => void;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentPage, TOTAL_PAGES, nextPage, prevPage }) => {
  return (
    <div id='nav' className='flex justify-between'>
      <img className='w-20 h-20 mx-4' src='/img/button-prev.png' alt='' onClick={prevPage} />
      <h1 className='position-relative translate-y-1/4 text-4xl'>
        {currentPage + 1}/{TOTAL_PAGES}
      </h1>
      <img className='w-20 h-20 mx-4' src='/img/button-next.png' alt='' onClick={nextPage} />
    </div>
  );
};

type ItemGridProps = {
  currentPage: number;
  totalImages: number;
  imagesPerPage: number;
};

const ItemGrid: React.FC<ItemGridProps> = ({ currentPage, totalImages, imagesPerPage }) => {
  const cols = 6;
  const rows = 10;

  return (
    <div id='item-display' className='grid grid-cols-6 justify-center'>
      {Array.from({ length: rows * cols }).map((_, index) => {
        const imageNumber = currentPage * imagesPerPage + index + 1;
        if (imageNumber <= totalImages) {
          return (
            <div key={index} className='flex justify-center m-2'>
              <img className='w-25 h-25' src={`/img/items/${imageNumber}.png`} alt={`Item ${imageNumber}`} />
            </div>
          );
        }
        return null; // Render nothing for cells beyond the total number of images
      })}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const TOTAL_PAGES = 17;
  const totalImages = 100;
  const cols = 6;
  const rows = 10;
  const imagesPerPage = cols * rows;

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setCurrentPage(TOTAL_PAGES - 1);
    }
  };

  return (
    <div id='sidebar-container' className=''>
      {" "}
      {/* You can style this container as needed */}
      <NavigationButtons currentPage={currentPage} TOTAL_PAGES={TOTAL_PAGES} nextPage={nextPage} prevPage={prevPage} />
      <ItemGrid currentPage={currentPage} totalImages={totalImages} imagesPerPage={imagesPerPage} />
    </div>
  );
};

export default Sidebar;
