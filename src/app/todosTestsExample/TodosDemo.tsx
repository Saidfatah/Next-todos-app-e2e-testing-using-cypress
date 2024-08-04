"use client"

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchTodos, addTodo, removeTodo, updateTodo } from "./todosQueries";
import { Todo as TodoType } from "./types";
import "./todos.style.css";
import clsx from "clsx";

const TodosApp: React.FC = () => {
    const queryClient = useQueryClient(); // Use the QueryClient from context
    const [todoUnderAction, setTodoUnderAction] = useState<TodoType['id'] | undefined>(undefined);
    const [newTodo, setNewTodo] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const { data: todos, isLoading, error } = useQuery<TodoType[]>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 1000
    });

    const addMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onSettled: () => {
            setIsAdding(false);
        },
        onError: () => {
            setIsAdding(false);
        },
    });

    const removeMutation = useMutation({
        mutationFn: removeTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onSettled: () => {
            setTodoUnderAction(undefined);
        },
        onError: () => {
            setTodoUnderAction(undefined);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onSettled: () => {
            setTodoUnderAction(undefined);
        },
        onError: () => {
            setTodoUnderAction(undefined);
        },
    });

    const handleRemoveTodo = (id: number) => {
        console.log("handleUpdateTodo")
        setTodoUnderAction(id);
        removeMutation.mutate(id);
    };

    const handleUpdateTodo = (id: number) => {
        console.log("handleUpdateTodo")
        setTodoUnderAction(id);
        updateMutation.mutate(id);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() === "") return;
        setIsAdding(true)
        addMutation.mutate(newTodo);
        setNewTodo("");
    };

    if (isLoading) return <div data-testid="todosLoaderUI" className="wrapper"><p>Loading...</p></div>;
    if (error) return <div className="wrapper"><p>Error: {error.message}</p></div>;

    return (
        <div className="wrapper">
            <h1 data-testid="todosTitle">Todo List</h1>

            <ul>
                {todos?.length === 0 && (
                    <p data-testid="noTodosUI">you have no todos left </p>
                )}
                {todos?.map((todo) => (
                    <li
                        data-testid={`todo-${todo.id}`}
                        key={todo.id}
                        className={clsx(
                            "todo",
                            todoUnderAction === todo.id && "disabled"
                        )}
                    >
                        <span>{todo.text}</span>

                        <div>
                            <input
                                data-testid={`todo-${todo.id}-checkbox`}
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => handleUpdateTodo(todo.id)}
                            />
                            <button
                                disabled={todoUnderAction === todo.id}
                                data-testid={`todo-${todo.id}-remove-button`}
                                onClick={() => handleRemoveTodo(todo.id)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    data-testid="newTodoInput"
                />
                <button
                    disabled={isAdding}
                    data-testid="addTodoButton"
                    className={clsx(
                        "todo",
                        isAdding && "disabled"
                    )}
                    onClick={handleAddTodo}>Add Todo</button>
            </div>
        </div>
    );
};


const queryClient = new QueryClient();
const Wrapped = () => {
    return (<div>
        <QueryClientProvider client={queryClient}>
            <TodosApp />
        </QueryClientProvider>
    </div>
    );
}


export default Wrapped;


