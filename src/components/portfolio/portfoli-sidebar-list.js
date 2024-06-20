import React from "react";

const PortfolioSidebarList = (props) => {
  const portfolioList = props.data.map((portfolioItem) => {
    return (
      <div key = {portfolioItem.id} className="portfolio-item-thumb">
        {/* idx = indice y pertenece al array y se duplicaria las keys props unique */}
        <div className="portfolio-thumb-image">
          <img src={portfolioItem.thumb_image_url} />
        </div>
        <h1 className="title">{portfolioItem.name}</h1>
        <h2>{portfolioItem.id}</h2>
      </div>
    );
  });

  return (
    <div className="portfolio-sidebar-list-wrapper">
      {/* <h1>List......</h1> */}
      <h1>{portfolioList}</h1>
    </div>
  );
};
export default PortfolioSidebarList;
