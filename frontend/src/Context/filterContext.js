import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMetaCategory, setSelectedMetaCategory] = useState('')
  const [selectedSubCat, setSelectedSubCat] = useState('');
  const [selectedFit, setSelectedFit] = useState('');
  const [sort, setSort] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [popUpMenuCategory, setPopUpMenuCategory] = useState(null);
  const [productSelected, setProductSelected] = useState(false);
  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSubCat,
        setSelectedSubCat,
        selectedFit,
        setSelectedFit,
        sort,
        setSort,
        openFilter, 
        setOpenFilter,
        popUpMenuCategory, 
        setPopUpMenuCategory,
        productSelected, 
        setProductSelected,
        selectedMetaCategory, 
        setSelectedMetaCategory
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
