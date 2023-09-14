import { useDispatch, useSelector } from 'react-redux'
import { filterText } from '../reducers/filterReducer'
const Filter = () => {
  const dispatch = useDispatch()
  const textFilter = useSelector((state) => state.filter)
  const handleChange = (event) => {
    const text = event.target.value
    dispatch(filterText(text))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={textFilter} />
    </div>
  )
}

export default Filter
