const SwipeCards = (props: any) => {
  const { socket, selectedCards, setSelectedCards } = props;

  return (
    <div id="swipe-cards">
      <p>Twoja kolej!</p>
      <span>Zaznacz karty do wymiany...</span>
      <hr />
      <button
        onClick={() => {
          socket.emit("client-swipe-cards", selectedCards);
          setSelectedCards([]);
        }}
      >
        {selectedCards.length > 0
          ? "WYMIEŃ KARTY: " + selectedCards.length
          : "NIE WYMIENIAJ KART"}
      </button>
    </div>
  );
};

export default SwipeCards;
