import React from "react";


const UserQualities=(props)=>{
    return  (
               props.qualities.map((item) => (
                    <span
                        className={
                            'badge rounded-pill m-1 bg-' + item.color
                        }
                        key={item._id}
                    >
                        {item.name}
                    </span>
                ))
               
            )
          
}

export default UserQualities;