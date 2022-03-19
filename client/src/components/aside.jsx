import React from "react";
import { Typography } from "react-admin";

const Aside = (props) => {
    return (
        <div style={{ width: 200, margin: "1em" }}>
            <Typography variant="h6">Post details</Typography>
            <Typography variant="body2">
                Posts will only be published once an editor approves them
            </Typography>
        </div>
    );
};

export default Aside;
