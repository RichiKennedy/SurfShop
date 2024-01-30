import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [selectedFit, setSelectedFit] = useState('');
  const [sort, setSort] = useState('');

  return (
    <FilterContext.Provider
      value={{
        shouldNavigate, 
        setShouldNavigate,
        selectedCategory,
        setSelectedCategory,
        selectedSubCat,
        setSelectedSubCat,
        selectedFit,
        setSelectedFit,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
