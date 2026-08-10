import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchCourses } from "../services/dashboardService";

const NavbarSearch = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  useEffect(() => {

    const timer = setTimeout(() => {

      loadResults();

    },300);

    return ()=>clearTimeout(timer);

  },[search]);

  const loadResults = async ()=>{

    if(!search.trim()){

      setResults([]);

      return;

    }

    try{

      const response =
      await searchCourses(search);

      setResults(response.data.data);

    }
    catch(error){

      console.log(error);

    }

  };

  return(

<div className="navbar-search">

<input

placeholder="Search Courses..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>

{
results.length>0&&(

<div className="search-dropdown">

{

results.map((course)=>(

<div

key={course.id}

className="search-item"

onClick={()=>{

navigate(`/courses/${course.id}`);

setResults([]);

setSearch("");

}}

>

<img

src={
course.thumbnail||
"https://via.placeholder.com/60"
}

/>

<div>

<h4>{course.title}</h4>

<p>{course.instructor}</p>

</div>

</div>

))

}

</div>

)

}

</div>

);

};

export default NavbarSearch;