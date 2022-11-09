import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import { AppTitle, ListTitle, Container } from './App.styled';

const LS_KEY = 'contactsArray';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem(LS_KEY));
    if (localStorage.getItem(LS_KEY)) {
      this.setState({
        contacts: contactsFromLocalStorage,
      });
    }
  }

  componentDidUpdate(prevProps, { contacts }) {
    const contactsToLocalStorage = JSON.stringify(this.state.contacts);
    if (contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, contactsToLocalStorage);
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
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

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onSubmit={this.addContact} />
        <ListTitle>Contacts</ListTitle>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.filterContacts()}
          onDeleteContactHandle={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
