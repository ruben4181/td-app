import React from "react";

class Pagination extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      config : props.config,
      onNext : props.onNext,
      onBack : props.onBack,
      onItem : props.onItem
    }
    this.renderItems = this.renderItems.bind(this);
  }
  render(){
    return(
      <>
        <nav aria-label="...">
          <ul className="pagination">
            {this.renderItems()}
          </ul>
        </nav>
      </>
    )
  }

  renderItems(){
    const {config} = this.state;
    const items = [];

    let actualPage = config.actualPage;
    let lastPage = config.lastPage;

    let prevClass = "page-item";
    let nextClass = "page-item";
    
    if(actualPage <= 1){
      prevClass += " disabled";
    }

    if(actualPage >= lastPage){
      nextClass += " disabled";
    }

    items.push(
      <li className={prevClass} key={"pagination-prev"} onClick={this.props.onBack}>
        <a className="page-link" href="#" tabIndex="-1">Anterior</a>
      </li>
    );

    if(lastPage <= 4){
      for(let i=0; i<lastPage; i++){
        let itemClass = "page-item";
        if((i+1) == actualPage){
          itemClass += " active";
        }
        items.push(
          <li className={itemClass} key={"pagination-item-"+i} onClick={()=>{this.props.onItem(i+1)}}>
            <a className="page-link" href="#">{i+1}</a>
          </li>
        );
      }
    } else {
      let itemClass = "page-item";
      if(actualPage==1){
        itemClass += " active";
      }

      items.push(
        <li className={itemClass} key={"pagination-item-1"} onClick={()=>{this.props.onItem(1)}}>
          <a className="page-link" href="#">1</a>
        </li>
      );
      if(actualPage!==2){
        items.push(
          <li className="page-item disabled" key={"pagination-item-dots-1"}>
            <a className="page-link" href="#">...</a>
          </li>
        );
      }

      if(actualPage !== 1 && actualPage !== lastPage){
        items.push(
          <li className="page-item active" key={"pagination-item-"+actualPage}>
          <a className="page-link" href="#">{actualPage}</a>
        </li>
        );
        if((actualPage+1) < lastPage){
          items.push(
            <li className="page-item disabled" key={"pagination-item-dots-2"}>
              <a className="page-link" href="#">...</a>
            </li>
          );
        }
        items.push(
          <li className="page-item" key={"pagination-item-"+lastPage} onClick={()=>{this.props.onItem(lastPage)}}>
          <a className="page-link" href="#">{lastPage}</a>
        </li>
        );
      } else {
        itemClass = "page-item";
        if(actualPage === lastPage){
          itemClass += " active";
        }
        items.push(
          <li className={itemClass} key={"pagination-item-"+lastPage} onClick={()=>{this.props.onItem(lastPage)}}>
          <a className="page-link" href="#">{lastPage}</a>
        </li>
        );
      }
    }

    items.push(
      <li className={nextClass} key={"pagination-next"} onClick={this.props.onNext}>
        <a className="page-link" href="#">Siguiente</a>
      </li>
    )
    return items;
  }
}

export default Pagination;