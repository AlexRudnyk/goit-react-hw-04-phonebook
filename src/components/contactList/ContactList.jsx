import PropTypes from 'prop-types';
import { ListItem, DeleteBtn } from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContactHandle }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <ListItem key={id}>
          {name}: {number}
          <DeleteBtn type="button" onClick={() => onDeleteContactHandle(id)}>
            Delete
          </DeleteBtn>
        </ListItem>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContactHandle: PropTypes.func.isRequired,
};

export default ContactList;
