import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const feedbackMessage = (text) => {
  toast.configure()
  toast(text)
}

export default feedbackMessage