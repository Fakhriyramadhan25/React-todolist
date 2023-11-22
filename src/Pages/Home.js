import '../App.css';

// state management 
import {useState} from 'react';

// icons asset 
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

// chakra ui 
import { Container, FormControl, Input, FormLabel, Button, Text} from '@chakra-ui/react';


function Home() {
  const [allTodos, setAllTodos] = useState([{id:0,title: "Football", description:"Dribbling for 15 minutes and shooting for 10 minutes"}, {id:1,title: "Basketball", description:"Shooting for 3 mins"}]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [completeTodo, setCompleteTodo] = useState([]);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [genID, setGenID] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = 
    {
      id: genID,
      title: newTitle,
      description: newDesc
    };

    setAllTodos(oldArray=> [...oldArray, newTodo]);
    setGenID(genID+1);
    setNewDesc('');
    setNewTitle('');
  }

  const handleDelete = (id) => {
    // setting the index and exclude the current index
    setAllTodos(oldValues=> {
      return oldValues.filter((data)=> data.id !== id)
    });
  }

  const handleComplete = (dataID,index) => {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yr = date.getFullYear();
    let hh = date.getHours();
    let mts =  (date.getMinutes()<10?'0':'') + date.getMinutes();
    let finalDate = 
    dd+'-'+mm+'-'+yr+' at '+hh+' : '+mts+' mins';

    let filterTodo = {
      ...allTodos[index],
      completeTime: finalDate
    };

    setCompleteTodo((oldValues)=>[...oldValues, filterTodo]);
    handleDelete(dataID);
  }

  const handleCompleteDelete = (dataID) => {
    setCompleteTodo(oldValues=> {
      return oldValues.filter((data)=> data.id !== dataID)
    });
  }


  return (
    <Container className='App'>
      <h1>My To-do List</h1>
      <Container className='todo-wrapper'>
      <form onSubmit={handleSubmit}>
      <FormControl>
        {/* title  */}
        <Container className='todo-input'>
        <Container className='todo-input-item'>
        <FormLabel>
          Title: 
        </FormLabel>
        <Input placeholder='Your to do' onChange={(e)=>{setNewTitle(e.target.value)}} value={newTitle} type='text'/>
        </Container>
        

        {/* the list  */}
        <Container className='todo-input-item'>
        <FormLabel>
          List: 
        </FormLabel>
        <Input placeholder='List' onChange={(e)=>{setNewDesc(e.target.value)}} value={newDesc} type='text'/>
        </Container>



        <Container className='todo-input-item'>
            <Button className='primary-btn' type='submit'>Add</Button>
        </Container>
        </Container>

      </FormControl>
      </form>
      
      <Container className='btn-area'>
        <Button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>To Do</Button>

        <Button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</Button>
      </Container>

      <Container className='todo-list'>
      <h2>Result</h2>
        {isCompleteScreen === false && allTodos.map((item, index) => 
          <Container key={item.id} className='todo-list-item'>
            <Container>
            <h3>{item.title}</h3>
            <Text>{item.description}</Text>
            </Container>
            <Container>
            <AiOutlineDelete title='Delete' className='icon' onClick={() => handleDelete(item.id)}/>
            <BsCheckLg title='Completed' className='check-icon' onClick={()=>handleComplete(item.id, index)}/>
            </Container>
          </Container>
        )}

        {isCompleteScreen === true && completeTodo.map((item) => 
          <Container key={item.id} className='todo-list-item'>
            <Container>
            <h3> {item.title} </h3>
            <Text>{item.description} </Text>
            <Text><i>{item.completeTime}</i></Text>
            </Container>
            <Container>
            <AiOutlineDelete title='Delete2' className='icon' onClick={()=>handleCompleteDelete(item.id)}/>
            </Container>
          </Container>
        )}

      </Container>
      </Container>
    </Container>
  );
}

export default Home;
