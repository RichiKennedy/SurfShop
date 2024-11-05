import React from 'react';
import './Filter.scss';
import useFetch from '../../Hooks/useFetch';
import { useFilterContext } from '../../Context/filterContext';
import { useNavigate, useParams } from 'react-router-dom';

const Filter = () => {
  const { setSort } = useFilterContext();
  const { category, metaCategory, subCategory, fit } = useParams();
  const navigate = useNavigate();

  const metaCategoryApi = `/meta-categories?[filters][categories][title][$eq]=${category}&populate[sub_categories][filters][categories][title][$eq]=${category}`;
  const viewAllSubCats = `/sub-categories?[filters][categories][title][$eq]=${category}&[filters][meta_categories][title][$eq]=${metaCategory}`;
  const subCatFit = `/fits?[filters][categories][title][$eq]=${category}&[filters][sub_categories][title][$eq]=${subCategory}`;

  const { data: metaCategories } = useFetch(metaCategoryApi);
  const { data: subCategories } = useFetch(viewAllSubCats);
  const { data: fits } = useFetch(subCatFit);

  const handleSubCatChange = (subCatTitle, metaCatTitle) => {
    if (subCatTitle !== subCategory) {
      navigate(`/products/${category}/${metaCatTitle}/${subCatTitle}`);
    }
  };

  const handleFitChange = (selectedFit) => {
    if (selectedFit === fit) {
      navigate(`/products/${category}/${metaCategory}/${subCategory}`);
    } else {
      navigate(`/products/${category}/${metaCategory}/${subCategory}/${selectedFit}`);
    }
  };

  const handleMetaCatViewAll = (metaCatTitle) => {
    navigate(`/products/${category}/${metaCatTitle}`);
  };

  const handleSubCatViewAll = (subCatTitle) => {
    navigate(`/products/${category}/${metaCategory}/${subCatTitle}`);
  };

  const navigateToCategory = () => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="filter">
      <ul className="form-control-container">
        <h6>Sort by</h6>
        <li className="form-control">
          <input type="radio" value="lowToHigh" name="sort-by" id="lowToHigh" onChange={() => setSort('asc')} />
          <label htmlFor="lowToHigh"> Price (Low to High)</label>
        </li>
        <li className="form-control">
          <input type="radio" value="highToLow" name="sort-by" id="highToLow" onChange={() => setSort('desc')} />
          <label htmlFor="highToLow"> Price (High to Low)</label>
        </li>
      </ul>

      {!metaCategory && !subCategory ? (
        metaCategories?.map((metaCat) => (
          <ul key={metaCat.id} className="form-control-container">
            <h6>{metaCat.attributes.title}</h6>
            {metaCat.attributes.title !== 'featured' && (
              <li className="form-control">
                <input
                  type="radio"
                  name={`${metaCat.attributes.title}-subCategory`}
                  id={`${metaCat.attributes.title}-all`}
                  value="all"
                  onChange={() => handleMetaCatViewAll(metaCat.attributes.title)}
                />
                <label htmlFor={`${metaCat.attributes.title}-all`}>{category}'s {metaCat.attributes.title}</label>
              </li>
            )}
            {(metaCat.attributes.sub_categories?.data || []).map((subCat) => (
              <li key={subCat.id} className={`form-control ${subCategory === subCat.attributes.title ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`${metaCat.attributes.title}-subCategory`}
                  id={subCat.id}
                  value={subCat.attributes.title}
                  onChange={() => handleSubCatChange(subCat.attributes.title, metaCat.attributes.title)}
                  checked={subCategory === subCat.attributes.title}
                />
                <label htmlFor={subCat.id}> {subCat.attributes.title} </label>
              </li>
            ))}
          </ul>
        ))
      ) : (
        <>
          <ul className="form-control-container">
            <h6>{`${category}'s ${metaCategory}`}</h6>
            {metaCategory !== 'featured' && subCategory ? (
              <li className="form-control">
                <input
                  type="radio"
                  name="subCategory"
                  id="viewAllSubCategories"
                  value="all"
                  onChange={() => handleMetaCatViewAll(metaCategory)}
                />
                <label htmlFor="allSubCategories">{`all ${category}'s ${metaCategory}`}</label>
              </li>
            ) : ''}
            {subCategories?.map((subCat) => (
              <li key={subCat.id} className={`form-control ${subCategory === subCat.attributes.title ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="subCategory"
                  id={subCat.id}
                  value={subCat.attributes.title}
                  onChange={() => handleSubCatChange(subCat.attributes.title, metaCategory)}
                  checked={subCategory === subCat.attributes.title}
                />
                <label htmlFor={subCat.id}> {subCat.attributes.title} </label>
              </li>
            ))}
          </ul>

          {subCategory && (
            <ul className="form-control-container">
              <h6>Type of {subCategory}</h6>
              {fit && (    
              <li className="form-control">
                <input
                  type="radio"
                  name="fit"
                  id="viewAllFits"
                  value="all"
                  onChange={() => handleSubCatViewAll(subCategory)}
                />
                <label htmlFor="allSubCategories">{`all ${category}'s ${subCategory}`}</label>
              </li>
              )}
              {fits?.map((fitItem) => (
                <li key={fitItem.id} className="form-control">
                  <input
                    type="radio"
                    name="fit"
                    id={fitItem.id}
                    value={fitItem.attributes.title}
                    onChange={() => handleFitChange(fitItem.attributes.title)}
                    checked={fitItem.attributes.title === fit}
                  />
                  <label htmlFor={fitItem.attributes.title}> {fitItem.attributes.title} </label>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {metaCategory && (
      <ul className="form-control-container">
        <h6>Back To...</h6>
        <li className="form-control">
          <input
            type="radio"
            name="backToCategory"
            id="backToCategory"
            value=""
            onClick={() => navigateToCategory()}
          />
          <label htmlFor="backToCategory">{category}'s Collection</label>
        </li>
      </ul>
      )}
    </div>
  );
};

export default Filter;
