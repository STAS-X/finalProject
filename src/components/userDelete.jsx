import React from "react";


const UserDelete=(props)=>{

    return (
            <button
                className={'btn btn-danger m-2'}
                onClick={() => props.onDelete(props.id)}
            >
                Удалить
            </button>
           )
}

export default UserDelete;