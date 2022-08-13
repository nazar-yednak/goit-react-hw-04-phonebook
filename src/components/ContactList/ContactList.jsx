import PropTypes from 'prop-types';
import {
  ContactList,
  DeleteButton,
  ContactItem,
  ContastText,
} from './ContactList.styled';

function Contact({ contacts, onDeleteContact }) {
  return (
    <ContactList>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <ContastText>
            {name}: {number}
          </ContastText>
          <DeleteButton type="text" onClick={() => onDeleteContact(id)}>
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </ContactList>
  );
}

export default Contact;

Contact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
