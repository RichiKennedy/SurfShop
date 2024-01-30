import React, { useEffect } from 'react';
import './Filter.scss';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';
import { useNavigate } from 'react-router-dom';


const Filter = () => {
  const {
    shouldNavigate,
    setShouldNavigate,
    selectedCategory,
    selectedSubCat,
    setSelectedSubCat,
    selectedFit,
    setSelectedFit,
    setSort,
  } = useFilterContext();
  const navigate = useNavigate();
  const viewAllSubCats = `/sub-categories?[filters][categories][title][$eq]=${selectedCategory}`;
  const subCatFit = `/fits?[filters][sub_categories][title][$eq]=${selectedSubCat}`;
  const apiUrl = !selectedSubCat ? viewAllSubCats : subCatFit;

  const { data } = useFetch(apiUrl);
  
  const handleSubCatChange = (index) => {
    if (!selectedSubCat) {
      const selectedSubCatValue = data && data[index] ? data[index].attributes.title : '';
      setSelectedSubCat(selectedSubCatValue);
      setShouldNavigate(true);

    } else {
      const selectedFitValue = data && data[index] ? data[index].attributes.title : '';
      setSelectedFit(selectedFitValue);
      setShouldNavigate(true);
    }
  };

  const removeSubCategory = () => {
    setSelectedSubCat('');
    setSelectedFit('');
    setShouldNavigate(true);
  }

  const navigateIfNeeded = () => {
    if (shouldNavigate) {
      let path = `/products/${selectedCategory}`

      if (selectedSubCat) {
        path += `/${selectedSubCat}`;
        if (selectedFit) {
          const encodedFit = selectedFit.replace(/\s/g, '-');
          path += `/${encodedFit}`;
        }
      };

      navigate(path);

      setShouldNavigate(false);
    }
  };

  useEffect(() => {
    navigateIfNeeded()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldNavigate])

  return (
     <div className="filter">
        <ul className="form-control-container">
          <h6>sort by</h6>
          <li className='form-control'>
              <input type='radio' value='lowToHigh' name='sort-by' id='lowToHigh'onChange={e => setSort('asc') } />
            <label htmlFor='asc'> Price (Low to High)</label>
          </li>
          <li className='form-control'>
              <input type='radio' value='highToLow' name='sort-by' id='highToLow' onChange={e => setSort('desc')} />
            <label htmlFor='desc'> Price (High to Low)</label>
          </li>
        </ul>
        
        <ul className="form-control-container">
        <h6>{!selectedSubCat ? 
        `${selectedCategory !== 'accessories' ? 
        `${selectedCategory}'s clothing` : `${selectedCategory}`}` : `type of ${selectedSubCat}`}
        </h6>
        {data?.map((subCats, index) => (
          <li className='form-control' id={subCats.id} key={subCats.id}>
            <input
              type='radio'
              name='subCategory'
              id={subCats.id}
              value={subCats.id}
              onChange={() => handleSubCatChange(index)}
              checked={selectedSubCat === subCats.attributes.title}
            />
            <label htmlFor={subCats.attributes.title}> {subCats.attributes.title} </label>
          </li>
        ))}
        { selectedFit && <li className='form-control'>
          <input
            type='radio'
            name='fit'
            id='fit'
            value=''
            onChange={() => handleSubCatChange(-1)}
            checked={!selectedSubCat} 
          />
          <label htmlFor='allProducts'> All {!selectedSubCat ? 'products' : selectedSubCat}</label>
        </li>}
        { selectedSubCat && <li className='form-control'>
          <input
            type='radio'
            name='subCategory'
            id='allProducts'
            value=''
            onClick={() => removeSubCategory()}
            checked={!selectedSubCat} 
          />
          <label htmlFor='allProducts'>{selectedCategory} collection</label>
        </li>}
      </ul>
      </div> 
  )
}
export default Filter;