import React from 'react';
import {useRecordContext} from "react-admin";

const TagsField = (props) => {
    const { tags } = useRecordContext(props);

    return tags ? (
        tags.split(",").map((tag, id) => (
            <span
                key={id}
                className={
                    "badge bg-info bg-sm rounded-pill start-auto w-auto m-1"
                }
            >
                {tag}
            </span>
        ))
    ) : (
        <span className={"badge bg-secondary rounded-pill"}>
            {"Tags not exists"}
        </span>
    );
};

export default TagsField;
