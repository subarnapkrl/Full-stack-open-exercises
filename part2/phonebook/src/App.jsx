import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '00000000', id: 1 },
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
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };
    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNum('');
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
