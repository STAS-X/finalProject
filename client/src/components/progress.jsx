import React from 'react';
import {useRecordContext} from "react-admin";

const ProgressField = (props) => {
    const { progress } = useRecordContext(props);
    const progressColor = progress<20? "danger" :progress<40? "warning" :progress<70? "info" : "success";
    return (
        <div className="progress">
            <div
                className={`progress-bar progress-bar-striped progress-bar-animated bg-${progressColor}`}
                role="progressbar"
                style={{ width: `${progress}%`, overflow: "none" }}
                aria-valuenow={`${progress}`}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {progress + "%"}
            </div>
        </div>
    );
};

export default ProgressField;
