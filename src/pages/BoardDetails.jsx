import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";
import { createList, sortTaskIdsInList } from "../store/reducers/list";
import { addListToBoard } from "../store/reducers/board";
import { changeListId } from "../store/reducers/task";

const BoardDetails = () => {
	const [editMode, setEditMode] = useState(false);
	const [listTitle, setListTitle] = useState("");

	const { boardId } = useParams();


	const lists = useSelector(store => store.list);
	
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const listId = Date.now() + "";

		dispatch(createList({
			id: listId,
			title: listTitle,
			boardId: boardId,
		}));

		dispatch(addListToBoard(
			{
				id: boardId,
				listId: listId,
			}
		));

		setEditMode(false);
		setListTitle("");
	};

    const dragHandler = (result) => {
        const {source, draggableId, destination} = result;

        if (!destination) {
            return
        }

        if ((source.droppableId === destination.droppableId) && (source.index === destination.index)) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            dispatch(changeListId( {
				id: draggableId,
				listId: destination.droppableId
			}))
        }

        dispatch(sortTaskIdsInList({
			source: source,
			destination: destination,
			draggableId: draggableId,
		}))

    }

	return (
		<DragDropContext onDragEnd={dragHandler}>
			<div className="d-flex m-top-sm flex-direction-row">
				<Link to="/">Back to Boards</Link>
				{lists
					.filter((item) => item.boardId === boardId)
					.map((taskList) => (
						<TaskList key={taskList.id} taskList={taskList} />
					))}

				{!editMode ? (
					<AddItem listAddItem={true} setEditMode={setEditMode} />
				) : (
					<AddItemForm
						title={listTitle}
						listForm={true}
						onChangeHandler={(e) => {
							setListTitle(e.target.value);
						}}
						setEditMode={setEditMode}
						submitHandler={submitHandler}
					/>
				)}
			</div>
		</DragDropContext>
	);
};

export default BoardDetails;
