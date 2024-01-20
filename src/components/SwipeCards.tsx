const SwipeCards = (props: any) => {
  const { socket, selectedCards, setSelectedCards } = props;

  return (
    <div id="swipe-cards">
      <p>It's your turn</p>
      <span>Select cards to swipe...</span>
      <hr />
      <button
        onClick={() => {
          socket.emit("client-swipe-cards", selectedCards);
          setSelectedCards([]);
        }}
      >
        {selectedCards.length > 0
          ? "Swipe " + selectedCards.length + " cards"
          : "Do not swipe"}
      </button>
    </div>
  );
};

export default SwipeCards;
