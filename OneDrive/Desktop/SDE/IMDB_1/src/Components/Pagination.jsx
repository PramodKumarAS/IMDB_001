function Pagination(props){

    return(
        <div className="flex justify-center gap-8 p-4 h-[50px] bg-gray-500 mt-8">
          <i onClick={props.handlePrevious} className="fa-solid fa-arrow-left"></i>
           <h1>{props.pageNumber}</h1>
          <i onClick={props.handleNext} className="fa-solid fa-arrow-right"></i>
        </div>
    )
}

export default Pagination