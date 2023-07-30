import { useSelector, useDispatch } from "react-redux";
import { icons } from "../assets";
import { removeBoard } from "../store/reducers/board";
import { removeList } from "../store/reducers/list";
import { removeTask } from "../store/reducers/task";


const BoardItem = ({board}) => {

    const lists = useSelector(store => store.list);
    const tasks = useSelector(store => store.task);

    const dispatch = useDispatch();



    const removeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(removeBoard(board.id));

        const listsToBeRemoved = lists.filter(item => item.boardId === board.id);
        const tasksToBeRemoved = tasks.filter(item => item.boardId === board.id);

        listsToBeRemoved.forEach(item => {
            dispatch(removeList(item.id))
        })

        tasksToBeRemoved.forEach(item => {
            dispatch(removeTask(item.id))
        })
    }

    return (
        <div className="board-box d-flex flex-direction-column">
            <div className="d-flex justify-content-between">
                <h5>{board.title}</h5>
                <img onClick={removeHandler} src={icons.crossIcon} alt="" className="add-item-icon" />
            </div>

        </div>
    )
}

export default BoardItem