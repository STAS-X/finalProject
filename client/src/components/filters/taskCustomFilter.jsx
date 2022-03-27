import * as React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import IconButton from "@material-ui/core/IconButton";
import { FilterList, FilterListItem } from "react-admin";
import { startOfMonth, subMonths } from "date-fns";

const StatusIcon = () => {
    return (
        <IconButton color="primary">
            <LocalOfferIcon fontSize="large" />
        </IconButton>
    );
};

export const LastVisitedFilter = () => (
    <FilterList label="Дата публикации" icon={<AccessTimeIcon />}>
        <FilterListItem
            label="Этот месяц"
            value={{
                publishedAt_gte: startOfMonth(new Date()).toISOString(),
                publishedAt_lte: undefined
            }}
        />
        <FilterListItem
            label="Месяц назад"
            value={{
                publishedAt_gte: subMonths(
                    startOfMonth(new Date()),
                    1
                ).toISOString(),
                publishedAt_lte: startOfMonth(new Date()).toISOString()
            }}
        />
        <FilterListItem
            label="Два месяца назад"
            value={{
                publishedAt_gte: subMonths(
                    startOfMonth(new Date()),
                    2
                ).toISOString(),
                publishedAt_lte: startOfMonth(new Date()).toISOString()
            }}
        />
        <FilterListItem
            label="Ранее 3-х месяцев"
            value={{
                publishedAt_gte: undefined,
                publishedAt_lte: subMonths(
                    startOfMonth(new Date()),
                    2
                ).toISOString()
            }}
        />
    </FilterList>
);
export const StatusFilter = () => (
    <FilterList label="Status" icon={<StatusIcon />}>
        <FilterListItem
            label="Создано"
            value={{
                statusId: 1
            }}
        />
        <FilterListItem
            label="На исполнении"
            value={{
                statusId: 2
            }}
        />
        <FilterListItem
            label="В работе"
            value={{
                statusId: 3
            }}
        />
        <FilterListItem
            label="Завершено"
            value={{
                statusId: 4
            }}
        />
    </FilterList>
);
