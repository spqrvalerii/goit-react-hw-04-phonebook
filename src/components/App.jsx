import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Notification } from './Notification/Notification';

export class App extends Component {
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
    const contactsFromLocalStorage = localStorage.getItem('contactList');
    if (contactsFromLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contactList', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (newContact) => {
    const { contacts } = this.state;
    
    const isOnContacts = contacts.some(
      (contact) => newContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isOnContacts) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const id = nanoid();
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, {...newContact, id}]
    }))
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    return (this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2> Contacts</h2>        
        {contacts.length > 0 ? (
          <>
            <Filter filter={filter} handleChange={this.handleChange} />
            <ContactList contacts={this.getFilteredContacts()} handleDelete={this.handleDelete} />
          </>
        ) : (
          <Notification message="Your phonebook is empty."></Notification>
          )}         
      </div>
    );
  }
}