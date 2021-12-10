import React from "react";

const TableCaption=(props)=>{
console.log(props)
    return (
                <h2>
                    <span
                        className={
                            'badge rounded-pill bg-' + (props.count > 0 ? 'primary' : 'danger')
                        }
                    >
                        {props.count> 0
                            ? `${props.count} ${props.onPhrase(
                                props.count
                            )} с тобой сегодня`
                            : "Никто с тобой сегодня не тусанет"}
                        
                    </span>
                </h2>   
        )

}

export default TableCaption;