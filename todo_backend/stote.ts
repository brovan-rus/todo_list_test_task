import type {Todo} from "./types/Todo";

let data: Array<Todo> = [];

export const addToStore = (todo: Todo) => {
    data.push(todo);
}

export const deleteFromStore = (id: string) => {
    data = data.filter((element) => element.id !== id)
}

export const toggleFinished = (id: string) => {
    data = data.map((element) =>
        (element.id === id ? {...element, finished: !element.finished} : element)
    );
}
export const getTodoList = () => data;