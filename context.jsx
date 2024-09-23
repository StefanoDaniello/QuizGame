import { createContext, useContext, useState, useEffect } from 'react';
import CategoryList from './categoryArray';
// Crea il contesto
const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [request, setRequest] = useState({ requests: [] });
    const [count, setCount] = useState(0);
    const [win, setWin] = useState(false);
    const [rigioca, setRigioca] = useState(false);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [number, setNumber] =useState(5);
    const [category,setCategory]= useState(null);
    const [difficulty, setDifficulty] = useState(null);

    const [paramArray,setParam]=useState({num: 5, diff:null, cat:null})

        // & difficulty=easy
        // & category=21
    const fetchQuestions = (queryNumber,selectedDifficulty,selectedCategory) => {
        fetch(`https://opentdb.com/api.php?amount=${queryNumber ? queryNumber : 5}${selectedCategory ? `&category=${selectedCategory}` : '' }${selectedDifficulty ? `&difficulty=${difficulty}` : '' }&type=boolean&encode=url3986`)
            .then(response => response.json())
            .then(data => {
                const decodedResults = data.results.map(question => {
                    // decodeURIComponent codifica i caratteri esempio %20 in spazio
                    return {
                        ...question,
                        question: decodeURIComponent(question.question),
                        correct_answer: decodeURIComponent(question.correct_answer),
                        incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer))
                    };
                });
                setRequest({ requests: decodedResults });
            })
            .catch(error => console.error('Errore nel fetch:', error));
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (rigioca) {
            fetchQuestions();
            setCount(0);  
            setWin(false); 
            setRigioca(false);
        }
    }, [rigioca]);

    const funcRigioca = (key) => {
        if(key){
            setRigioca(true);
            setModal(false);
        }else{
            setRigioca(true);
        }
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleCloseModalEdit = () => {
        setEditModal(false);
    };
    const handleEditGame=()=>{
        if(win){
            setWin(false); 
            setCount(0);  
            fetchQuestions(number, difficulty, category);
            setParam({
                num: number,
                diff: difficulty,
                cat: Number(category)
            });
            setEditModal(false);
            console.log(number, difficulty, category)
        }else{
            fetchQuestions(number, difficulty, category);
            setParam({
                num: number,
                diff: difficulty,
                cat: Number(category)
            });
            setEditModal(false);
            console.log(number, difficulty, category)
        }
       
    }
    const value = { request, funcRigioca, count, win, setCount, setWin, handleCloseModal, modal, setModal, editModal, setEditModal, handleCloseModalEdit, handleEditGame, number, setNumber, difficulty, setDifficulty, paramArray, CategoryList, category, setCategory };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export const useContextApp = () => useContext(Context);


