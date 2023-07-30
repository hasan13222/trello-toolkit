import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
    initialState: [],
    name: 'task',
    reducers: {
        createTask(state, action){
            const newTask = {
                id: action.payload.id,
                title: action.payload.title,
                listId: action.payload.listId,
                boardId: action.payload.boardId
            }

            return [...state, newTask]
        },
        updateTask(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, title: action.payload.title}
                }
                return item
            })
        },
        removeTask(state, action) {
            return state.filter(item => item.id !== action.payload)
        },
        changeListId(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, listId: action.payload.listId}
                }
                return item
            })
        },
        changeBoardId(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, boardId: action.payload.boardId}
                }
                return item
            })
        }
    }
})

export const { createTask, updateTask, removeTask, changeBoardId, changeListId} = taskSlice.actions

export const taskReducer = taskSlice.reducer