import { Link } from "react-router-dom"
export default function HomeulLink({HomeFirstLink,to1,i1}){
            return(
            <>
       <li>
        <Link className={HomeFirstLink} to={to1}></Link>
        <i className={i1}></i>
        </li> 
        </>
    )
}

