import React from "react";

const NewsItem = (props) =>
 {


  
    let { title, description, imageUrl,newsUrl,author,date,source} = props;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " style={{left:'90%', zIndex: 1}}>{source}</span>
          <img src={!imageUrl?"https://i.ndtvimg.com/i/2016-04/china-pak-flag-reuters_650x400_61460195347.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
