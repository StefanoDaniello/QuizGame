import { useState, useEffect } from "react";
import { useContextApp } from "../store/context";
import ModalComponents from "./ModalComponents";
import ModalEdit from "./ModalEdit";

function MainComponents() {
    const { request, funcRigioca, count, win, setCount, setWin, modal, setModal, editModal, setEditModal, paramArray, CategoryList } = useContextApp();
    const [response, setResponse] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);


    useEffect(() => {
        console.log(response);
    }, [response]);

    const handleRequest = (risposta) => {
        setResponse(risposta);
        setSelectedButton(risposta);
    };

    const handleSubmit = () => {
        if (response === request.requests[count].correct_answer) {
            if (count < request.requests.length - 1) {
                setCount(prevCount => prevCount + 1);
            } else {
                setCount(prevCount => prevCount + 1);
                setWin(true);
            }
        } else {
            setModal(true);
        }
        setSelectedButton(null);
    };


    // const handleRigioca = () => {
    //     funcRigioca(); 
    // }

    return (
        <main className="pt-5">
            <div className="container text-center">
                <h1>Domanda: {count} di {paramArray.num}</h1>
                {
                    !paramArray.diff && !paramArray.cat ? (
                        <h3>Difficoltà e Categoria: random 🎲!</h3>
                    ) : (
                        <>
                            {paramArray.diff ? (
                                <h3>Difficoltà: {paramArray.diff}</h3>
                            ) : (
                                <h3>Difficoltà: random 🎲!</h3>
                            )}
                            {paramArray.cat ? (
                                <h3>Categoria: {CategoryList.find(item => item.id === paramArray.cat)?.name}</h3>
                            ) : (
                                <h3>Categoria: random 🎲!</h3>
                            )}
                        </>
                    )
                }


                <div className="d-flex justify-content-between align-items-center">
                    <h3>Punteggio: {count}</h3>
                    <button className="editButton" onClick={() => setEditModal(true)}>Edit Game</button>
                </div>
                {win ? (
                    <div>
                        <h1>Hai Vinto!</h1>
                        <button className="button-chose px-4 mt-4" onClick={funcRigioca}>Rigioca</button>
                    </div>
                ) : (
                    request.requests.length > 0 ? (
                        <div className="mt-4 d-flex flex-column justify-content-center align-content-center">
                            <div>
                                <h2 className="mb-5">{request.requests[count].question}</h2>
                            </div>
                            <div>
                                <button
                                    className={`w-25 button-chose ${selectedButton === "True" ? "active" : ""}`}
                                    onClick={() => handleRequest("True")}
                                >
                                    Vero
                                </button>
                            </div>
                            <div className="my-5">
                                <button
                                    className={`w-25 button-chose ${selectedButton === "False" ? "active" : ""}`}
                                    onClick={() => handleRequest("False")}
                                >
                                    Falso
                                </button>
                            </div>
                            <div className="mt-3">
                                <button className="w-25 button-conferma" onClick={handleSubmit} disabled={selectedButton === null}>Conferma</button>
                            </div>
                        </div>
                    ) : (
                        <p>Caricamento delle domande in corso...</p>
                    )
                )}
                {modal && (
                    <ModalComponents />
                )}
                {editModal && (
                    <ModalEdit />
                )}
            </div>
        </main>
    );
}

export default MainComponents;
