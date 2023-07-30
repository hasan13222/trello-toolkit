import { createSlice} from '@reduxjs/toolkit';

const listSlice = createSlice({
    initialState: [],
    name: 'list',
    reducers: {
        createList(state, action){
            const newList = {
                id: action.payload.id,
                title: action.payload.title,
                boardId: action.payload.boardId,
                tasks: []
            };

            return [...state, newList]
        }, 
        updateList(state, action){
            return state.map(item => {
                if (item.id === action.payload.id) {
                    // item.title = action.payload.title
                    return {...item, title: action.payload.title}
                }

                return item
            })
        },
        removeList(state, action) {
            return state.filter(item => item.id !== action.payload)
        },
        changeBoardId(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    // item.title = action.payload.title
                    return {...item, boardId: action.payload.boardId}
                }

                return item
            })
        },
        sortTaskIdsInList(state, action){
            const {source, destination, draggableId} = action.payload;
            const previousList = state.find(item => item.id === source.droppableId);
            const latestList = state.find(item => item.id === destination.droppableId);

            
            previousList.tasks.splice(source.index, 1)

            latestList.tasks.splice(destination.index, 0, draggableId);

            // return [...state]
        },
        addTaskIdToList(state, action){
            return state.map(item => {
                if (item.id === action.payload.id) {
                    // item.title = action.payload.title
                    return {...item, tasks: [...item.tasks, action.payload.taskId]}
                }

                return item
            })
        },
        removeTaskIdFromList(state, action){
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, tasks: item.tasks.filter(taskId => taskId !== action.payload.taskId)}
                }

                return item
            })
        }
    }
})

export const { createList, updateList, removeList, changeBoardId, sortTaskIdsInList, addTaskIdToList, removeTaskIdFromList} = listSlice.actions

export const listReducer = listSlice.reducer