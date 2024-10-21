import React from 'react';
import './Filter.scss';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';
import { useNavigate, useParams } from 'react-router-dom';

const Filter = () => {
  const { setSort } = useFilterContext();
  const { category, metaCategory, subCategory, fit } = useParams();
  const navigate = useNavigate();

  const viewAllSubCats = `/sub-categories?[filters][categories][title][$eq]=${category}&[filters][meta_categories][title][$eq]=${metaCategory}`;
  
  const subCatFit = `/fits?[filters][categories][title][$eq]=${category}&[filters][sub_categories][title][$eq]=${subCategory}`;
  
  const apiUrl = !subCategory ? viewAllSubCats : subCatFit;

  const { data } = useFetch(apiUrl);
  
  const handleSubCatChange = (index) => {
    if (!subCategory) {
      const selectedSubCatValue = data && data[index] ? data[index].attributes.title : '';
      navigate(`/products/${category}/${metaCategory}/${selectedSubCatValue}`);
    } else if (index === -1) {
      navigate(`/products/${category}/${metaCategory}/${subCategory}`);
    } else {
      const selectedFitValue = data && data[index] ? data[index].attributes.title : '';
      navigate(`/products/${category}/${metaCategory}/${subCategory}/${selectedFitValue}`);
    }
  };

  const removeSubCategory = () => {
    navigate(`/products/${category}/${metaCategory}`);
  }

  return (
     <div className="filter">
        <ul className="form-control-container">
          <h6>Sort by</h6>
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
        <h6>{!subCategory ? 
        `${category !== 'accessories' ? 
        `${category}'s ${metaCategory}` : `${category}`}` : `Type of ${subCategory}`}
        </h6>
        {data?.map((subCats, index) => (
          <li className='form-control' id={subCats.id} key={subCats.id}>
            <input
              type='radio'
              name='subCategory'
              id={subCats.id}
              value={subCats.id}
              onChange={() => handleSubCatChange(index)}
              checked={subCategory === subCats.attributes.title}
            />
            <label htmlFor={subCats.attributes.title}> {subCats.attributes.title} </label>
          </li>
        ))}
        { fit && <li className='form-control'>
          <input
            type='radio'
            name='fit'
            id='fit'
            value=''
            onChange={() => handleSubCatChange(-1)}
            checked={!subCategory} 
          />
          <label htmlFor='allProducts'> All {!subCategory ? 'products' : subCategory}</label>
        </li>}
        { subCategory && <li className='form-control'>
          <input
            type='radio'
            name='subCategory'
            id='allProducts'
            value=''
            onClick={() => removeSubCategory()}
            checked={!subCategory} 
          />
          <label htmlFor='allProducts'>{category} {metaCategory} Collection</label>
        </li>}
      </ul>
      </div> 
  );
}

export default Filter;
