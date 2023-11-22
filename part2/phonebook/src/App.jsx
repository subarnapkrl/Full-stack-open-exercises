import { useState,useEffect } from 'react';
import personService from './services/person'



function App() {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '00000000', id: 1 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNum(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  

  const addName = (e) => {
  e.preventDefault();
  
  // Check if the person with the same name already exists
  const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    // Ask the user for confirmation
    const userConfirmed = window.confirm(`The person ${newName} already exists. Do you want to update the phone number?`);

    if (userConfirmed) {
      // Update the phone number in the state
      const updatedPersons = persons.map((person) =>
        person.name === newName ? { ...person, number: newNum } : person
      );

      // Update the state with the new persons array
      setPersons(updatedPersons);

      // Perform the update on the server using the HTTP PUT method
      personService.updates(existingPerson.id, { number: newNum })
        .then((response) => {
          console.log(`Phone number updated for ${newName}`);
        })
        .catch((error) => {
          console.error('Error updating phone number:', error);
        });
    }
  } else {
    // If the person doesn't exist, proceed with adding a new person
    const nameObject = {
      name: newName,
      number: newNum,
      id:self.crypto.randomUUID()
    };

    personService.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNum('');
      })
      .catch((error) => {
        console.error('Error adding name:', error);
        // Handle the error (e.g., show an error message to the user)
      });
  }
};


  const getPersonService =()=> {
 personService.getAll().then(response=>{
      setPersons(response.data)
  })
}

  useEffect(()=>{
    getPersonService();
  },[])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePerson=(id)=>{
    const personToDelete=persons.find((person)=>person.id===id);

    if(personToDelete){
      const {id,name}=personToDelete;

      const userConfirmed=window.confirm(`Do you really want to delete ${name}?`);

      if(userConfirmed){
          personService.deletee(id).then(response=>{
    
      getPersonService()
     
     
    }).catch((err)=>{
      alert("ERROR",err)
      
    })
      }

    }
    
    
  }

  return (
    <div>
      <h1>PHONEBOOK</h1>
      <div>
        Filter shown with: <input onChange={handleSearchTerm} value={searchTerm} />
      </div>
      <form>
        <div>
          <h2>ADD</h2>
          <div>
            name: <input onChange={handleNameInput} value={newName} />
          </div>
          <div>
            number: <input onChange={handleNumberInput} value={newNum} />
          </div>
        </div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} <button onClick={()=>deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;