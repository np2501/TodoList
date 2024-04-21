import { FormEvent, useEffect, useState } from "react";
import Form1 from "./components/Form1";
import Todo from "./components/Todo";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db, auth, provider } from "./components/Firebase";
import { TodoType } from "./types";
import { signInWithPopup } from "firebase/auth";
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [input, setInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<any>(null); 

     const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            if(data.user.email){
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
            }
        })
      }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                fetchTodos(user.uid); 
            } else {
                setUser(null);
                setTodo([]); 
            }

        });
        setValue(localStorage.getItem('email')||"")

        return () => unsubscribe();
    }, []);

    // Create a todo
    const createTodo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input === "") {
            alert("Please enter some task");
            return;
        }
        if (!user) {
            alert("You need to sign in to create a todo");
            return;
        }
        await addDoc(collection(db, "todos"), {
            text: input,
            completed: false,
            user: user.uid 
        });
        setInput("");
    };

    // Read todo
    const fetchTodos = async (userId: string) => {
        const q = query(collection(db, "todos"),where("user", "==", userId));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const todosArr: TodoType[] = [];
            QuerySnapshot.forEach((doc) => {
              todosArr.push({ ...doc.data(), id: doc.id });
            });
            setTodo(todosArr);
        });
        return unsubscribe;
    };

    // Delete todo
    const deleteTodo = async (id: string) => {
        await deleteDoc(doc(db, "todos", id));
    };

    // Update todo
    const updateTodo = async (id: string, newText: string) => {
        await updateDoc(doc(db, "todos", id), {
            text: newText
        });
    };

    // Toggle todo completion
    const toggleComplete = async (todo: TodoType) => {
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        });
    };

    // Update search query
    const handleSearch = (e: FormEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    };

    // Filter todos based on search query
    const filteredTodos = todo.filter((todo) =>
        todo.text && todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    

    // Google Sign-out function
    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='h-screen w-screen p-4 bg-purple-300 overflow-y-scroll '>
            <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 p-2">Todo List</h1>
                {user ? (
                    <>   
                    <p className="flex justify-center items-center py1 py-1">User is Logged in with email: {value}</p>
                       <div className="flex justify-center items-center ">
                        
                        <button onClick={signOut} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-1">Sign out</button>
                        </div>
                        <Form1 createTodo={createTodo} input={input} setInput={setInput} />
                      
                        <div className="flex bg-purple-300 py-4 rounded mt-3 justify-center items-center">
                          
                       
                        <input
                           
                            type="text"
                            placeholder="Search tasks"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-90 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 pl-2"
                            
                        />
                        <SearchIcon className="color-blue" />
                         </div>
                        <ul>
                            {filteredTodos.map((todos, index) => (
                                <Todo
                                    key={index}
                                    todos={todos}
                                    deleteTodo={deleteTodo}
                                    toggleComplete={toggleComplete}
                                    updateTodo={updateTodo}
                                />
                            ))}
                        </ul>
                        {todo.length > 0 ? <p className="text-center">{`You have ${todo.length} task`}</p> : null}
                    </>
                ) : (
                  <div className="flex justify-center items-center ">
                  
                  <button onClick={handleClick} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Signin With Google</button>
                  
              </div>
                )}
            </div>
        </div>
    );
};

export default App;
