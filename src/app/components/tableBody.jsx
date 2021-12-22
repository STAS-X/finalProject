import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        if (columns[column].path === "name") {
            return (
                <Link
                    key={_.get(item, "_id")}
                    to={`userProfile?id=${_.get(item, "_id")}`}
                >
                    {_.get(item, columns[column].path)}
                </Link>
            );
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.object.isRequired
};

export default TableBody;
