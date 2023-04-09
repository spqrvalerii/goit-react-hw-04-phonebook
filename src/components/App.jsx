import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Notification } from './Notification/Notification';

const contactsList = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contactList')) ?? contactsList)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));    
  }, [contacts])
  
  const  handleChangeFilter = e => {
    const { value } = e.target;
    setFilter(value)
  };

  const handleSubmit = (newContact) => {  
    const isOnContacts = 
      contacts.some(
        (contact) => newContact.name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isOnContacts) {
        alert(`${newContact.name} is already in contacts.`);
        return;
      }
    
    const id = nanoid();
    setContacts(prevContacts => [...prevContacts, { ...newContact, id }]
      )    
  };

  const  handleDelete = (id) => {
    setContacts(prevContacts => prevContacts
      .filter(contact => contact.id !== id),
    );
  };

  const  getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  };

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
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts</h2>        
      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
          <ContactList contacts={getFilteredContacts()} handleDelete={handleDelete} />
        </>
      ) : (
        <Notification message="Your phonebook is empty."></Notification>
        )}         
    </div>
  );
}