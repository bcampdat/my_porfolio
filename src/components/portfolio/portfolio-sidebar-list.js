import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PortfolioSidebarList = (props) => {
  const portfolioList = props.data.map((portfolioItem) => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        {/* idx = indice y pertenece al array y se duplicaria las keys props unique */}
        <div className="portfolio-thumb-image">
          <img src={portfolioItem.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{portfolioItem.name}</div>

          <div className="actions">
            {/* <h2>{portfolioItem.id}</h2> */}
            <a
              // className="edit-icon"
              className="action-icon"
              onClick={() => props.handleEditClick(portfolioItem)}
            >
              <FontAwesomeIcon icon="edit" />             
            </a>
            <a
              // className="delete-icon"
              className="action-icon"
              onClick={() => props.handleDeleteClick(portfolioItem)}
            >
              <FontAwesomeIcon icon="trash" />
              {/* <i className="fa fa-trash"></i>  en react icon = trash */}
            </a>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="portfolio-sidebar-list-wrapper">
      {/* <h1>List......</h1> */}
      {portfolioList}
    </div>
  );
};
export default PortfolioSidebarList;
