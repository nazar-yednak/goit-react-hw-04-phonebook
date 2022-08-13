import { useState, useCallback } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Wrapper } from './App.styled';
import shortid from 'shortid';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = useCallback(
    ({ name, number }) => {
      const contact = {
        name,
        number,
        id: shortid.generate(),
      };
      const existingContact = contacts.find(contact => name === contact.name);
      if (existingContact) {
        return alert(`${name} is already in contacts`);
      }
      setContacts([...contacts, contact]);
    },
    [contacts, setContacts]
  );

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const changeFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };
  const normalizeFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  return (
    <Wrapper>
      <h2>Phonebook</h2>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </Wrapper>
  );
}

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = data => {
//     const { name } = data;
//     const { contacts } = this.state;
//     const existingContact = contacts.find(contact => name === contact.name);
//     if (existingContact) {
//       return alert(`${name} is already in contacts`);
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, data],
//     }));
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };
//   render() {
//     const normalizeFilter = this.state.filter.toLocaleLowerCase();
//     const visibleContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//     return (
//       <Wrapper>
//         <h2>Phonebook</h2>
//         <Form onSubmit={this.formSubmitHandler} />
//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </Wrapper>
//     );
//   }
// }

export default App;
