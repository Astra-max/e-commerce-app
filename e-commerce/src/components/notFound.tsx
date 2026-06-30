type params = {
  message: string
}

const NotFound = ({message}: params) => {
  return (
 <div>404 {message} Not Found</div>
  )
}

NotFound.defaultProps = {
  message: "Page"
}

export default NotFound