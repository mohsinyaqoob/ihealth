import axios from 'axios'

export default function removeAuthToken() {
  delete axios.defaults.headers.common['x-auth-token'];
}