import { useState } from "react";

function Card({id, name, info, image, price, removeTour}) {

    const [readMore, setReadMore] = useState(false);

    function readMoreHandler() {
        setReadMore(!readMore);
    }


    const description = readMore ? info : `${info.substring(0, 200)}....`;

    return (
        <div className="card">
           <img src={image} alt="" className="image"></img>

           <div className="tours-info">
                <div className="tours-details">
                        <h4 className="tour-price">$ {price}</h4> 
                        <h4 className="tour-name">{name}</h4>
                    </div>


                    <div className="description">
                        {description}
                        <span className="read-more" onClick={readMoreHandler}>
                            {readMore ? `....Show Less` : `Read More`}
                        </span>
                    </div>
           </div>

            <button className="not-intrested-btn" onClick={() => removeTour(id)}>
                Not Interested
            </button>
        
        </div>
    );
}


export default Card;