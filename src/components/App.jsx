import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import { AppTitle, ListTitle, Container } from './App.styled';

const LS_KEY = 'contactsArray';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isExist = contacts.find(contact => contact.name === name);

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <AppTitle>Phonebook</AppTitle>
      <ContactForm onSubmit={addContact} />
      <ListTitle>Contacts</ListTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filterContacts()}
        onDeleteContactHandle={deleteContact}
      />
    </Container>
  );
}
