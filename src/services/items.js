import axios from "axios"

const api_key = import.meta.env.VITE_API_URL

console.log('api key... ', api_key)

// variable api_key now has the value set in startup

// export const getAll = () => {
//   return axios.get(
//     "https://gist.githubusercontent.com/bebigomez/19a2a2a461051227d61e15ffd7738203/raw/3795535b7bc56a2f89da21d6f1c35293463c53f5/modioItems.json"
//   )
// }

export const getAll = () => {
  return axios.get(
    `${api_key}/products`
  );
}