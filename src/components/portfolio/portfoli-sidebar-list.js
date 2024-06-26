import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PortfolioSidebarList = (props) => {
  const portfolioList = props.data.map((portfolioItem) => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        {/* idx = indice y pertenece al array y se duplicaria las keys props unique */}
        <div className="portfolio-thumb-image">
          <img src={portfolioItem.thumb_image_url} />
        </div>
        <h1 className="title">{portfolioItem.name}</h1>
        <h2>{portfolioItem.id}</h2>
        <a onClick={() => props.handleDeleteClick(portfolioItem)}>
          <FontAwesomeIcon icon="trash" />
          {/* <i className="fa fa-trash"></i>  en react icon = trash */}
        </a>
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
