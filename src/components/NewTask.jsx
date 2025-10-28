import { useRef, useState } from "react";
import Modal from "./Modal.jsx";

export default function NewTask({onAdd}) {
    const modal = useRef();
    const [enteredTask, setEnteredTask] = useState('');

    function handelChange(event) {
        setEnteredTask(event.target.value);
    }

    function handelOnClick() {
        if( enteredTask === '') {
            modal.current.open();
            return;
        }

        onAdd(enteredTask);
        setEnteredTask('');
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Opps ... you looks like forgot enter a value.</p>
                <p className="text-stone-600 mb-4">Pleas make susre you provide a valid value for input field.</p>
            </Modal>
            <div className="flex items-center gap-4">
                <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handelChange} value={enteredTask}/>
                <button className="text-stone-700 hover:text-stone-950" onClick={handelOnClick}>Add Task</button>
            </div>
        </>
    );
}