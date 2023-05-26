const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const curStyle = {
    color: message.color,
    fontStyle: 'italic',
    fontSize: 26,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    borderWidth:3
  }
  console.log(message.content);
  return <div className="noti" style={curStyle}>{message.content}</div>;
};

export default Notification;
