import React from "react";
import get from "lodash/get";
import { useRecordContext } from "react-admin";

const BadgeField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    console.log(record);

    return (
        <span className="badge bg-success bg-pill">{get(record, source)}</span>
    );
    // <Labeled label="Name">
    //     <TextField source="name" />
    // </Labeled>
};

export default BadgeField;
