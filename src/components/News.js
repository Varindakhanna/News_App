import React, {useEffect,useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>
{
  
  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(1);
  const[totalResults,setTotalResults]=useState(0);

  

  const fetchMoreData = async () => {

   
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=96878f6161334f489ad63db7d6492a5f&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);

   

  };

  const capitalizeFirstLetter = (string)=>
  {
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
  
  
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  

  const updateNews =async ()=>
  {
    props.setProgress(0);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=96878f6161334f489ad63db7d6492a5f&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
   
  }

  useEffect(()=>{
    updateNews();
  },[] )


  const handleNextClick=async ()=>
   {
    // console.log("next");
    //  if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    //  {
     
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=96878f6161334f489ad63db7d6492a5f&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData= await data.json()
    //   console.log(parsedData);
      
    //   this.setState({
    //     page: this.state.page +1,
    //     articles: parsedData.articles,
    //     loading:false
  
    //   })
    // }
 
    setPage(page+1);
  updateNews();
     
    


  }

  const handlePrevClick=async()=>
  {
    // console.log("prev");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=96878f6161334f489ad63db7d6492a5f&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData= await data.json()
    // console.log(parsedData);
    
    // this.setState({

    //   page: this.state.page -1,
    //   articles: parsedData.articles,
    //   loading:false

    // })


    setPage(page-1);
    updateNews();

    
  }



  
    return (
      <>

        <h1 className="text-center" style={{margin:'35px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} headlines</h1>

     {/* {this.state.loading && <Spinner/>} */}

     <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
       
        <div className="container">
          
        <div className="row">
          {articles.map((element)=>{
            return   <div className="col md-4" key={element.url}>
            <NewsItem
              title={element.title}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          </div>
          

          }
          
          )}
        
    
      
        </div>
        </div>

        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        {/* <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}> Next &rarr;</button>
 */}


        </div>


      </>
    );
  
}

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'


}

News.propsTypes={

  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
  
}

export default News;
