import '../styles/Note.css';
import '../styles/utils.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteClicked: (note: NoteModel) => void,
  className?: string;
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated At: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created At: ' + formatDate(createdAt);
  }

  return (
    <Card className={`noteCard ${className}`} onClick={() => onNoteClicked(note)}>
      <Card.Body className='cardBody'>
        <Card.Title className='flexCenter'>
          {title} <MdDelete className='text-muted ms-auto' onClick={(e) => {
            onDeleteNoteClicked(note);
            e.stopPropagation();
          }}/>
        </Card.Title>
        <Card.Text className='cardText'>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
