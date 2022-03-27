import * as React from "react";
import { Card as MuiCard, CardContent, withStyles } from "@material-ui/core";

import { LastVisitedFilter, StatusFilter } from "./taskCustomFilter";

const Card = withStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            order: -1, // display on the left rather than on the right of the list
            width: "15em",
            marginRight: "1em"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}))(MuiCard);

const TasksFilterSidebar = () => (
    <Card>
        <CardContent>
            <LastVisitedFilter />
            <StatusFilter />
        </CardContent>
    </Card>
);

export default TasksFilterSidebar;
