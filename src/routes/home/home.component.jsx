import CreatePostButton from '../../components/create-post-button/create-post-button.component'
import Columns from '../../components/columns/columns.component';
import ScrollTopButton from '../../components/scroll-top-button/scroll-top-button.component';
import Footer from '../../components/footer/footer.component';

import { useSelector } from 'react-redux'
import { selectCurrentUser, selectUserData } from '../../store/user/user.selector'


const Home = () => {    
  const stockdioKey = process.env.REACT_APP_STOCKDIO_API_KEY;    
  const currentUser = useSelector(selectCurrentUser)
  const userData = useSelector(selectUserData)
  
  return (
    <div> 
      {currentUser && userData && userData.role === 'admin' && (<CreatePostButton />  )}               
      <Columns stockdioKey={stockdioKey}/>
      <ScrollTopButton />
      <Footer />  
    </div>
  );
}

export default Home;





