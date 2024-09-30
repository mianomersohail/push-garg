
export default function CountEffectList({Name,Number}){
    return(
        <>
        <div className="col-lg-4 count-box">
          <div>
            <h3>{Name}</h3>
            <h1 className="counter" data-target="50" data-speed="200">{Number}</h1>
          </div>
        </div>
        
        </>
    )
}