import { MultiLevelMenu, MenuItem } from "@react-admin/ra-navigation";
import PostIcon from "@material-ui/icons/Book";
import TaskIcon from "@material-ui/icons/Queue";
import UserIcon from "@material-ui/icons/Group";
import { startOfMonth } from "date-fns";

const MyMenu = () => {
    return (
        <MultiLevelMenu>
            <MenuItem name="dashboard" to="/" exact label="Dashboard" />
            <MenuItem
                name="users"
                to="/users"
                label="Пользователи"
                icon={UserIcon}
            />
            <MenuItem name="posts" to="/posts" label="Посты" icon={PostIcon} />
            <MenuItem
                name="posts.treeview"
                to={"/posts?showCards=1"}
                label="Статус выполнения"
            ></MenuItem>
            {/* The empty filter is required to avoid falling back to the previously set filter */}
            <MenuItem name="tasks" to={"/tasks"} label="Задачи" icon={TaskIcon}>
                <MenuItem
                    name="tasks.status"
                    to={"/tasks"}
                    label="Статус выполнения"
                >
                    <MenuItem
                        name="tasks.status.created"
                        to={'/tasks?filter={"statusId":"1"}'}
                        label="Создано"
                    />
                    <MenuItem
                        name="tasks.status.ended"
                        to={'/tasks?filter={"statusId":"4"}'}
                        label="Завершено"
                    />
                </MenuItem>
                <MenuItem
                    name="tasks.datetime"
                    to={"/tasks"}
                    label="Дата создания"
                >
                    <MenuItem
                        name="tasks.datetime.lastmonth"
                        to={`/tasks?filter={"publishedAt_gte":"${startOfMonth(
                            new Date()
                        ).toISOString()}"}`}
                        label="Этот месяц"
                    />
                    <MenuItem
                        name="tasks.datetime.early"
                        to={`/tasks?filter={"publishedAt_lte":"${startOfMonth(
                            new Date()
                        ).toISOString()}"}`}
                        label="Ранее"
                    />
                </MenuItem>
            </MenuItem>
        </MultiLevelMenu>
    );
};

export default MyMenu;
