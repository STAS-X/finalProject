import React from "react";

const UserFavorite=(props)=>{
   return (
            <div>
                <i className={props.onUpdate(props.id)}
                   onClick={()=>props.onFavotrite(props.id)}
                   role='img' aria-label='Пользователь в избранном'
                />
            </div>
          )

}

export default UserFavorite;