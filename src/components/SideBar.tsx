import React from 'react';
import { Category, Services } from '../pages/Services'
import _ from "lodash"


interface filterSideBarProps {
  listElementCategories: Category[];
}




const SideBar = ({ listElementCategories }: filterSideBarProps) => {

    const categories = _.uniq(listElementCategories.map((categorie) => categorie.intitule))
    console.log("-----------------categories", categories);
  return (
    <div>
      <div className="custom-side-bar flex-shrink-0 bg-warning border-end">
        <div className="p-3 border-bottom">
          <span className="fs-5 fw-semibold">Filtres</span>
        </div>
        <ul className="list-unstyled ps-0">
          <div className="p-3">
            <p className="mb-1 fs-5 fw-semibold">Catégories</p>
            {categories.map((categ, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={categ}
                  id={categ}
                />
                <label className="form-check-label" htmlFor={categ}>
                  {" "}
                  {categ}
                </label>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
