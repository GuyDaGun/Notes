import { Container } from "react-bootstrap"
import NotesPageLoggedInView from "../components/NotesPageLoggedInView"
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView"
import '../styles/NotesPage.css';
import '../styles/utils.css';
import { User } from '../models/user';

interface NotesPageProps {
    loggedInUser: User | null,
}


const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className='notesPage'>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
  )
}
export default NotesPage